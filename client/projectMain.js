Template.projectMain.onCreated(function() {

});

Template.projectMain.onRendered(function() {
});

Template.projectMain.helpers({
    array: function() {

        // 프로젝트명을 저장하는 배열
        var projects = [];

        // 현재 사용자가 속한 프로젝트 찾기
        var memberDBs = projectMemberDB.find({member_username: SessionStore.get('myEmail')}).fetch();

        // 찾은 프로젝트 id로 프로젝트들 찾기
        for(var i = 0; i < memberDBs.length; i++) {
            var curProjectId = memberDBs[i].project_id;
            projects.push(projectDB.findOne({_id: curProjectId}));
        }

        return projects;
    }
});

Template.projectMain.events({
    //프로젝트 삭제
    'click #btnDelete': function(evt, tmpl) {
        if(confirm('정말 삭제하시겠습니까?')) {
            projectMemberDB.remove({project_id: SessionStore.get('curProject')});
            projectDB.remove({_id: SessionStore.get('curProject')});
        };
    },

    // 프로젝트 선택
    'click #btnProject': function(evt, tmpl) {
        alert(SessionStore.get('curProject'));
        SessionStore.set('curProject',this._id);
    }
});