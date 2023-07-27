import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import Developers from './pages/Developers.vue';
import SingleDeveloper from './pages/SingleDeveloper.vue';
import NotFound from './pages/NotFound.vue';


// import PostList from './pages/PostList.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/developers',
            name: 'developers',
            component: Developers
        },
        // nuova rotta per la show
        {
            path: '/developer/:dev_id',
            name: 'singleDeveloper',
            component: ()=> import('./pages/SingleDeveloper.vue')
        },
        // in caso di errore Show
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound
        },
    ]
});
export { router };