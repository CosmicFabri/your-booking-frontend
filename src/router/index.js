import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import AdminBookings from "@/views/admin/AdminBookings.vue";
import AdminSpaces from "@/views/admin/AdminSpaces.vue";
import AdminHistory from "@/views/admin/AdminHistory.vue";

const router = createRouter({
    // Go back and forth between pages, like a server-rendered app
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        },
        {
            path: '/admin/bookings',
            name: 'admin-bookings',
            component: AdminBookings
        },
        {
            path: '/admin/spaces',
            name: 'admin-spaces',
            component: AdminSpaces
        },
        {
            path: '/admin/history',
            name: 'admin-history',
            component: AdminHistory
        }
    ]
})

export default router