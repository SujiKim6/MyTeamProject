
Router.configure({
    layoutTemplate: 'layout'
});

//맨 처음 화면은 login template으로
Router.route('/', 'login');
Router.route('/join', 'join');
Router.route('/mypage', 'mypage');
Router.route('/proMain', 'projectMain');
Router.route('/addProject', 'addProject');
Router.route('/calender', 'calender');
Router.route('/tab', 'tab');
Router.route('/proTable','proTable');
Router.route('/proMembers', 'proMembers');
Router.route('/membersTable','membersTable');
Router.route('/proMembersEdit', 'proMembersEdit');
Router.route('/checkTable', 'checkTable');
Router.route('/emailSend', 'emailSend');
Router.route('/proPageEdit', 'proPageEdit');
Router.route('/invite', 'invite');
Router.route('/inviteSend', 'inviteSend');
Router.route('/tab/proPageEdit', 'projectPageEdit');