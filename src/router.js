import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import Developers from './pages/Developers.vue';
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
        // {
        //     path: '/blog',
        //     name: 'posts',
        //     component: PostList
        // },
    ]
});
export { router };