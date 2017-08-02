Meteor.methods({
    // 프로젝트 삭제하기
    'removeProject': function(project_id) {
        projectDB.remove({_id: project_id});
        projectMemberDB.remove({project_id: project_id});
        return {
            status: 'success'
        }
    },

    // 할 일 수정하기
    // 'editTodo' :function(data) {
    //     todoDB.update({_id: data._id}, {
    //         $set: {
    //             isComplete: false
    //         }
    //     });
    //     return {
    //         status: 'error'
    //     }
    // }
});