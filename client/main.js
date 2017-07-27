Router.configure({
    layoutTemplate: 'layout'
});

//맨 처음 화면은 login template으로
Router.route('/', 'login');