Template.proMembers.helpers({
    //기존 존재하는 멤버 목록들을 보여준다.
    members: function() {
        //리턴을 이름과 이메일 두개를 가진 array로 하면..?
        //이메일로 이름 찾아오기
        //회원 목록 이메일

        //return projectMemberDB.find({isAccepted: true}).fetch();

        var membersArray= []; // 프로젝트 멤버들을 저장하는 배열 (이름과 이메일)

        // 현재 프로젝트의 멤버들
        var acceptedMembers = projectMemberDB.find({isAccepted: true}).fetch();

        // 찾은 프로젝트 멤버들 이메일로 이름들 찾기
        for(var i = 0; i < acceptedMembers.length; i++) {
            var curMemberName = acceptedMembers[i].member_username;
            membersArray.push(userDB.findOne({username: curMemberName}));
        }

        return membersArray;
    }
});

//버튼 기능들 구현
Template.proMembers.events({

    //회원 초대
    'click #inviteBtn': function (evt, tmpl) {

        var invitedUserEmail = $('#inviteInput').val(); //인풋박스(inviteInput)에 입력된 회원의 아이디를 가져옴
        var invitedUser = userDB.findOne({username: invitedUserEmail}); //초대할 사람의 email을 userDB에서 검색

        //해당 회원이 userDB에 존재(팀허브에 가입된 회원)하면 바로 앱 내에서 초대,
        if (invitedUser !== undefined) { //회원 존재하면 일단 넣음 (isAccepted는 초대받은 회원이 수락을 누르면 true로 바뀌고 정식 등록됨)
            //회원등록, 그러나 Accepted 안된 상태
            projectMemberDB.insert({
                createdAt: new Date(),
                project_id: '현재프로젝트아이디',
                member_username: invitedUserEmail,
                isAccepted: false
            })
        }
        //해당 회원이 userDB에 존재하지않으면 초대 이메일을 보냄 - 추후 구현
    },

    //회원 삭제
    'click #iconDelete': function(evt, tmpl) {
        if(confirm('정말 추방 하시겠습니까?')) {
            projectMemberDB.remove({_id: this._id});
        };
    },

    //매니저 위임 버튼 구현
    'click #giveManager': function (evt, tmpl) {
        var loginedId = Session.get('myEmail'); //현재 로그인 된 회원의 아이디
        var user = projectMemberDB.findOne({member_username: loginedId}); //현재 로그인된 회원
        var manager = projectDB.findOne({manager_username: loginedId}); //로그인 된 사람이 매니저이면 나오고, 아니면 undefined
        var project = true;
        var currentProject = '현재프로젝트아이디'; //현재 들어와있는 프로젝트, 코드 아직 구현 못함 (session써야할 각)
        
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