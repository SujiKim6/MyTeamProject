Template.mypage.onCreated(function() {

});

Template.mypage.onRendered(function() {
});

Template.mypage.helpers({
    array: function() {
        // 임시 테스트
        SessionStore.set('myEmail','heerim12@naver.com')

        // 현재 사용자의 정보
        var userInfo = userDB.findOne({username: SessionStore.get('myEmail')}).fetch();
        return userInfo;
    }
});

Template.mypage.events({

});