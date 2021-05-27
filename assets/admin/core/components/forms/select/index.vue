<template>
    <div class="pd-select">
        <Multiselect
            :mode="multiple ? 'multiple' : 'single'"
            :noResultsText="noResult"
            :searchable="true"
            :maxHeight=320
            :placeholder="placeholder"
            :required="required"
            v-model="modelProxied"
            :options="options"
        />
        <select class="d-none" v-if="current" :multiple="multiple" v-bind="$attrs" v-model="modelValue">
            <option v-for="v in getModelArray" :value="v" selected></option>
        </select>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
    name: 'PdSelect',
    inheritAttrs: false,
    components: {Multiselect},
    props: {
        'multiple': {type: Boolean, default: false},
        'noResult': {type: String, default: 'Sonuç yok.'},
        'placeholder': {type: String, default: ''},
        'required': {type: Boolean, default: false},
        'modelValue': {
            type: [Array, Object, String],
            default: null
        },
        'opts': [Array, Object, String],
        'current': [Array, Object, String]
    },
    data() {
        return {
            options: null,
            selected: []
        }
    },
    mounted() {
        if (this.opts) {
            let parsed = [];

            if (Array.isArray(this.opts)) {
                if (this.opts.length > 0 && this.opts[0].hasOwnProperty('value')) {
                    parsed = this.opts;
                } else {
                    parsed = Object.assign({}, this.opts);
                }
            } else if (this.opts instanceof Object) {
                Object.keys(this.opts).forEach((key) => {
                    parsed.push({
                        value: this.opts[key].value,
                        label: this.opts[key].label
                    })

                    if (this.opts[key].hasOwnProperty('attr') && this.opts[key].attr.hasOwnProperty('selected')) {
                        this.selected.push(this.opts[key].value);
                    }
                })
            }

            this.options = parsed;
        }

        if (this.multiple) {
            this.$emit("update:modelValue", this.selected);
        } else {
            this.$emit("update:modelValue", this.modelValue || (this.current ? JSON.parse(this.current) : null));
        }
    },
    computed: {
        modelProxied: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit("update:modelValue", val);
            }
        },
        getModelArray() {
            return Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue];
        }
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@import "../../../../_variables.scss";

.multiselect-input {
    min-height: inherit;
    border: none;
}

.is-multiple .multiselect-search input,
.is-single .multiselect-search input {
    padding: $input-padding-y $input-padding-x;
    font-size: $input-font-size;
    border: $input-border-width solid $input-border-color;
    border-radius: $input-border-radius;
    transition: $input-transition;

    &:focus {
        border-color: $input-focus-border-color;
        box-shadow: $input-focus-box-shadow;
        border-radius: $input-border-radius $input-border-radius 0 0;
    }
}

.multiselect-multiple-label, .multiselect-placeholder, .multiselect-single-label {
    padding-left: $input-btn-padding-x;
    font-size: $input-font-size;
}

.multiselect-clear {
    position: absolute;
    height: auto;
    right: 1px;
    top: 1px;
    bottom: 1px;
    border-radius: $input-border-radius;
}

.multiselect-options {
    border: $input-border-width solid $input-border-color;
    border-radius: 0 0 $input-border-radius $input-border-radius;
    margin-top: 0;
}

.multiselect-option {
    padding: $input-padding-y $input-padding-x;
    min-height: inherit;
    font-size: $input-font-size;
    cursor: pointer;

    &.is-selected {
        background: $primary;

        &.is-pointed {
            background: $primary;
        }
    }
}

.is-multiple .multiselect-option.is-selected,
.is-tags .multiselect-option.is-selected {
    background: $primary !important;

    &.is-pointed {
        background: $primary !important;
    }
}

.multiselect-no-options, .multiselect-no-results {
    padding: $input-padding-y $input-padding-x;
    font-size: $input-font-size;
}

.is-multiple .multiselect-option.is-selected, .is-tags .multiselect-option.is-selected {
    background: $success;
    color: #FFF;
}

.is-multiple .multiselect-option.is-selected.is-pointed, .is-tags .multiselect-option.is-selected.is-pointed {
    background: darken($success, 5%);
}
</style>
