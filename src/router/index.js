import {createRouter, createWebHistory} from "vue-router";
const ControlPanel = () => import("../views/ControlPanel.vue");
const SignIn = () => import("../views/SignIn.vue");

const WalletConnection = () => import("../views/WalletConnection.vue")
const WalletDisConnection = () => import("../views/WalletDisconnection.vue")
const CourseEvaluation = () => import("../views/CourseEvaluation.vue")
const VoteMenu = () => import("../views/VoteMenu.vue")

const routes = [
    {
        path: '/panel',
        name: "control-panel",
        component: ControlPanel,
        meta: {requiresAuth: true},
    },
    {
        path: '/connect-wallet',
        name: "wallet-connection",
        component: WalletConnection,
        meta: {requiresAuth: true},
    },
    {
        path: '/disconnect-wallet',
        name: "wallet-disconnection",
        component: WalletDisConnection,
        meta: {requiresAuth: true},
    },
    {
        path: '/course-evaluation',
        name: "course-evaluation",
        component: CourseEvaluation,
        meta: {requiresAuth: true},
    },
    {
        path: '/vote/:courseId',
        name: "vote-menu",
        component: VoteMenu,
        meta: {requiresAuth: true},
    },
    {
        name: "signIn",
        path: '/signIn',
        component: SignIn,
        meta: {requiresAuth: false},
    },
    {
        path: "/:catchAll(.*)*",
        redirect: {name: "signIn"},
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: "text-yellow-500",
});
import {useAuthStore} from '../stores/authStore.js';

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated && to.name !== 'signIn') {
        next({name: 'signIn'})
    } else if (to.name === 'signIn') {
        next();
    } else if (to.name === 'home') {
        next()
    } else {
        next();
    }
})
export default router;