Template.projectPageEdit.helpers({
    projectDetail:function () {
        var projects = projectDB.findOne({_id:SessionStore.get('curProject')}).fetch();
        return projects;
    }
});


Template.projectPageEdit.events({
    'click #confirmBtn':function () {
        
    }
})