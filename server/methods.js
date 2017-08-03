Meteor.methods({

    // 매니저 위임하기
    'managerChange': function(memberDBs) {
        projectDB.update({_id: memberDBs.project_id}, {
            $set: {
                manager_username: memberDBs.member_username
            }
        });
        return {
            status: 'success'
        }
    },

    //
    // // 프로젝트를 편집하기
    // 'editProject': function(projectDB) {
    //     projectDB.update({_id: projectDB.project_id}, {
    //         $set: {
    //             name: '프로젝트 변경'
    //         }
    //     });
    //     Session.set('editingId','')
    //     return {
    //         status: 'success'
    //     }
    // },

    // 프로젝트 삭제하기
    'removeProject': function(project_id) {
        projectDB.remove({_id: project_id});
        projectMemberDB.remove({project_id: project_id});
        return {
            status: 'success'
        }
    }

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