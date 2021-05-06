import * as Vue from 'vue/dist/vue.esm-bundler'
import {onMounted, getCurrentInstance, ref} from 'vue'

/**
 * ============
 * Init Vue & Core
 * ============
 */
let appConfig = {
    ...{delimiters: ['${', '}']},
    ...(window.vueApp || {}),
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
 * Create APP
 * ============
 */
window.Root = Vue.createApp(appConfig)
    .use(require('./core/index').default)
    .use(require('./src/index').default)
    .mount('#app');
