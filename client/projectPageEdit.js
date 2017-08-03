Template.projectPageEdit.helpers({
    projectDetail:function () {
        var projects = projectDB.find({_id:SessionStore.get('curProject')}).fetch();
        return projects;
    }
});


Template.projectPageEdit.events({
    'click #confirmBtn':function () {
        var projectID=SessionStore.get('curProject');
        var newProjectName = $('#projectName').val();
        var newStartDate = new Date($('#inpStartDate').val());
        var newEndDate = new Date($('#inpEndDate').val());
        var newProjectGoal = $('#projectGoal').val();

        //필수 입력사항 빈칸 있으면 오류
        if((newProjectName==="" ) || ($('#inpStartDate').val()==="")||($('#inpEndDate').val()==="Invalid Date")||(newProjectGoal==="")) {
            //error 메세지 띄우기
            alert("빈칸을 모두 채워주세요.");
            return;
        }

        Meteor.call('updateProjectDetail', projectID, newProjectName, newStartDate,newEndDate, newProjectGoal, function(err, rslt) {
            // if(err) {
            //     alert(err.toString());
            // }
            if(rslt.status === 'success') {
                //성공
                // alert('success');
                if(confirm("변경이 완료되었습니다.")){
                    location.href='/tab';
                }
            }

        });
    },
})