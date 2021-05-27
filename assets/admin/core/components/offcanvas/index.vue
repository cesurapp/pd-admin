<template>
    <div :id="id" class="offcanvas" tabindex="-1" :class="{
                'offcanvas-start': placement === 'start',
                'offcanvas-end': placement === 'end',
                'offcanvas-top': placement === 'top',
                'offcanvas-bottom': placement === 'bottom',
            }" :style="{'width': size}">
        <div class="offcanvas-header pb-0" v-if="hasTitleDefined">
            <h4 class="offcanvas-title d-flex align-items-center">
                <slot name="title"></slot>
            </h4>
            <button type="button" class="btn-close text-reset" @click="instance.hide()"></button>
        </div>
        <div class="offcanvas-body">
            <slot name="content" :el="el" :canvas="instance" :content="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OffCanvas',
    props: {
        id: String,
        size: {
            type: String,
            default: '400px'
        },
        placement: {
            type: String,
            default: 'end'
        },
        backdrop: String,
        keyboard: Boolean,

        onShow: Function,
        onShown: Function,
        onHide: Function,
        onHidden: Function,
    },
    data() {
        return {
            instance: null,
            el: null,
            content: null
        }
    },
    computed: {
        hasTitleDefined() {
            return !!this.$slots.title
        },
    },
    beforeCreate() {
        this.$root[this.id] = this;
    },
    mounted() {
        this.el = this.$el;
        this.instance = new this.bootstrap.Offcanvas(this.$el, {
            backdrop: this.backdrop || true,
            keyboard: this.keyboard || true,
        });

        if (this.onShow)
            this.$el.addEventListener('show.bs.offcanvas', this.onShow)

        if (this.onShown)
            this.$el.addEventListener('shown.bs.offcanvas', this.onShow)

        if (this.onHide)
            this.$el.addEventListener('hide.bs.offcanvas', this.onHide)

        if (this.onHidden)
            this.$el.addEventListener('hidden.bs.offcanvas', this.onHidden)
    },
    methods:{
        show(url) {
            if (url) {
                this.$root.http.get(url).then((resp) => {
                    this.content = resp.data;
                })
            }

            this.instance.show();
        }
    }
}
</script>

<style lang="scss">
@import "../../../_variables.scss";

.offcanvas-title {
    i {
        margin-right: .5rem;
    }
}
</style>
