import '@/styles.css';
import App from '@/App.vue';
import store from './store.js';
import { createApp } from 'vue';

createApp(App).use(store).mount('#app');
