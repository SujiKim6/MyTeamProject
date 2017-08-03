$(function() {
    $(document).click(function (event) {
        $('.navbar-collapse').collapse('hide');
    });
});

Template.navbar.helpers({
    user: function () {
        var user = userDB.findOne({username: SessionStore.get('myEmail')});
        return user.name
    }
});

Template.navbar.events({
    //teamhub 눌렀을 때 처리
    'click #brandName':function () {
        if(SessionStore.get('myEmail')==' ')
        {
            location.href="/";
            return;
        }
        else
        {
            location.href="/proMain";
            return;
        }
    },

    //로그아웃 탭 눌렀을 때 처리
    'click #signOut':function () {
        if(confirm('정말 로그아웃 하시겠습니까?')) {
            SessionStore.set('myEmail',' ');
            location.href="/";
        }
        else {
            location.href="/mypage";
        }
    },

    //마이페이지 탭 눌렀을 때 처리
    'click #myPage':function () {
        if(SessionStore.get('myEmail')!=' ')
        {
            location.href="/mypage";
            return;
        }
    }
})