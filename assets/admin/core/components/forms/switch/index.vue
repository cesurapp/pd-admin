<template>
    <div class="form-check form-switch">
        <input class="form-check-input" :id="id" type="checkbox" :value="value" v-model="proxyChecked">
        <label class="form-check-label" :for="id">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'PdSwitch',
    props: {
        id: String,
        label: String,
        value: {type: [String, Number]},
        modelValue: {
            default: null
        },
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
