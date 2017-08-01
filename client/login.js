Template.login.onCreated(function() {
});

Template.login.onRendered(function() {
});

Template.login.helpers({

});

Template.login.events({
    'click #loginBtn': function (evt, tmpl) {
        // 이메일을 잘못 입력했을 경우
        if(userDB.findOne({username:$('#emailInput').val()})==undefined )
        {
            alert("가입된 정보가 없습니다.");
            return;
        }

        // 이메일을 올바르게 입력하고 비밀번호도 맞았을 경우
        else if($('#passwordInput').val() === userDB.findOne({username:$('#emailInput').val()}).password)
        {
            location.href="/proMain";
            return;
        }

        // 이메일은 올바르게 입력했지만 비밀번호가 틀렸을 경우
        else
        {
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        SessionStore.set('myEmail', $('emailInput').val());
    }
});