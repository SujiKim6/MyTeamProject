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
        
        // 빈칸을 모두 채우지 않을 경우 에러메세지 띄우고 돌아가기
        if((project_name === undefined )&&(project_goal ===undefined)&&(startDate===undefined) &&(endDate===undefined) )
        {
            //error 메세지 띄우기
            return alert("모든 정보를 입력하세요.");
        }
        
        // 빈칸을 모두 채웠을 경우 DB에 추가하기
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