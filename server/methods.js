Meteor.methods({
    'editTodo' :function(data) {

        todoDB.update({_id: data._id}, {
            $set: {
                isComplete: false
            }
        });

        return {
            status: 'error'
        }

    }
});