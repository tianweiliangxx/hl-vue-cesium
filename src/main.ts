import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/main.css';
import "cesium/Build/Cesium/Widgets/widgets.css";

import App from './App.vue';
import router from './router';

import './mock/index';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
