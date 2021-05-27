<template>
    <div :id="id" class="modal fade">
        <div class="modal-dialog"
             :class="{
                'modal-dialog-scrollable': scrolled,
                'modal-dialog-centered': centered,
                'modal-xl': size === 'xl',
                'modal-lg': size === 'lg',
                'modal-sm': size === 'sm',
            }">
            <div class="modal-content">
                <div class="modal-header" v-if="hasTitleDefined">
                    <h5 class="modal-title"><slot name="title"></slot></h5>
                    <button type="button" class="btn-close" @click="instance.hide()"></button>
                </div>
                <div class="modal-body py-0" :class="{'p-0': slim}">
                    <slot name="content" :el="$el" :modal="instance"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="buttons" :el="$el" :modal="instance">
                        <button type="button" class="btn btn-secondary" @click="instance.hide()">Kapat</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        id: String,
        backdrop: String,
        size: String,
        keyboard: Boolean,
        focus: Boolean,
        scrolled: {
            type: Boolean,
            default: true
        },
        centered: {
            type: Boolean,
            default: true
        },
        slim: Boolean,
        onShow: Function,
        onShown: Function,
        onHide: Function,
        onHidden: Function,
    },
    data() {
        return {
            instance: null,
        }
    },
    computed:{
        hasTitleDefined () {
            return !!this.$slots.title
        },
    },
    beforeCreate() {
        this.$root[this.id] = this;
    },
    mounted() {
        this.instance = new this.bootstrap.Modal(this.$el, {
            backdrop: this.backdrop || true,
            keyboard: this.keyboard || true,
            focus: this.focus || true,
        });

        if (this.onShow)
            this.$el.addEventListener('show.bs.modal', this.onShow)

        if (this.onShown)
            this.$el.addEventListener('shown.bs.modal', this.onShow)

        if (this.onHide)
            this.$el.addEventListener('hide.bs.modal', this.onHide)

        if (this.onHidden)
            this.$el.addEventListener('hidden.bs.modal', this.onHidden)
    }
}
</script>

<style lang="scss">
@import "../../../_variables.scss";

.modal-title {
    display: flex;
    align-items: center;

    i {
        font-size: $font-size-base + .7;
        margin-right: .75rem;
    }
}

.modal-content{
    box-shadow: 0 .5rem 1rem rgba(0,0,0, .15);
}

.modal-footer{
    padding: .5rem 0.75rem;
}

.modal{
    .table-bordered > :not(caption) > * > *{
        border-width: 0;
    }
}
</style>
