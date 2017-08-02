Template.mypage.onCreated(function() {

});

Template.mypage.onRendered(function() {
});

Template.mypage.helpers({
    myInfo: function() {
        // 임시 테스트
        //SessionStore.set('myEmail','heerim12@naver.com')

        // 현재 사용자의 정보
        var loginedId = SessionStore.get('myEmail'); //로그인된 아이디
        var userInfo = userDB.find({username: loginedId}).fetch();
        return userInfo;
    }
});


Template.mypage.events({
    //탈퇴기능 안됩니다.ㅠㅠ
    'click #removeUser': function (evt, tmpl) {
        //매니저는 탈퇴 못함
        var loginedId = SessionStore.get('myEmail');
        var project = projectDB.find({manager_username: loginedId}); //user에 뭐 들어있으면 얘 매니저인거임
        
        if (project !== undefined) { //로그인한 사용자가 매니저로 있는 project가 있다는 것
            alert('매니저는 탈퇴할 수 없습니다. 매니저를 다른 회원에게 위임한 뒤, 탈퇴 가능합니다.');
        } else { //일반 회원
            if (confirm('정말 탈퇴하시겠습니까?')) {
                Meteor.call('removeUser', loginedId, function (err, rslt) {
                    if (rslt.status === 'success') {
                        confirm('탈퇴되었습니다.');
                    }
                    else {
                        alert('탈퇴 실패')
                    }
                });
            }
        }
    }

});