Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
    array: function() {
        return todoDB.find({project_id:SessionStore.get('curProject')}).fetch();
    },

    isComplete: function() {
        // alert(this.isComplete)
        // return Session.get('isChecked')
        return this.isComplete;
    },

    isEditing: function() {
        if(Session.get('editingId') === this._id) {
            return true;
        }
        else {
            return false;
        }
    },

    percentage: function () {
        var currentProject = SessionStore.get('curProject'); //현재 보고있는 프로젝트 아이디
        var curProjectTodosCount = todoDB.find({project_id: currentProject}).count(); //그냥 할일 전체
        var curProjectTodosCompletedCount = todoDB.find({project_id: currentProject, isComplete: true}).count(); //할일 완료한 애
        if (curProjectTodosCount === 0) { //0으로 못 나누므로 할일이 없으면 그냥 0% 처리한다
            return 0;
        }
        return Math.round((curProjectTodosCompletedCount / curProjectTodosCount) * 100)
    },

    project: function () {
        return projectDB.find({_id: SessionStore.get('curProject')}).fetch();
    }

});

Template.proPage.events({
    // // 프로젝트를 편집하기
    // 'click #btnEdit': function(evt, tmpl) {
    //     Meteor.call('editProject', projectDB.find({_id: SessionStore.get('curProject')}).fetch(), function(err, rslt) {
    //         if(rslt.status === 'success') {
    //
    //         }
    //         else {
    //
    //         }
    //     });
    //
    // },


    'click #btnDelete': function(evt, tmpl) {

        if (SessionStore.get('myEmail')!=projectDB.findOne({_id:SessionStore.get('curProject')}).manager_username) {
            alert('매니저만 프로젝트를 삭제할 수 있습니다.');
        }
        else if (confirm('정말 삭제하시겠습니까?')) {
            Meteor.call('removeProject', SessionStore.get('curProject'), function(err, rslt) {
                if(rslt.status === 'success') {
                    location.href='/proMain';
                }
                else {
                    alert('프로젝트 삭제에 문제가 있습니다.');
                }
            });
        };
    },

    // 할 일 체크
    'click #chBox': function(evt, tmpl) {
        if ($(evt.target).is(':checked')) { //체크가 되어있으면
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: true
                    }
                });
            Session.set('isChecked', true)
        } else {
            todoDB.update({_id: this._id},
                {
                    $set: {
                        isComplete: false
                    }
                });
            Session.set('isChecked', false)
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
            project_id: SessionStore.get('curProject'),
            isComplete: false
        });
        $("#inpAdd").val('');
    },

    // 프로젝트 편집 클릭시 편집할 수 있는 화면으로 이동
    'click #btnProjectEdit':function () {
        location.href='/tab/proPageEdit'
    }

});