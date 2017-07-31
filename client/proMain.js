Template.proMain.helpers({
    percentage: function () {
        var curProjectTodosCount = todoDB.find({project_id: 'aaa'}).count(); //현 프로젝트의 할일 갯수 count() 는 fetch().length 랑 같으나 더 빠름
        var curProjectTodosCompletedCount = todoDB.find({project_id:'aaa', isCompleted: true}).count();

        if (curProjectTodosCount === 0) {
            return 0;
        }

        reuturn (curProjectTodosCompletedCount / curProjectTodosCount) * 100;
    }
})