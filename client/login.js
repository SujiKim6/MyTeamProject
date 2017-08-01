Template.login.onCreated(function() {
});

Template.login.onRendered(function() {
});

Template.login.helpers({

});

Template.login.events({
    'click #loginBtn': function (evt, tmpl) {

        if(userDB.findOne({username:$('#emailInput').val()})==undefined )
        {
            alert("이메일을 잘못 입력했습니다.");
            return;
        }
        else if($('#passwordInput').val() === userDB.findOne({username:$('#emailInput').val()}).password)
        {
            location.href="/proMain";
            return;
        }
        else
        {
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        SessionStore.set('myEmail', document.getElementById('emailInput').value);
    }
});