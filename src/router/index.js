import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import DashBoard from './../views/dashboard/Dashboard'
const Home = () => import('./../views/home/Home.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');
const Mine = () => import('./../views/mine/Mine.vue');
const Order = () => import('./../views/order/Order.vue');
const MyAddress = () => import('./../views/order/child/MyAddress.vue');
const AddAddress = () => import('./../views/order/child/child/AddAddress.vue');
const EditAddress = () => import('./../views/order/child/child/EditAddress.vue');
const Login = () => import('./../views/login/Login.vue');
const UserCenter = () => import('./../views/mine/child/UserCenter.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/dashboard' },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
            children: [
                { path: '/dashboard', redirect: '/dashboard/home' },
                { path: 'home', name: 'home', component: Home, meta: { keepAlive: true } },
                { path: 'category', name: 'category', component: Category, meta: { keepAlive: true } },
                { path: 'cart', name: 'cart', component: Cart },
                {
                    path: 'mine', name: 'mine', component: Mine,
                    children: [
                        { path: 'usercenter', name: 'usercenter', component: UserCenter }
                    ]
                }
            ]
        },
        {
            path: '/order', name: 'order', component: Order,
            children: [
                {
                    path: 'myAddress', name: 'myAddress', component: MyAddress,
                    children: [
                        { path: 'addAddress', name: 'addAddress', component: AddAddress },
                        { path: 'editAddress', name: 'editAddress', component: EditAddress },
                    ]
                }
            ]
        },
        { path: '/login', name: 'login', component: Login }
    ]
});