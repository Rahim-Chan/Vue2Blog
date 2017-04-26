/*eslint no-console: ['error', { allow: ['log', 'error'] }] */

import Vue from 'vue'
import App from './page/App.vue'
// import main from'./page/main.vue'

require('./css/style.css')
require('./webcom/acart.css')
require('./webcom/hq.js')
require('./webcom/ct.css')
require('es6-promise').polyfill()

// Tell Vue.js to use vue-highlightjs 
// require('./webcom/hq.js')
import VueRouter from 'vue-router'
import Toast from './coms/toast.js'
import axios from 'axios'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
Vue.use(Toast)
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    component: function (resolve) {
      require(['./page/main.vue'], resolve)
    }
  }, {
    path: '/main/journal/detail/:id',
    name: 'detail',
    component: function (resolve) {
      require(['./page/detail.vue'], resolve)
    }
  }, {
    path: '/self',
    name: 'self',
    component: function (resolve) {
      require(['./page/self.vue'], resolve)
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function (resolve) {
      require(['./page/login.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      axios.get('/session').then(response => {
        if (response.status == 200) {
          // next({name: 'bgeditor'})
          next()
        }
      }, error => {
        console.log(error)
        next({
          name: 'self'
        })
        router.app.check_login = true
      })
    },
    children: [{
        path: '',
        name: 'bgeditor',
        component: function (resolve) {
          require(['./page/bgeditor.vue'], resolve)
        }
      },
      {
        path: 'addnew',
        name: 'addnew',
        component: function (resolve) {
          require(['./page/addnew.vue'], resolve)
        }
      }
    ]
  },
  {
    path: '/*',
    name: '404',
    component: {
      template: `<div class="cntr-flex full-width full-height justify-center aligni-center">
						<h1 class="text-center">404 PageNotFound</h1>
						<router-link to='/'>to main</router-link>
					</div>`,
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router,
  data() {
    return {
      isMoblie: false,
      check_login: false,
      apiRoot: ''

    }
  },
  mounted() {
    const self = this
    let resizeTimer = null
    this.isMoblie = window.innerWidth / devicePixelRatio >= 383 ? false : true
    window.addEventListener('resize', function () {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      /* 第一次访问，赋值给 resizeTimer，绑定的函数 400ms 后调用 */
      resizeTimer = setTimeout(function () {
        self.isMoblie = window.innerWidth / devicePixelRatio >= 383 ? false : true
      }, 400)
    })
  },
  methods: {
    ckLogin() {
      axios.get(`${this.$root.apiRoot}/checklogin`).then(response => {
        if (response.status == 200) {
          this.$router.push('/bgeditor')
        }
      }, () => {
        this.check_login = true

      })
    },
  },
  render: h => h(App)
})
