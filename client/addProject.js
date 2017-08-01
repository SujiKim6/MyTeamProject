Template.addProject.events({
    'click #confirmBtn': function(evt, tmpl) {
        var project_name =  $('#projectName').val();
        var project_goal =  $('#projectGoal').val();
        var startDate =  $('#inpStartDate').val();
        var endDate =  $('#inpEndDate').val();
        var publicSelected = false;
        if(document.getElementById('public').checked) {
            publicSelected = true;
        }
        if((project_name === undefined )&&(project_goal ===undefined)&&(startDate===undefined) &&(endDate===undefined) )
        {
            //error 메세지 띄우기
            return error;
        }
        
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
})