<template>
    <div class="form-check">
        <input ref="radio" class="form-check-input" type="radio" :id="$attrs.id" :name="$attrs.name"
               :value="$attrs.value" @input="input">
        <label class="form-check-label" :for="$attrs.id">{{ $attrs.label }}</label>
    </div>
</template>

<script>
export default {
    name: 'PdRadio',
    methods: {
        input(e) {
            this.$emit('update:modelValue', e.target.value)
        },
    },
    mounted() {
        if (this.$attrs.current === this.$attrs.value) {
            this.$refs.radio.setAttribute('checked', true);
            this.$emit('update:modelValue', this.$attrs.current)
        }
    }
}
</script>
