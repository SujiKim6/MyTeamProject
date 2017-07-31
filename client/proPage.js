Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
    array: function() {
        return todolistDB.find({}).fetch();
    }
});

Template.proPage.events({
    'click #btnDelete': function(evt, tmpl) {
        if(confirm('정말 삭제하시겠습니까?')) {
            todolistDB.remove({no: $('#inpDelete').val()});
        };
    },
    'click #btnAdd': function(evt, tmpl) {
        var strAdd = $('#inpAdd').val();

        todolistDB.insert({
            no: require("mongodb-autoincrement"),
            content: strAdd
        });
    }
});