<template>
    <div class="ajaxbar" v-for="bar in progress" :style="{'width': bar[1] + '%'}" :class="bar[3]"></div>
</template>

<script>
export default {
    name: 'Progress',
    data() {
        return {
            progress: {},
        }
    },
    methods: {
        start(id) {
            this.progress[id] = [id, 0, null, ''];
            this.progress[id][2] = setInterval(() => {
                this.progress[id][1] < 90 ? this.progress[id][1]++ : ''
            }, 12)
        },
        remove(id) {
            clearInterval(this.progress[id][2]);
            setTimeout(() => this.progress[id][3] += ' hidden', 250);
            setTimeout(() => delete this.progress[id], 350);
        },
        success(id) {
            this.progress[id][3] = 'success';
            this.remove(id);
        },
        error(id) {
            this.progress[id][3] = 'error';
            this.remove(id);
        }
    },
    beforeCreate() {
        this.$root.progress = this;
    }
}
</script>

<style lang="scss">
.ajaxbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1055;
    background: #009bdc;
    box-shadow: 0 0 5px #1f86b1;
    height: 3px;
    width: 0;
    transition: .15s all;

    &.success, &.error {
        width: 100% !important;
    }

    &.error {
        background: #dc0000;
        box-shadow: 0 0 5px #b11f1f;
    }

    &.hidden {
        opacity: 0;
    }
}
</style>
