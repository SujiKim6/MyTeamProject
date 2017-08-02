Template.mypage.onCreated(function() {

});

Template.mypage.onRendered(function() {
});

Template.mypage.helpers({
    myInfo: function() {
        // 임시 테스트
        //SessionStore.set('myEmail','heerim12@naver.com')

        // 현재 사용자의 정보
        var loginedId = SessionStore.get('myEmail'); //로그인된 아이디
        var userInfo = userDB.find({username: loginedId}).fetch();
        var name = userDB.find({name: loginedId}).fetch();
        return userInfo;
    }
});


Template.mypage.events({
    'click #confirm': function () {
        var loginedId = $('#usernameInput').val();
        var newPassword = $('#passwordInput').val();
        var newName = $('#nameInput').val();
        var school = $('#schoolInput').val();
        var phone = $('#phoneInput').val();

        //필수 입력사항 빈칸 있으면 오류
        if((newPassword==="" ) || (newName==="")) {
            //error 메세지 띄우기
            alert("비밀번호와 이름은 필수 입력사항 입니다.");
            return;
        }

        if (confirm('회원정보를 변경하시겠습니까?')) {

            //회원 업데이트
            userDB.update({username: loginedId}, {
                $set: {
                    password: newPassword,
                    name: newName,
                }
            });
            location.href="/projectMain";
        }
    }

});