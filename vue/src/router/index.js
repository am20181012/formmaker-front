import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../view/Dashboard.vue';
import Login from '../view/Login.vue';
import Register from '../view/Register.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import Forms from '../view/Forms.vue';
import store from '../store';
import AuthLayout from  '../components/AuthLayout.vue';
import FormView from '../view/FormView.vue';
import PublicView from '../view/PublicView.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/forms', name: 'Forms', component: Forms },
            { path: "/forms/create", name: "FormCreate", component: FormView},
            { path: "/forms/:id", name: "FormView", component: FormView}
        ]
    },
    {
        path: '/view/form/:slug',
        name: 'PublicView',
        component: PublicView
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            { path: '/login', name: 'Login', component: Login },
            { path: '/register', name: 'Register', component: Register }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ 
            name: 'Login' 
        });
//    } else if (store.state.user.token && (to.name === 'Login' || to.name === 'Register')) {
    } else if (store.state.user.token && to.meta.isGuest) {
        next({
            name: 'Dashboard'
        });
    } else {
        next();
    }
});

export default router;