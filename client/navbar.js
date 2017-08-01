$(function() {
    $(document).click(function (event) {
        $('.navbar-collapse').collapse('hide');
    });
});

Template.navbar.events({
    'clicked #logoutBtn':function (evt, tmpl) {
        //로그아웃 하는 순간 리셋
        SessionStore.set('myEmail', '');
    }
});