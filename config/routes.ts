export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/', redirect: '/add/chart' },
  { path: '/add/chart', name: '智能分析', icon: 'BarChartOutlined', component: './AddChart' },
  { path: '/add/chart/async', name: '智能分析（异步）', icon: 'BarChartOutlined', component: './AddChartAsync' },
  { path: '/my/chart', name: '我的图表', icon: 'DotChartOutlined', component: './MyChart' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: '管理页', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
