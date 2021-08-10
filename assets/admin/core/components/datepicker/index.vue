<template>
    <div v-if="!multiple" class="pd-datepicker">
        <datepicker v-model="pickedProxy" :input-format="format" :locale="locale" :id="id" :name="$attrs.name"
                    :placeholder="placeholder || 'Tarih Seçin..'" class="form-control"/>
    </div>
    <div v-else class="pd-datepicker multiple">
        <datepicker v-model="pickedProxy.start" :input-format="format" :locale="locale"
                    :id="id + 'start'" :placeholder="placeholder[0] || 'Başlangıç tarihi seçin..'"
                    class="form-control"/>
        <datepicker v-model="pickedProxy.end" :input-format="format" :locale="locale"
                    :id="id + 'end'" :placeholder="placeholder[0] || 'Bitiş tarihi seçin..'"
                    class="form-control"/>
    </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';
import {tr, enUS as en} from 'date-fns/locale';

const locales = {tr, en};

export default {
    name: "DatePicker",
    components: {'Datepicker': Datepicker},
    props: {
        id: String,
        format: {
            type: String,
            //default: 'dd.MM.yyyy'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        placeholder: [String, Array],
        modelValue: [Date, Object],
        value: [Date, Object]
    },
    data() {
        return {
            locale: locales[document.documentElement.lang]
        }
    },
    computed: {
        pickedProxy: {
            get() {
                return this.modelValue || this.value;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        },
    },
}
</script>

<style lang="scss">
@import "../../../_variables.scss";

:root {
    --vdp-border-radius: 4px;
    --vdp-disabled-color: #b9c0ce;
    --vdp-hover-color: #ffffff;
    --vdp-hover-bg-color: #5d52fd;
    --vdp-selected-color: #FFF;
    --vdp-selected-bg-color: #5d52fd;
    --vdp-elem-font-size: .9em;
    --vdp-elem-border-radius: 3px;
    --vdp-divider-color: "#d5d9e0";
}

.v3dp__popout {
    padding: .25rem !important;
}

.v3dp__subheading {
    font-weight: 500;
}

.v3dp__elements {
    grid-auto-rows: 35px;

    button {
        padding: .15rem !important;

        span {
            display: flex !important;
            align-items: center;
            justify-content: center;
            height: 100% !important;
        }
    }
}

.pd-datepicker.multiple {
    display: flex;

    & > div {
        &:first-child {
            input {
                border-radius: $input-border-radius 0 0 $input-border-radius;
            }
        }

        &:last-child {
            input {
                border-left: none;
                border-radius: 0 $input-border-radius $input-border-radius 0;
            }
        }
    }
}
</style>
