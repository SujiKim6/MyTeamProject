Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
    projectDetail:function () {
        var project = projectDB.find({_id:SessionStore.get('curProject')}).fetch();
        return project;
    },
    isComplete: function() {
        return Session.get('isChecked')
    },

    isEditing: function() {
        if(Session.get('editingId') === this._id) {
            return true;
        }
        else {
            return false;
        }
    },

    array: function() {
        return todoDB.find({project_id:SessionStore.get('curProject')}).fetch();
    },

    percentage: function () {
        var currentProject = SessionStore.get('curProject'); //현재 보고있는 프로젝트 아이디
        var curProjectTodosCount = todoDB.find({project_id: currentProject}).count(); //그냥 할일 전체
        var curProjectTodosCompletedCount = todoDB.find({project_id: currentProject, isComplete: true}).count(); //할일 완료한 애
        if (curProjectTodosCount === 0) { //0으로 못 나누므로 할일이 없으면 그냥 0% 처리한다
            return 0;
        }
        return (curProjectTodosCompletedCount / curProjectTodosCount) * 100;
    }

});

Template.proPage.events({

    // 할 일 체크박스 선택시 이벤트
    'click #chBox': function(evt, tmpl) {
        if ($("chBox").checked) {
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: false
                    }
                });
            Session.set('isChecked', false)
        } else {
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: true
                    }
                });
            Session.set('isChecked', true)
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
        alert(SessionStore.get('curProject'))
        todoDB.insert({
            createdAt: new Date(),
            todo: strAdd,
            project_id: SessionStore.get('curProject'),
            isComplete: false
        });
        $("#inpAdd").val('');
    }

});