
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
