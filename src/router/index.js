import Vue from 'vue'
import Router from 'vue-router'
import common from '../components/common/common'
import analyze from '../components/analyze/analyze'
import evaluate from '../components/evaluate/evaluate'
import diagnose from '../components/diagnose/diagnose'
import newLine from '../components/emulation/newLine'
import editLine from '../components/emulation/editLine'
import login from '../components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: login},
    { path: '/common', name: 'common', component: common},
    { path: '/analyze', component: analyze},
    { path: '/evaluate', component: evaluate},
    { path: '/diagnose', component: diagnose},
    { path: '/newline', component: newLine},
    { path: '/editline', component: editLine}
  ]
})
