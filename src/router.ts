import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/test',
        },
        { //懒加载
            path: '/test',
            component: () => import('./views/Test.vue')
        }
    ]
});
