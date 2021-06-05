<template>
    <div class="ajax-form full-form">
        <off-canvas id="ajaxForm" ref="canvas" @submit.prevent="post" :size="size">
            <template v-slot:title>{{ title }}</template>
            <template v-slot:content>
                <component v-if="content" :is="{ template:content }"/>
            </template>
        </off-canvas>
    </div>
</template>

<script>
export default {
    name: "AjaxForm",
    props: ['table', 'message', 'size'],
    data() {
        return {
            url: null,
            title: null,
            content: null,
            index: null
        }
    },
    methods: {
        get(url, title, index) {
            this.url = url;
            this.index = index ?? null;
            this.title = title || null;

            this.$root.http.get(url).then((resp) => {
                this.content = resp.data;
                this.$refs.canvas.show();
            })
        },

        post(event) {
            this.$root.http.post(this.url, new FormData(event.target))
                .then((resp) => {
                    if (typeof this.index === 'number') {
                        window.Table.$data.data[this.index] = resp.data.data || resp.data;
                    }
                    if (typeof this.index === 'string') {
                        window.Table.$data.data.push(resp.data.data || resp.data);
                    }

                    if (this.message) {
                        this.$root.msg.success(this.message);
                    }

                    this.$refs.canvas.instance.hide();
                })
                .catch((err) => {
                    this.content = err.response.data;
                })
        }
    }
}
</script>

<style lang="scss">
.ajax-form{
    .form-check{
        width: 100% !important;
    }

    .form-container {
        & > *:nth-child(2n) {
            margin-left: calc(var(--bs-gutter-x) / -2);
        }

        & > *:last-of-type > div {
            padding-left: calc(var(--bs-gutter-x) / 2);
        }
    }
}
</style>
