Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
    isEditing: function() {
        if(Session.get('editingId') === this._id) {
            return true;
        }
        else {
            return false;
        }
    },

    array: function() {
        return todoDB.find({}).fetch();
    }
});

Template.proPage.events({

    // 할 일 체크
    'click #chBox': function(evt, tmpl) {
        if ($("chBox").checked) {
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: false
                    }
                });
        } else {
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: true
                    }
                });
        }
    },

    // 할 일 수정
    'click #btnEdit': function(evt, tmpl) {
        todoDB.update({_id: Session.get('editingId')}, {
            $set: {
                todo: $("#inpEdit").val()
            }
        });
        Session.set('editingId','')
    },

    'click #iconEdit': function(evt, tmpl) {
        Session.set('editingId',this._id)
        // Meteor.call('editTodo', function(err, rslt) {
        //     alert(rslt.status)
        //     if(rslt.status === 'success') {
        //     }
        //     else {
        //         alert('프로젝트 생성에 문제가 있습니다.');
        //     }
        // });
    },

    // 할 일 삭제
    'click #iconDelete': function(evt, tmpl) {
        if(confirm('정말 삭제하시겠습니까?')) {
            todoDB.remove({_id: this._id});
        };
    },

    // 할 일 추가
    'click #btnAdd': function(evt, tmpl) {
        var strAdd = $('#inpAdd').val();

        todoDB.insert({
            createdAt: new Date(),
            todo: strAdd,
            project_id:'project DBs ID',
            isComplete: false
        });
        $("#inpAdd").val('');
    }

});