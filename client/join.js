Template.join.onCreated(function() {

});

Template.join.helpers({

});

Template.join.events({
    'click #createAccount': function (evt, tmpl) {

        var email = $('#emailInput').val();
        var password =  $('#passwordInput').val();
        var passwordConfirm =  $('#passwordConfirmInput').val();
        var username =  $('#nameInput').val();


        // 빈칸을 모두 채우지 않을 경우 에러메세지 띄우고 돌아가기
        if((email==="" ) || (password==="") || (passwordConfirm==="") || (username==="") )
        {
            //error 메세지 띄우기
            alert("모든 정보를 입력하세요.");
            return;
        }

        //이미 존재하는 계정이 있는 경우
        if (undefined !== userDB.findOne({username: email})) {
            confirm('이미 회원이 존재합니다.');
            return;
        }
        //비밀번호와 비밀번호 확인이 다른 경우
        else if (password !== passwordConfirm) {
            confirm('비밀번호와 비밀번호 확인이 다릅니다.');
            return;
        }

        userDB.insert({
            username: email,
            password: password,
            name: username
        })

        location.href="/emailSend";
    }
});