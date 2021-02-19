import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import Bar from "./components/Bar";
import Foo from "./components/Foo";
import Login from "./components/Login";
import NavLeft from "./components/NavLeft";
import Home from "./components/Home";
import Hello from "./components/Hello";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/*路由组*/
const routes=[
    {path:'/',component:Login},
    {
        path:'/Home',component:Home,
        children:[
            {
                path:'Hello',
                component:Hello
            },
            {
                path:'Bar',
                component:Bar
            },
            {
                path:'Foo',
                component:Foo
            }
        ]
    },
    {path:'/NavLeft',component:NavLeft}
];
/*路由实例*/
const router=new VueRouter(
    {
      routes
    }
);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
