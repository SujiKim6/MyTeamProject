
var loginedId = SessionStore.get('myEmail'); //로그인 된 회원의 아이디


//사용자 이메일 채우기
$("#emailInput").val(loginedId);

/*var loginedUser = userDB.findOne({email:loginedId}); //로그인 된 회원 객체

//비밀번호
$("#passwordInput").val(loginedUser.password);

//이름
$("#nameInput").val(loginedUser.name);

//소속
$("#belongInput").val(loginedUser.belong);

//휴대폰
$("#phoneInput").val(loginedUser.phone);*/

Template.mypage.events({
    //기능 구현
});