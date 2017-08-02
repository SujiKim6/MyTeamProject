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

});