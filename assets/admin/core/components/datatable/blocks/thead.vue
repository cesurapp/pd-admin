<template>
    <thead>
    <tr :class="[
            options.stickyHeader ? 'sticky' : ''
        ]">
        <!--Column Draggable-->
        <column-drag :options="options" v-if="options.actions === true"></column-drag>

        <!--Add Custom Start Column-->
        <slot name="start"></slot>

        <!--Add Checkbox Column-->
        <th class="checked" v-if="options.checkbox">
            <checkbox id="checkAll" @click="checkAll"></checkbox>
        </th>

        <th v-for="column in columns"
            :class="[
                    'col-head',
                    column.class,
                    'col-' + column.field,
                    column.sortable ? 'sortable' : '',
                    column.centered ? 'centered' : ''
                ]"
            :style="{
                    width: column.width,
                    background: column.background
                }"
        >
            <div class="wrapper">
                <!--Sortable Title-->
                <span class="title" :class="{'ordered' : pager.field === (column.field_sort || column.field)}"
                      @click="sortColumn(column)">{{ column.label }}
                    <template v-if="column.sortable">
                        <i v-if="pager.field === (column.field_sort || column.field)" class="fas" :class="{
                            'fa-arrow-up': pager.direction === 'asc',
                            'fa-arrow-down': pager.direction === 'desc',
                        }"></i>
                    </template>
                </span>

                <!--Column Filters-->
                <filters v-if="options.filters && column.filters" :column="column" :options="options" :key="column.field"></filters>
            </div>
        </th>

        <!--Add Custom End Column-->
        <slot name="end"></slot>

        <!--Column Draggable End-->
        <column-drag :options="options" class="end" v-if="options.actions === false"></column-drag>
    </tr>
    </thead>
</template>

<script>
export default {
    name: 'tHead',
    props: ['columns', 'options', 'pager', 'checked', 'data'],
    components: {
        'filters': require('../filters').default,
        'checkbox': require('../../forms/checkbox').default,
        'column-drag': require('../blocks/columnDrag').default
    },
    methods: {
        checkAll(event) {
            this.$emit('update:checked', event.target.checked ? this.data.map((item) => item.id) : []);
        },
        sortColumn(column) {
            if (column.sortable) {
                this.$emit('sorted', column);
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../../../_variables.scss";

.data-table {
    th{
        & > .wrapper {
            display: flex;
            align-items: center;
        }

        // Sortable
        &.sortable .title {
            cursor: pointer;
            display: flex;
            align-items: center;
            position: relative;

            i{
                margin-left: .1rem;
            }

            &:after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                height: 100%;
                border-bottom: 1px dashed rgba(0,0,0,0.15);
            }
        }

        // Centered
        &.centered .wrapper {
            justify-content: center;
        }

        .column-filters {
            .buttons {
                i {
                    font-size: .9rem;
                    line-height: .8;
                }
            }
        }

        .title i, .dropdown-toggle i {
            font-size: $font-size-base + .1;
        }

        .dropdown-menu {
            min-width: 14rem;
            margin-top: .45rem !important;
        }
    }

    tr {
        // Sticky
        &.sticky th {
            position: sticky;
            top: 0;
            z-index: 5;
            white-space: nowrap;
        }
    }
}
</style>
