Template.proPage.onCreated(function() {
});

Template.proPage.onRendered(function() {
});

Template.proPage.helpers({
    array: function() {
        return todoDB.find({}).fetch();
    }
});

Template.proPage.events({

    // 'click #iconEdit': function(evt, tmpl) {
    //     todoDB.update({_id: tmp_id},
    //         {
    //             $set: {
    //                 title: $('#inpTitle').val(),
    //                 body: $('#inpBody').val()
    //             }
    //         });
    // },
    'click #chBox': function(evt, tmpl) {
        todoDB.update({_id: this.id},
            {
                $set: {
                    isComplete: 'checked'
                }
            });
    },
    'click #iconDelete': function(evt, tmpl) {
        if(confirm('정말 삭제하시겠습니까?')) {
            todoDB.remove({_id: this._id});
        };
    },
    'click #btnAdd': function(evt, tmpl) {
        var strAdd = $('#inpAdd').val();

        todoDB.insert({
            createdAt: new Date(),
            todo: strAdd,
            project_id:'project DBs ID',
            isComplete: ''
        });
    }
    
    //수정 버튼 기능 추가해야함
});