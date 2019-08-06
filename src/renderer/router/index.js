import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: require('@/views/LandingPage.vue').default
    },
    {
      path: '/bmi-calculator',
      name: 'BMICalculator',
      component: require('@/views/BMICalculator.vue').default
    }
  ]
})
