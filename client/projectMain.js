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
    },
    leftDay:function () {
        //현재 프로젝트 가져오기
        var currentProject = projectDB.findOne({_id: SessionStore.get('showLeftDay')});
        var currentDate=new Date();

        var milSec = currentProject.endAt.getTime() - currentDate.getTime();
        var dateGap = milSec / 1000 / 60 / 60 / 24;
        var left = Math.round(dateGap);


        return left;
    },

    //알람이 온 것이 있는지 확인
    isAlram: function() {
        var memberDBs = projectMemberDB.find({member_username: SessionStore.get('myEmail')}).fetch()
        return memberDBs.isAccepted
    }
});

Template.projectMain.events({
    // 프로젝트 선택
    'click #btnProject': function(evt, tmpl) {
        // alert(SessionStore.get('curProject'));
        SessionStore.set('curProject',this._id);
    }
});