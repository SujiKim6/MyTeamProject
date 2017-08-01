Template.projectMain.helpers({
    projects: function (evt, tmpl) {
        // 사용자가 하고 있는 프로젝트가 하나라도 존재할 경우 하나씩 보내기
        if(projectDB.find({username:username}).count()!==0){
            return projectDB.find()
        }
    }
})