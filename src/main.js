import { createApp } from 'vue'

import App from './App.vue'

//importo bootstrap js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// importo vue router
import { router } from './router';

createApp(App).use(router).mount('#app')
