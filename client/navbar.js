$(function() {
    $(document).click(function (event) {
        $('.navbar-collapse').collapse('hide');
    });
});

Template.navbar.events({
    // 페이지 옮기는 거 처리하기

    //teamhub 눌렀을 때 처리
    'click #brandName':function () {
        if(SessionStore.get('myEmail')===' ')
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
        if(SessionStore.get('myEmail')!==' ')
        {
            location.href="/mypage.html";
            return;
        }
    }
})