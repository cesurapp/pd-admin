import {onMounted, getCurrentInstance, ref, createApp} from 'vue/dist/vue.esm-bundler'
import appMerger from "./core/config/appMerger";

/**
 * ============
 * Init Vue & Core
 * ============
 */
let appConfig = {
    ...{delimiters: ['${', '}']},
    ...{
        setup(props, context) {
            let forms = ref({});
            const app = getCurrentInstance().ctx;

            // Flash Message
            onMounted(() => {
                app.msg.showBag(window.flashBag);
            })

            return {
                forms
            }
        },
    }
}

/**
 * ============
 * Merge APPS
 * ============
 */
appMerger(appConfig, window.vueApp)
delete window.vueApp;

/**
 * ============
 * Create APP
 * ============
 */
window.Root = createApp(appConfig)
    .use(require('./core/index').default)
    .use(require('./src/index').default)
    .mount('#app');

