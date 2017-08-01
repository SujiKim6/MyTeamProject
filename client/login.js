Template.login.onCreated(function() {
});

Template.login.onRendered(function() {
});

Template.login.helpers({

});

Template.login.events({
    'click #loginBtn': function (evt, tmpl) {
        var loginedEmail = $('#emailInput').val();
        SessionStore.set('myEmail', loginedEmail);
    }
});