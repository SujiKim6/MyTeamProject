Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
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
    },

    project: function () {
        return projectDB.find({_id: SessionStore.get('curProject')}).fetch();
    }

});

Template.proPage.events({
    //프로젝트 삭제: client에서 원래 안된대..ㄷㄷ
    'click #projectDelete': function (evt, tmpl) {
        //매니저만 삭제기능을 사용 할 수 있음 그러므로 매니저 검증 ㄱㄱ
        var loginedId = SessionStore.get('myEmail'); //지금 로그인한 애 아이디
        var currentProject = SessionStore.get('curProject');

        var manager = projectDB.findOne({$and: [{_id: currentProject}, {manager_username: loginedId}]}); //지금 로그인한 놈이 현재 프로젝트의 매니저인가?
        if (manager !== undefined) { //응 매니저 맞음
            //프로젝트, 프로젝트 멤버, 할일 삭제
            projectDB.remove({_id: currentProject});
            projectMemberDB.remove({project_id: currentProject});
            todoDB.remove({project_id: currentProject});
        } else { //매니저 아님
            confirm('매니저만 프로젝트를 삭제 할 수 있습니다.');
        }
    },

    //프로젝트 변경 -아직 화면이 없음;;
    /*'click #projectUpdate': function (evt, tmpl) {
        var loginedId = SessionStore.get('myEmail'); //지금 로그인한 애 아이디
        var currentProject = SessionStore.get('curProject');

        var manager = projectDB.findOne({$and: [{_id: currentProject}, {manager_username: loginedId}]}); //지금 로그인한 놈이 현재 프로젝트의 매니저인가?
        if (manager !== undefined) { //응 매니저 맞음
            //프로젝트 변경
            projectDB.update({_id: currentProject},{
                $set: { //해당 필드만 바꿈 set오브젝트

                }
            });
        } else { //매니저 아님
            confirm('매니저만 프로젝트를 삭제 할 수 있습니다.');
        }
    },*/

    // 할 일 체크
    'click #chBox': function(evt, tmpl) {
        if ($("chBox").checked) { //체크가 되어있으면
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
        var currentProject = SessionStore.get('curProject');

        todoDB.insert({
            createdAt: new Date(),
            todo: strAdd,
            project_id: SessionStore.get('curProject'),
            isComplete: false
        });
        $("#inpAdd").val('');
    }

});