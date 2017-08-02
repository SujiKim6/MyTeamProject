Template.addProject.helpers({
    project: function() {

        // 현재 프로젝트의 정보
        var curProject = SessionStore.get('curProject');
        var project = projectDB.find({_id: curProject}).fetch(); //해당 프로젝트 찾음
        return project;
    }
});

Template.addProject.events({

});