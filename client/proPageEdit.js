
Template.proPageEdit.onCreated(function() {

});

Template.proPageEdit.helpers({
    array: function() {
        return todolistDB.find().fetch();
    }
});

Template.proPageEdit.events({
    'click #btnDelete': function(evt, tmpl) {
        if(confirm('정말 삭제하시겠습니까?')) {
            todoDB.remove({no: $('#inpDelete').val()});
        };
    },

    'click #btnAdd': function(evt, tmpl) {
        var strAdd = $('#inpAdd').val();

        todoDB.insert({
            no: require("mongodb-autoincrement"),
            content: strAdd
        });
    }
});