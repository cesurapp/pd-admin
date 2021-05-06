<template>
    <div class="toast-wrapper position-fixed top-0 end-0">
        <transition-group name="toast-container" tag="div" class="toast-container">
            <div v-for="(msg, index) in toasts" :key="index" @mouseover="msg.pause = true" @mouseout="msg.pause = false"
                 :class="msg.type" class="toast show d-flex border-0">
                <div class="toast-body">{{ msg.message }}</div>
                <button type="button" @click.prevent="remove(msg.id)" class="btn-close ms-auto"></button>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'Message',
    data: () => {
        return {
            toasts: [],
            timer: null
        }
    },
    watch: {
        toasts: {
            deep: true,
            handler() {
                if (this.timer === null && this.toasts.length > 0) {
                    this.timer = setInterval(() => {
                        this.toasts.forEach((item) => {
                            if (item.pause) {
                                return;
                            }

                            item.duration -= 50;
                            if (item.duration < 1) {
                                this.remove(item.id)
                            }
                        })
                    }, 50);
                }

                if (this.toasts.length === 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
        }
    },
    methods: {
        show(type, message, duration) {
            this.toasts.push({
                id: Math.floor(Math.random() * 1000),
                type: 'bg-' + type,
                message: message,
                paused: false,
                duration: duration
            });
        },
        remove(id) {
            this.toasts.splice(this.toasts.findIndex((i) => i.id === id), 1)
        },
        success(message, duration) {
            this.show('success', message, duration)
        },
        info(message, duration) {
            this.show('info', message, duration)
        },
        error(message, duration) {
            this.show('error', message, duration)
        },
        showBag(flashBag) {
            if (!Array.isArray(flashBag)) {
                for (const type in flashBag) {
                    flashBag[type].forEach((msg) => this.show(type, msg, 5000));
                }
            }
        }
    },
    beforeCreate() {
        this.$root.msg = this;
    },
}
</script>

<style lang="scss">
.toast-wrapper{
    z-index: 7;
}

.toast {
    transition: all .5s ease;
    margin-right: 10px;
    z-index: 6;

    padding: .75rem 1rem;

    .toast-body {
        padding: 0;
    }
}

.toast-container-enter-from {
    opacity: 0;
    transform: translateX(25px);
}

.toast-container-leave-to {
    opacity: 0;
    transform: translateY(-25px);
}

.toast-container > .toast {
    margin-bottom: 0;
    margin-top: .75rem;
}
</style>
