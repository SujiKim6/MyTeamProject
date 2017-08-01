//DB 생성
todoDB = new Mongo.Collection('todoDB'); //할일 DB
projectDB = new Mongo.Collection('projectDB'); //프로젝트 DB
userDB = new Mongo.Collection('userDB'); //사용자 DB
projectMemberDB = new Mongo.Collection('projectMemberDB');


// //어플의 전반적인 DB 구성
// var user = {
//     createdAt: new Date(),
//     username: 'email',
//     nickname: 'nickname'
//     password: 'password'
// }
//
// var project = {
//     createdAt: new Date(),
//     name: 'project name',
//     goal: 'goal string',
//     startAt: new Date(),
//     endAt: new Date(),
//     manager_username:'email'
//     isPublic: true/false
//     password: 0000
// }
//
// var project_member ={
//     createdAt: new Date(),
//     project_id: 'project DBs ID',
//     member_username: 'email',
//     isAccepted: false //프로젝트 만든 사람은 true 초기값/ 수락하면 true로 바꾸고 거절을 누르면 이 데이터를 삭제
// }
//
// //todo 생성 조건 : project_member에 email이 있고,
// //isAccepted가 true라서 멤버 수락을 한 녀석
// var project_todos ={
//     createdAt: new Date(),
//     todo:'to do text',
//     project_id:'project DBs ID',
//     isComplete: false //checkbox 체크시 true
// }