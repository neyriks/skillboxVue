import Vue from 'vue';
import App from './App.vue';
// import text from './one';
// import sayHi from './two';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// sayHi(text.message1);
// sayHi(text.message2);
