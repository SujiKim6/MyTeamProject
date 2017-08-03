Template.proMembers.helpers({
    //기존 존재하는 멤버 목록들을 보여준다.
    members: function() {
        var currentProject = SessionStore.get('curProject');
        return projectMemberDB.find({$and: [{project_id: currentProject}, {isAccepted: true}]}).fetch();
    },

    //project의 이름을 빼오기 위함
    project: function () {
        return projectDB.find({_id: SessionStore.get('curProject')}).fetch();
    },

    //project의 구성원 총 인원을 알아내기 위함
    count:function () {
        return projectMemberDB.find({$and: [{project_id: SessionStore.get('curProject')}, {isAccepted: true}]}).count();
    },

    //매니저인가?
    isManager: function () {

        var project = projectDB.findOne({_id: this.project_id});
        if(project.manager_username === this.member_username) {
            return true
        }
        else return false;

    }
});

//버튼 기능들 구현
Template.proMembers.events({

    //회원 초대
    'click #inviteBtn': function (evt, tmpl) {
        var invitedUserEmail = $('#inviteInput').val(); //인풋박스(inviteInput)에 입력된 회원의 아이디(이메일)를 가져옴
        var invitedUser = userDB.findOne({username: invitedUserEmail}); //초대할 사람의 email을 userDB에서 검색
        var currentProject = SessionStore.get('curProject'); //프로젝트 _id값 //팀원 목록에 있다면 결과가 들어있을것임
        var memberDBs = projectMemberDB.find({project_id: currentProject}).fetch();

        if (invitedUser !== undefined) { //회원 존재하면 일단 넣음

            //이미 존재하는 팀원은 추가로 초대 불가
            for(var i = 0; i < memberDBs.length; i++) {
                if (invitedUserEmail == memberDBs[i].member_username) {
                    alert('이미 팀원 목록에 있습니다!');
                    return;
                }
            }

            //회원등록, 그러나 Accepted 안된 상태
            projectMemberDB.insert({
                createdAt: new Date(),
                project_id: currentProject,
                member_username: invitedUserEmail,
                isAccepted: true, //일단 임시로 되는걸로 함, 원래는 false가 기본값이고 수락 버튼 눌러야 true되는거임
                name: invitedUser.name
            });

            $("#inviteInput").val("");
        }
        //해당 회원이 userDB에 존재하지않으면 초대 이메일을 보냄 - 추후 구현
        else {
            alert('해당 회원 정보가 없습니다.')

            $("#inviteInput").val("");
        }
    },

    //회원 추방 버튼 (탈퇴아님, 프로젝트에서 추방하는것임)
    'click #iconDelete': function(evt, tmpl) {
        //매니저만 삭제기능을 사용 할 수 있음 그러므로 매니저 검증 ㄱㄱ
        var loginedId = SessionStore.get('myEmail'); //지금 로그인한 애 아이디
        var currentProject = SessionStore.get('curProject');

        var manager = projectDB.findOne({$and: [{_id: currentProject}, {manager_username: loginedId}]}); //지금 로그인한 놈이 현재 프로젝트의 매니저인가?
        //디스가 프로젝트 매니저가아니어야함
        if ((manager !== undefined)) { //응 매니저 맞음

            if (loginedId === this.member_username) {
                alert('자기 자신을 추방할 수 없습니다!');
                return;
            }

            //회원 추방 가능
            if (confirm('회원을 추방하시겠습니까?')) {
                projectMemberDB.remove({_id: this._id}); //클릭한 놈(추방할 대상)의 아이디로 찾아서 삭제
                return;
            }
        } else { //매니저 아님
            confirm('매니저만 추방할 수 있습니다.');
        }
    },

    //매니저 위임 버튼 구현
    'click #giveManager': function (evt, tmpl) {
        // alert('run')
        var loginedId = SessionStore.get('myEmail'); //현재 로그인 된 회원의 아이디
        var user = projectMemberDB.findOne({member_username: loginedId}); //현재 로그인된 회원
        var currentProject = SessionStore.get('curProject');
        var memberDBs = projectMemberDB.findOne({_id: this._id});
        //현재 프로젝트의 매니저
        var thisProject = projectDB.findOne({_id: currentProject});

        if (thisProject.manager_username === loginedId) { //매니저이면
            if (loginedId === this.member_username) { //매니저로 위임하려 클릭한 대상이 이미 매니저(자신)임
                alert('이미 매니저입니다.');
                return;
            }

            if (confirm('매니저를 위임하시겠습니까?')) { //다른 사람을 매니저로 위임
                Meteor.call('managerChange', memberDBs, function (err, rslt) {
                    if (rslt.status === 'success') { //성공
                    }
                    else {
                        alert('매니저 위임 실패')
                    }
                });
            }
        } else { //매니저가 아닌데 위임 버튼을 클릭한 경우
            alert('매니저만 위임할 수 있습니다.');
        }

        //매니저위임 - 서버에서 처리할것
        projectMemberDB.update({project_id: currentProject}, { //현재 프로젝트를 찾아,
            $set: { //매니저 이메일을 현재 클릭한 이메일로 바꿈
                manager_username: this.username
            }
        });
    }

});