<template>
    <input :type="type" v-model="proxyValue" :id="id" :placeholder="placeholder || ''" class="form-control">
</template>

<script>
export default {
    name: 'PdInput',
    props: {
        id: String,
        type: String,
        placeholder: String,
        modelValue: [String, Number],
    },
    computed: {
        proxyValue: {
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
