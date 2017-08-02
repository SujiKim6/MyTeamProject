Meteor.methods({
    // 프로젝트 세부사항 수정
    'updateProjectDetail':function (projectID,newProjectName, newStartDate,newEndDate, newProjectGoal) {
        var updateRslt = projectDB.update({_id: projectID}, {
            $set:{
                name:newProjectName,
                goal:newProjectGoal,
                startAt:newStartDate,
                endAt:newEndDate
            }
        });
        if(updateRslt === 1){
            return {
                status:'success'
            }
        }
        else{
            return{
                status: 'something goes wrong'
            }
        }
    },
    
    // 마이페이지 변경 부분 server에서 처리하기
    'updateUser': function(loginedId, newPassword, newName) {
        var updateRslt = userDB.update({username: loginedId}, {
            $set: {
                password: newPassword,
                name: newName
            }
        });
        // user가 한명일 때 이렇게 되는거
        if (updateRslt === 1) {
            return {
                status: 'success'
            }
        }
        else {
            return {
                status: 'something goes wrong'
            }
        }

    },
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