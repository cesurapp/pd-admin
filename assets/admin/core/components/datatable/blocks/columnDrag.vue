<template>
    <!--Sortable Column-->
    <th class="actions">
        <div class="dropdown">
            <a ref="sortableColumn" class="dropdown-toggle" href="#" data-bs-toggle="dropdown"
               data-bs-auto-close="outside"><i class="fas fa-columns"></i></a>
            <div class="dropdown-menu py-2 px-0">
                <draggable v-model="$parent.$parent.columns" item-key="field" class="list-group" :forceFallback="true" handle=".handle" @end="saveTable">
                    <template #item="{ element }">
                        <label class="list-group-item list-group-item-action px-3 py-1 rounded-0 fw-normal border-0">
                            <i class="fas fa-bars handle me-2"></i>
                            <input class="form-check-input me-2" type="checkbox" v-model="element.visible" @change="saveTable">
                            {{ element.label }}
                        </label>
                    </template>
                </draggable>
            </div>
        </div>
    </th>
</template>

<script>
import Storage from "../storage";

export default {
    name: "DataTableColumnDraggable",
    props: ['options'],
    computed: {
        getHiddenColumn() {
            return this.$parent.$parent.columns
                .filter((item) => item.visible === false)
                .map((item) => item.field);
        },
        getOrderColumn() {
            return this.$parent.$parent.columns.map((item) => {
                return item.field;
            });
        }
    },
    created() {
        Object.keys(this.$parent.$parent.columns).forEach((key) => {
            if (!this.$parent.$parent.columns[key].hasOwnProperty('visible')) {
                this.$parent.$parent.columns[key].visible = true;
            }
        })
    },
    mounted() {
        this.loadUserData(true);
    },
    methods: {
        /**
         * Load Table Hidden Column & Column Order
         */
        loadUserData(localStore) {
            let api = `${this.options.dataSortApi}?table=${this.options.dataSortTable}`;
            let process = (data, save) => {
                // Hide
                this.$parent.$parent.columns.forEach((column) => {
                    if (data.hidden && data.hidden.indexOf(column.field) !== -1) {
                        column.visible = false;
                    }
                });

                // Order
                this.mapOrder(this.$parent.$parent.columns, data.orders ?? [], 'field')
                if (localStore && save) {
                    Storage.setStorage(api, data, 3600);
                }
            };

            // Using Local Storage
            if (localStore) {
                let localData = Storage.getStorage(api);
                if (localData !== null) {
                    return process(localData, false)
                }
            }

            this.$root.http.get(api).then((resp) => {
                process(resp.data, true)
            })
        },

        /**
         * Save Table Columns Status to Backend
         */
        saveTable() {
            let api = `${this.options.dataSortApi}?table=${this.options.dataSortTable}`;
            this.$root.http
                .post(api, {
                    'hidden': this.getHiddenColumn,
                    'orders': this.getOrderColumn,
                })
                .then(() => {
                    Storage.removeStorage(api);
                })
        },

        /**
         * Order Array for Other Array
         */
        mapOrder(array, order, key) {
            if (order.length) {
                array.sort(function (a, b) {
                    let A = a[key],
                        B = b[key];
                    if (order.indexOf(A) > order.indexOf(B) || order.indexOf(A) === -1 || order.indexOf(B) === -1) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            return array;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../_variables.scss";

.list-group-item {
    margin-top: -1px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .handle {
        cursor: move;
        margin-top: 2px;
    }

    .form-check-input{
        margin-top: 0;
    }
}

.dropdown-toggle {
    i {
        font-size: $font-size-lg !important;
    }
}
</style>
