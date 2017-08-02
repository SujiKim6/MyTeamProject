Template.proMembers.helpers({
    //기존 존재하는 멤버 목록들을 보여준다.
    members: function() {
        //return projectMemberDB.find({isAccepted: true}).fetch();

        //하고싶은 일: 조건(해당 프로젝트 && isAccepted가 true)에 맞는 이메일과 이름을 띄우고 싶다
        //어려운점: projectMemberDB (프로젝트 팀원DB)에서는 이메일은 있으나, 이름은 다른DB(userDB)에 있음,
        // email이라는 유니크키가 있으므로 userDB에서 해당 이메일의 이름을 찾아올수는 있음
        // 근데 두개를 join하여 화면에 형식에 맞게 출력해주고싶은데 잘 안된다.

    }
});

//버튼 기능들 구현
Template.proMembers.events({

    //회원 초대
    'click #inviteBtn': function (evt, tmpl) {

        var invitedUserEmail = $('#inviteInput').val(); //인풋박스(inviteInput)에 입력된 회원의 아이디를 가져옴
        var invitedUser = userDB.findOne({username: invitedUserEmail}); //초대할 사람의 email을 userDB에서 검색
        var currentProject = Session.get('curProject');

        //해당 회원이 userDB에 존재(팀허브에 가입된 회원)하면 바로 앱 내에서 초대,
        if (invitedUser !== undefined) { //회원 존재하면 일단 넣음 (isAccepted는 초대받은 회원이 수락을 누르면 true로 바뀌고 정식 등록됨)
            //회원등록, 그러나 Accepted 안된 상태
            projectMemberDB.insert({
                createdAt: new Date(),
                project_id: currentProject,
                member_username: invitedUserEmail,
                isAccepted: false
            })
        }
        //해당 회원이 userDB에 존재하지않으면 초대 이메일을 보냄 - 추후 구현
    },

    //회원 추방 버튼 (탈퇴아님, 프로젝트에서 추방하는것임)
    'click #iconDelete': function(evt, tmpl) {
        //매니저만 삭제기능을 사용 할 수 있음 그러므로 매니저 검증 ㄱㄱ
        var loginedId = SessionStore.get('myEmail'); //지금 로그인한 애 아이디
        var currentProject = SessionStore.get('curProject');

        var manager = projectDB.findOne({$and: [{name: currentProject}, {manager_username: loginedId}]}); //지금 로그인한 놈이 현재 프로젝트의 매니저인가?
        if (manager !== undefined) { //응 매니저 맞음
            //회원 추방 가능
            projectMemberDB.remove({_id: this._id}); //클릭한 놈(추방할 대상)의 아이디로 찾아서 삭제
        } else { //매니저 아님
            confirm('매니저만 추방할 수 있습니다.');
        }
    },

    //매니저 위임 버튼 구현
    'click #giveManager': function (evt, tmpl) {
        var loginedId = Session.get('myEmail'); //현재 로그인 된 회원의 아이디
        var user = projectMemberDB.findOne({member_username: loginedId}); //현재 로그인된 회원
        var manager = projectDB.findOne({manager_username: loginedId}); //로그인 된 사람이 매니저이면 나오고, 아니면 undefined
        var project = true;
        var currentProject = Session.get('curProject');
        
        if (user.project_id !== currentProject) { //현재 이 프로젝트인가?
            project = false;
        }
        if ((project === true) && (manager !== undefined)) { //해당 프로젝트가 맞고, 현재 사용자가 매니저라면 위임이 가능함
            if (confirm('매니저를 위임하시겠습니까?')) {
                //매니저위임
                projectMemberDB.update({project_id: currentProject}, { //현재 프로젝트를 찾아,
                    $set: { //매니저 이메일을 현재 클릭한 이메일로 바꿈
                        manager_username: this.username
                    }
                });
            }
        }
    }

});