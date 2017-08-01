Template.addProject.helpers({

});

Handlebars.registerHelper('if', function (options) {
    if(isPublic === true) { //공개면
        return options.fn(this);
    } else { //비공개면
        return options.inverse(this);
    }
});




Template.addProject.events({

    //비공개 라디오 버튼 클릭시 입력상자에 readonly 속성추가
    'click #private': function (evt, tmpl) {
        //
    },

    //공개 라디오 버튼 클릭시
    'click #public' :function (evt, tmpl) {
        //
    },

    //addProject의 프로젝트 할일 추가 + 버튼
    'click #addProjectPlusBtn': function (evt, tmpl) {
        var todo_list = $('#todoInput').val();

        //할일을 할일DB에 추가한다.
        todoDB.insert({
            createdAt: new Date(),
            project_id: this._id,
            content: todo_list
        });
    },

    //addProject의 확인 버튼
    'click #confirmBtn': function(evt, tmpl) {
        var project_name =  $('#projectName').val();
        var project_goal =  $('#projectGoal').val();
        var startDate =  $('#inpStartDate').val();
        var endDate =  $('#inpEndDate').val();
        var publicSelected = false;

        if(document.getElementById('public').checked) {
            publicSelected = true;
        }
        //프로젝트DB에 넣는다.
        projectDB.insert({
            createdAt: new Date(),
            name: project_name,
            goal: project_goal,
            startAt: startDate,
            endAt: endDate,
            manager_username:'email',
            isPublic: publicSelected
        });
    }



});