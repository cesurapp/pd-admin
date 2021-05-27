<template>
    <div class="form-range d-flex align-items-center">
        <input class="form-range" type="range" v-model="proxyChecked" :id="id" :min="min" :max="max" :step="step">
        <span class="range-counter ms-2">{{ proxyChecked }}</span>
    </div>
</template>

<script>
export default {
    name: 'PdRange',
    props: {
        id: String,
        min: Number,
        max: Number,
        step: Number,
        modelValue: [String, Number],
    },
    computed: {
        proxyChecked: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit("update:modelValue", val);
            }
        }
    }
}
</script>
