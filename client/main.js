
Router.configure({
    layoutTemplate: 'layout'
});
//맨 처음 화면은 login template으로
Router.route('/', 'login');
Router.route('/join', 'join');
Router.route('/mypage', 'mypage');
Router.route('/projectMain', 'projectMain');
Router.route('/addProject', 'addProject');
Router.route('/calender', 'calender');
Router.route('/tab', 'tab');
Router.route('/proMain', 'proMain');
Router.route('/table','table');
Router.route('/proAdd', 'proAdd');
Router.route('/proDelete', 'proDelete');
Router.route('/emailSend', 'emailSend');
