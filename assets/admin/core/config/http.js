import Axios from 'axios';
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Axios',
    render() {
    },
    beforeCreate() {
        /**
         * Axios Instance
         */
        const http = Axios.create({
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        /**
         * Global Request Modifier
         */
        http.interceptors.request.use(
            (request) => {
                // Progress Start
                request.id = Math.floor(Math.random() * Math.floor(10000))
                this.$root.progress.start(request.id);

                return request;
            },
            (request) => {
                // Progress Error
                this.$root.progress.error(request.id);

                return Promise.reject(request);
            }
        )

        /**
         * Global Response Modifier
         */
        http.interceptors.response.use(
            (response) => {
                // Show Alert Message
                this.$root.msg.showBag(response.data.messages);

                // Progress Success
                this.$root.progress.success(response.config.id);

                return response;
            },
            (response) => {
                // Show Alert Message
                if (response.response.data.hasOwnProperty('messages')) {
                    this.$root.msg.showBag(response.response.data.messages);
                }

                // Progress Error
                this.$root.progress.error(response.config.id);

                return Promise.reject(response)
            }
        )

        this.$root.http = http;
    }
})


