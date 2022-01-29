import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

// axios 전역 선언
Vue.prototype.axios = axios;

let test = 'test';

// 참조: https://medium.com/witinweb/vue-js-provide-inject-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-743502dbb449
// let child = {
//   inject: ['age'],
//   template: `<div>I am {{ age }} years old.</div>`,
// };

new Vue({
  // optinos...
  router,
  render: (h) => h(App),
  el: '#app',
  // provide: {
  //   test: 'ttt',
  // },
  // template: `<div>I am {{ foo }} years old.</div>`,
  data: () => ({
    test,
  }),
  beforeCreate() {
    console.log('%c=== new Vue 내 beforeCreate ===', 'color: blue');
    console.log('$el: ', this.$el);
    console.log('data test: ', this.test);
  },
  created() {
    console.log('%c=== new Vue 내 created ===', 'color: blue');
    console.log('$el: ', this.$el);
    console.log('data test: ', this.test);
  },
  beforeMount() {
    console.log('%c=== new Vue 내 beforeMount ===', 'color: blue');
    console.log('$el: ', this.$el);
    console.log('data test: ', this.test);
  },
  mounted() {
    console.log('%c=== new Vue 내 mounted ===', 'color: blue');
    console.log(this.$el);
    console.log('data test: ', this.test);
  },
  beforeUpdate() {
    console.log('%c=== new Vue 내 beforeUpdate ===', 'color: blue');
    console.log(this.$el);
  },
  updated() {
    console.log('%c=== new Vue 내 updated ===', 'color: blue');
    console.log(this.$el);
  },
  beforeDestroy() {
    console.log('%c=== new Vue 내 beforeDestroy ===', 'color: blue');
  },
  destroyed() {
    console.log('%c=== new Vue 내 destroyed ===', 'color: blue');
  },
});

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');
