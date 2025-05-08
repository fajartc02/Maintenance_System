import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VuePageTransition from 'vue-page-transition'

import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css';
import 'apexcharts'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// import { MdButton } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'




Vue.component('v-select', vSelect)

import 'vue-search-select/dist/VueSearchSelect.css'




import Progress from 'vue-multiple-progress'
import vuetify from './plugins/vuetify';
import VueExcelViewer from '@uublue/vue-excel-viewer'
import '@uublue/vue-excel-viewer/lib/vue-excel-viewer.css'

// import VuePdfReader from 'vue-pdf-reader';
// import 'vue-pdf-reader/vue-pdf-reader.css';

// Vue.use(VuePdfReader);

Vue.use(VueExcelViewer)
    // # Vue.component('vm-progress', Progress) # 可以指定组件名称
Vue.use(Progress) //# 组件名称 `vm-progress`

Vue.use(VuePageTransition)

// Vue.use(MdButton)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')