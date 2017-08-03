Template.membersTable.onCreated(function() {
});

Template.membersTable.onRendered(function() {
});

Template.membersTable.helpers({
    array: function() {
        return todoDB.find({}).fetch();
    }
});

Template.membersTable.events({

});