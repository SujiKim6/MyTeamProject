$(function() {
    $(document).click(function (event) {
        $('.navbar-collapse').collapse('hide');
    });
});

Template.navbar.events({
    //teamhub 눌렀을 때 처리
    'click #brandName':function () {
        alert(SessionStore.get('myEmail'))
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
        SessionStore.set('myEmail',' ');
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