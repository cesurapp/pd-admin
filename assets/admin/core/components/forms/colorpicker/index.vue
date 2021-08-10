<template>
    <div class="pd-picker d-flex">
        <input :id="$attrs.id" :name="$attrs.name" v-model="color" @blur="blured" type="text" class="form-control me-2">
        <input type="color" v-model="picker" class="form-control form-control-color">
    </div>
</template>

<script>
export default {
    name: "PdColorPicker",
    inheritAttrs: false,
    data() {
        return {
            picker: '#ffffff',
            color: null
        }
    },
    mounted() {
        let color = this.$attrs.value || this.$attrs.default || null;
        if (color) {
            this.picker = color;
        }
    },
    methods: {
        blured() {
            if (this.color) {
                this.picker = this.color;
            }
        }
    },
    watch: {
        picker(val) {
            this.color = val;
        }
    }
}
</script>
