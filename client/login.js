Template.login.onCreated(function() {
});

Template.login.onRendered(function() {
});

Template.login.helpers({

});

Template.login.events({
    'click #loginBtn': function (evt, tmpl) {

        if(userDB.findOne({username:document.getElementById('emailInput').value})==undefined )
        {
            alert("이메일을 잘못 입력했습니다.");
        }
        else if(document.getElementById('passwordInput').value === userDB.findOne({username:document.getElementById('emailInput').value}).password)
        {
            location.href="/proMain";
        }
        else
        {
            alert("비밀번호가 틀렸습니다.");
        }

        SessionStore.set('myEmail', document.getElementById('emailInput').value);
    }
});