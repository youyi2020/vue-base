import Vue from 'vue'
import Layout from './layout'
import router from './router'

Vue.config.productionTip = false;

new Vue({
    el:"#root",
    router,
    template:'<Layout/>',
    components:{Layout}
});

