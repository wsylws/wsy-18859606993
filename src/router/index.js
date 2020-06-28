import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../components/Layout';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export let constantRouterMap = [{
  path: '/',
  component: () => import('../views/Login')
},
{
  path: '/login',
  component: () => import('../views/Login')
},
// {
//   path: '*',
//   redirect: '/404'
// },
{
  path: '/404',
  component: () => import('../views/PageNoFind')
},
// 商品列表
{
  path: '/product',
  redirect: '/product/index',
  component: Layout,
  name: 'product',
  meta: {
    // simpleMenu 没有子菜单
    simpleMenu: true,
    icon: 'nav-icon nav-icon-nav-menu',
    // 路由标题 若父级拥有 simpleMenu children中的 title 不生效
    title: '商品列表'
  },
  children: [{
    path: '/product/index',
    component(resolve) {
      require.ensure(['../views/ProductList/index'], () => {
        resolve(require('../views/ProductList/index'));
      });
    },
    name: 'product-index',
    meta: {
      // 带返回的 不存在菜单中的路由 需要默认显示选中的菜单栏
      parentMenuPath: '/product/index'
    }
  }]
},
// 个人地址
{
  path: '/address',
  redirect: '/address/index',
  component: Layout,
  name: 'address',
  meta: {
    // simpleMenu 没有子菜单
    simpleMenu: true,
    icon: 'nav-icon nav-icon-nav-menu',
    // 路由标题 若父级拥有 simpleMenu children中的 title 不生效
    title: '个人地址'
  },
  children: [{
    path: '/address/index',
    component(resolve) {
      require.ensure(['../views/AddressList/index'], () => {
        resolve(require('../views/AddressList/index'));
      });
    },
    name: 'address-index',
    meta: {
      // 带返回的 不存在菜单中的路由 需要默认显示选中的菜单栏
      parentMenuPath: '/address/index'
    }
  },
  {
    path: "/address/add/:type",
    component: () => import('../views/AddressList/components/AddAddress'),
    name: "AddAddress",
    meta: {
      parentMenuPath: '/address/index',
      title: "新增地址"
    }
  }]
}
];

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
