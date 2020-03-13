import store from '../store'
import LoginPage from '../views/Login'
import Home from '../views/Home'
import Course from '../views/Course'
import User from "../views/User";

export default [


    /* Geral */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        props: true,
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/course',
        name: 'Course',
        component: Course
    },
];
