Meteor.methods({

    // 회원 탈퇴하기
    'removeUser': function(email) {
        userDB.remove({username: email});
        return {
            status: 'success'
        }
    }/*,

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

    'editTodo' :function(data) {

        todoDB.update({_id: data._id}, {
            $set: {
                isComplete: false
            }
        });

        return {
            status: 'error'
        }
    }*/

});