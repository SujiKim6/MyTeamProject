Template.proTable.onCreated(function() {
});

Template.proTable.onRendered(function() {
});

Template.proTable.helpers({
    array: function() {
        return todoDB.find({}).fetch();
    }
});

Template.proTable.events({
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