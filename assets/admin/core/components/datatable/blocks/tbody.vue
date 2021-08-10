<template>
    <tbody>
    <tr v-if="data.length" v-for="(item, index) in data" :key="index">
        <!--Actions Column-->
        <td v-if="options.actions === true" class="actions end">
            <div class="dropdown" v-if="$parent.$slots.actions">
                <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside"><i class="fas fa-ellipsis-v"></i></a>
                <ul class="dropdown-menu">
                    <slot name="actions" :item="item" :index="index" :remove="remove" :key="item.id"></slot>
                </ul>
            </div>
        </td>

        <!--Add Custom Start Column-->
        <slot name="start" :item="item" :checked="checked"></slot>

        <!--Add Checkbox Column-->
        <td class="checked" @click="onRowClick('checked')" v-if="options.checkbox">
            <pd-checkbox :id="'item' + item.id" :value="item.id" v-model="proxyChecked"></pd-checkbox>
        </td>

        <td v-for="column in columns" @click="onRowClick(column.field, item)"
            :class="[
                'cell',
                column.class,
                'cell-' + column.field,
                column.centered ? 'centered' : '',
                options.rowClick ? 'rowclick' : ''
            ]"
            :style="{
                width: column.width,
                background: column.background,
            }"
        >
            <template v-if="column.template">
                <component :is="{ template:column.template, data(){ return { data: item }} }"/>
            </template>
            <template v-else>{{ item[column.field] }}</template>
        </td>

        <!--Add Custom End Column-->
        <slot name="end" :item="item" :checked="checked" :rowClick="onRowClick"></slot>

        <!--Actions Column End-->
        <td v-if="options.actions === false" class="actions end">
            <div class="dropdown" v-if="$parent.$slots.actions">
                <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside"><i class="fas fa-ellipsis-v"></i></a>
                <ul class="dropdown-menu">
                    <slot name="actions" :item="item" :index="index" :remove="remove" :key="item.id"></slot>
                </ul>
            </div>
        </td>
    </tr>
    <tr v-else>
        <td class="empty-table" colspan=100><div><slot name="empty"></slot></div></td>
    </tr>
    </tbody>
</template>

<script>
export default {
    name: 'tBody',
    props: ['columns', 'options', 'data', 'checked'],
    computed: {
        proxyChecked: {
            get() {
                return this.checked;
            },
            set(val) {
                this.$emit("update:checked", val);
            }
        },
        getActiveClickColumn() {
            return this.columns
                .map((column) => {
                    if (!column.hasOwnProperty('row_click') || column.row_click) {
                        return column.field
                    }

                    return false;
                })
                .filter((item) => item !== false)
        }
    },
    methods: {
        onRowClick(field, item) {
            if (this.getActiveClickColumn.indexOf(field) !== -1) {
                this.$emit('clicked', item);
            }
        },
        remove(index) {
            if (index instanceof Object && index.hasOwnProperty('id')) {
                this.data.splice(this.data.findIndex(item => item.id === index.id), 1);
            } else {
                this.data.splice(index, 1);
            }
            this.$parent.pager.total--;
        }
    }
}
</script>

<style lang="scss">
.rowclick {
    cursor: pointer;
}
</style>
