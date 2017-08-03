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
        return userInfo;
    },
    // 변경 버튼을 눌렀을 때 UI 바꾸기
    change:function () {
        return Session.get('clickedChange');
    }
});


Template.mypage.events({

    //회원 탈퇴하기
    'click #memberOut': function () {
        if (alert('정말 탈퇴하시겠습니까?')) {
            Meteor.call('removeUser', SessionStore.get('myEmail'), function (err, rslt) {
                if (rslt.status === 'success') {
                    alert('s')
                    location.href='/';
                }
                else {
                    alert('매니저 위임 실패')
                }
            });
        }
    },

//변경버튼을 누른 다음에 창이 바뀌고 확인버튼 눌렀을 때 변경이 되야한다구
    'click #confirmChange': function () {
        var loginedId = $('#usernameInput').val();
        var newPassword = $('#passwordInput').val();
        var newPasswordConfirm = $('#passwordInputConfirm').val();
        var newName = $('#nameInput').val();
        // var school = $('#schoolInput').val();
        // var phone = $('#phoneInput').val();

        //필수 입력사항 빈칸 있으면 오류
        if((newPassword==="" ) || (newName==="")) {
            //error 메세지 띄우기
            alert("비밀번호와 이름은 필수 입력사항 입니다.");
            return;
        }
        //패스워드와 패스워드 확인input이 틀리면 오류
        if((newPassword !== newPasswordConfirm)) {
            //error 메세지 띄우기
            alert("비밀번호와 비밀번호 확인이 다릅니다.");
            return;
        }
        // alert(loginedId);
        // alert(newPassword);
        // alert(newName);
        Meteor.call('updateUser', loginedId, newPassword, newName, function(err, rslt) {
            // if(err) {
            //     alert(err.toString());
            // }
            if(rslt.status === 'success') {
                //성공
                // alert('success');
                if(confirm("변경이 완료되었습니다.")){
                    Session.set('clickedChange',false);
                    location.href='/proMain';
                }
            }

        });

    },

    'click #change':function () {
        Session.set('clickedChange',true);
    }

});