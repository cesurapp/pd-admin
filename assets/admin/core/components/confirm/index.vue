<template>
    <div class="confirm">
        <modal ref="modal" id="confirmModal" size="md" v-on:hide="onHide">
            <template v-slot:content="props">
                <div v-if="type === 'info'"
                     class="d-flex flex-column align-items-center justify-content-center p-4 pb-2">
                    <i class="fas fa-info-circle info-icon text-info"></i>
                    <div class="info-description">{{ message }}</div>
                </div>

                <div v-else-if="type === 'warning'"
                     class="d-flex flex-column align-items-center justify-content-center p-4 pb-2">
                    <i class="fas fa-exclamation-circle info-icon text-warning"></i>
                    <div class="info-description">{{ message }}</div>
                </div>

                <div v-else-if="'danger'" class="d-flex flex-column align-items-center justify-content-center p-4 pb-2">
                    <i class="far fa-times-circle info-icon text-danger"></i>
                    <div class="info-description">{{ message }}</div>
                </div>
            </template>
            <template v-slot:buttons="props">
                <button v-if="btnYes" type="button" class="btn d-flex align-items-center px-3 py-2" :class="'btn-' + type" @click="promise.resolve(true); props.modal.hide()">
                    <i class="far fa-check-circle fs-4 me-2"></i>{{ btnYes }}</button>
                <button v-if="btnNo" type="button" class="btn btn-secondary d-flex align-items-center px-3 py-2" @click="promise.reject(false); props.modal.hide()">
                    {{ btnNo }}</button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../modal';

export default {
    name: "Confirm",
    components: {'modal': Modal},
    data() {
        return {
            type: 'info',
            message: '',
            btnYes: 'Evet',
            btnNo: 'İptal',
            promise: {}
        }
    },
    beforeCreate() {
        this.$root.confirm = this;
    },
    methods: {
        info(message, yes, no) {
            this.type = 'info';
            return this.show(message, yes, no);
        },
        warning(message, yes, no) {
            this.type = 'warning';
            return this.show(message, yes, no);
        },
        danger(message, yes, no) {
            this.type = 'danger';
            return this.show(message, yes, no);
        },
        show(message, yes, no) {
            this.message = message;
            this.btnYes = yes;
            this.btnNo = no;
            this.$refs.modal.instance.show();
            return new Promise((resolve, reject) => {
                this.promise = {
                    resolve: resolve,
                    reject: reject,
                }
            })
        },
        onHide() {
            if (this.promise.hasOwnProperty('reject')) {
                this.promise.reject(false);
            }
        }
    }
}
</script>

<style lang="scss">
#confirmModal {
    .modal-footer {
        justify-content: center;
        margin-bottom: .5rem;
    }
}

.info-icon {
    font-size: 6rem;
    margin-bottom: 1rem;
}

.info-description {
    font-size: 1.1rem;
    text-align: center;
}
</style>
