Template.proMembersEdit.onCreated(function() {
});

Template.proMembersEdit.onRendered(function() {
});

Template.proMembersEdit.helpers({
    array: function() {
        return todolistDB.find({}).fetch();
    }
});

Template.proMembersEdit.events({

});