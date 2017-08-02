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
        var currentProject = SessionStore.get('curProject'); //프로젝트 _id값

        //해당 회원이 userDB에 존재(팀허브에 가입된 회원)하면 바로 앱 내에서 초대,
        if (invitedUser !== undefined) { //회원 존재하면 일단 넣음
            //회원등록, 그러나 Accepted 안된 상태
            projectMemberDB.insert({
                createdAt: new Date(),
                project_id: currentProject,
                member_username: invitedUserEmail,
                isAccepted: true, //일단 임시로 되는걸로 함, 원래는 false가 기본값이고 수락 버튼 눌러야 true되는거임
                name: invitedUser.name
            });
        }
        //해당 회원이 userDB에 존재하지않으면 초대 이메일을 보냄 - 추후 구현
        else {
            alert('해당 회원 정보가 없습니다.')
        }
    },

    //회원 추방 버튼 (탈퇴아님, 프로젝트에서 추방하는것임)
    'click #iconDelete': function(evt, tmpl) {
        //매니저만 삭제기능을 사용 할 수 있음 그러므로 매니저 검증 ㄱㄱ
        var loginedId = SessionStore.get('myEmail'); //지금 로그인한 애 아이디
        var currentProject = SessionStore.get('curProject');

        var manager = projectDB.findOne({$and: [{_id: currentProject}, {manager_username: loginedId}]}); //지금 로그인한 놈이 현재 프로젝트의 매니저인가?
        if (manager !== undefined) { //응 매니저 맞음
            //회원 추방 가능
            projectMemberDB.remove({_id: this._id}); //클릭한 놈(추방할 대상)의 아이디로 찾아서 삭제
        } else { //매니저 아님
            confirm('매니저만 추방할 수 있습니다.');
        }
    },

    //매니저 위임 버튼 구현
    'click #giveManager': function (evt, tmpl) {
        alert('run')
        var loginedId = SessionStore.get('myEmail'); //현재 로그인 된 회원의 아이디
        var user = projectMemberDB.findOne({member_username: loginedId}); //현재 로그인된 회원
        var manager = projectDB.findOne({manager_username: loginedId}); //로그인 된 사람이 매니저이면 나오고, 아니면 undefined
        var currentProject = SessionStore.get('curProject');
        var memberDBs = projectMemberDB.findOne({project_id: currentProject});
        alert(memberDBs.member_username)
        if (manager !== undefined) {
            //해당 프로젝트가 맞고, 현재 사용자가 매니저라면 위임이 가능함
            if (confirm('매니저를 위임하시겠습니까?')) {
                Meteor.call('managerChange', memberDBs, function (err, rslt) {
                    if (rslt.status === 'success') {
                        // alert('dd')
                    }
                    else {
                        alert('매니저 위임 실패')
                    }
                });
            }
        }

        //매니저위임 - 서버에서 처리할것
        projectMemberDB.update({project_id: currentProject}, { //현재 프로젝트를 찾아,
            $set: { //매니저 이메일을 현재 클릭한 이메일로 바꿈
                manager_username: this.username
            }
        });
    }

});