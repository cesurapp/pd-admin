<template>
    <div class="data-table" :class="[
        (autoHeight && maxHeight !== null) ? 'auto-height' : '',
        fullWidth ? 'full-width' : '',
    ]" :style="{
        height: autoHeight && maxHeight ? maxHeight + 'px' : 'auto'
    }">
        <!--Toolbar-->
        <div class="header"  v-if="$slots['header-left'] || $slots['header-right']">
            <div class="d-flex">
                <div class="d-flex align-items-center">
                    <slot name="header-left" :checked="checked"></slot>
                </div>
                <div class="ms-auto d-flex align-items-center">
                    <slot name="header-right" :checked="checked"></slot>
                </div>
            </div>
        </div>

        <!--DataTable-->
        <div class="wrapper">
            <table :class="{
                'striped': striped,
                'hovered': hovered,
                'sticky': stickyHeader,
                'loading': loading
            }">
                <t-head :columns="getColumns"
                        :options="$props"
                        :data="data"
                        v-model:checked="checked"
                        :pager="pager"
                        @sorted="onSort"
                        @filtered="onFilter"
                >
                    <!--<template v-slot:start></template>-->
                    <!--<template v-slot:end></template>-->
                </t-head>
                <t-body :columns="getColumns"
                        :options="$props"
                        :data="data"
                        v-model:checked="checked"
                        @clicked="onRowClick">
                    <!--<template v-slot:start="{item, checked, rowClick}"></template>-->
                    <!--<template v-slot:end="{item, checked, rowClick}"></template>-->

                    <!--Actions Slot-->
                    <template v-slot:actions="props"><slot name="actions" :item="props.item" :index="props.index" :remove="props.remove"></slot></template>

                    <!--Empty Table Content-->
                    <template v-slot:empty>
                        <i class="far fa-smile"></i>
                        <span>Herhangi bir sonuç bulunamadı!</span>
                    </template>
                </t-body>
            </table>
        </div>

        <!--Footer-->
        <div class="footer" v-if="paginated">
            <div class="total">
                <b>Toplam: {{ pager.total }}</b>
            </div>
            <div class="pager">
                <paginator :total="pager.total" :page="pager.page" :limit="pager.limit"
                           @change="onPageChange"></paginator>
            </div>
        </div>
    </div>
</template>

<script>
import {encodeFilter, decodeFilter} from "./filters/prepareFilter";

export default {
    name: 'DataTable',
    components: {
        'tHead': require('./blocks/thead').default,
        'tBody': require('./blocks/tbody').default,
        'paginator': require('../paginator').default
    },
    props: {
        dataApi: {type: [String, Array], default: null},
        dataColumn: {type: String, default: ''},
        dataSortApi: {type: String, default: null},
        dataSortTable: {type: String, default: null},
        paginated: {type: Boolean, default: true},
        sortField: {type: String, default: 'id'},
        sortDirection: {type: String, default: 'desc'},
        striped: {type: Boolean, default: true},
        hovered: {type: Boolean, default: true},
        checkbox: {type: Boolean, default: true},
        stickyHeader: {type: Boolean, default: true},
        autoHeight: {type: Boolean, default: true},
        fullWidth: {type: Boolean, default: true},
        changeHistory: {type: Boolean, default: true},
        rowClick: {type: Function},
        actions: {type: Boolean, default: true},
        filters: {type: Boolean, default: true},
    },
    data() {
        return {
            loading: false,
            maxHeight: null,
            checked: [],
            pager: {
                field: this.sortField,
                direction: this.sortDirection,
                total: 0,
                page: 1,
                limit: 20
            },
            data: [],
            columns: [],
            location: document.location.href
        }
    },
    beforeCreate() {
        window.Table = this;
    },
    created() {
        this.columns = JSON.parse(decodeURIComponent(this.dataColumn));
    },
    computed: {
        getColumns() {
            let params = (new URL(this.location)).searchParams;

            // Paginate Decode
            if (params.has('sort')) {
                this.pager.field = params.get('sort');
            }
            if (params.has('direction')) {
                this.pager.direction = params.get('direction');
            }
            if (this.paginated && params.has('page')) {
                this.pager.page = parseInt(params.get('page'));
            }

            return this.columns.filter((column) => {
                // Filters Decode
                if (column.hasOwnProperty('filters')) {
                    decodeFilter(params, column.filters)
                }

                return column.visible ?? true
            })
        },
        getApiUrl() {
            let api = new URL(this.dataApi);

            // Filters
            this.columns.forEach((column) => {
                if (column.hasOwnProperty('filters')) {
                    encodeFilter(api.searchParams, column.filters);
                }
            })

            // Pagination & Sorting
            api.searchParams.set('sort', this.pager.field);
            api.searchParams.set('direction', this.pager.direction);
            if (this.paginated) {
                api.searchParams.set('page', this.pager.page);
            }

            return api;
        }
    },
    mounted() {
        // Load or Set Data
        if (typeof this.dataApi === 'string') {
            this.loadAsync();
        } else {
            this.data = this.dataApi
        }

        // Set History
        window.onpopstate = this.historyPopstate;
    },
    methods: {
        loadAsync(historyBack) {
            this.loading = true;
            this.$root.http.get(decodeURIComponent(this.getApiUrl.toString()))
                .then((resp) => {
                    // Set Data
                    if (resp.data.hasOwnProperty('data')) {
                        this.data = resp.data.data;
                    }

                    // Set Page
                    if (resp.data.hasOwnProperty('pager')) {
                        this.pager.limit = resp.data.pager.limit;
                        this.pager.page = resp.data.pager.page;
                        this.pager.total = resp.data.pager.total;
                    }

                    // Change URL
                    if (!historyBack) {
                        this.historyUpdate(this.getApiUrl, historyBack === true);
                    }
                })
                .finally(() => {
                    this.loading = false

                    // Calculate Auto Height
                    this.calculateAutoHeight();
                })
        },
        onSort(column) {
            this.pager.direction = this.pager.field === (column.field_sort || column.field) ? (this.pager.direction === 'asc' ? 'desc' : 'asc') : 'asc';
            this.pager.field = column.field_sort || column.field;
            this.loadAsync();
        },
        onPageChange(page) {
            this.pager.page = page;
            this.loadAsync();
        },
        onRowClick(row) {
            if (this.rowClick) {
                this.rowClick(row);
            }
        },
        onFilter() {
            this.loadAsync();
        },
        historyUpdate(apiUrl, back) {
            if (!this.changeHistory) {
                return;
            }

            let newUrl = new URL(window.location.href);
            newUrl.search = '';
            apiUrl.searchParams.forEach((value, key) => {
                newUrl.searchParams.append(key, value);
            })

            history.pushState({back: back}, null, newUrl);
        },
        historyPopstate(event) {
            if (!this.changeHistory || !event.state) {
                return;
            }

            this.location = document.location.href;
            this.$nextTick(() => this.loadAsync(true));
        },
        calculateAutoHeight() {
            if (this.autoHeight) {
                this.$nextTick(() => {
                    this.maxHeight = false;
                    setTimeout(() => {
                        let tableHeight = this.$el.clientHeight;
                        let screenHeight = window.innerHeight;
                        let scrollHeight = document.body.scrollHeight;
                        if (scrollHeight > screenHeight) {
                            this.maxHeight = screenHeight - (scrollHeight - tableHeight);
                        } else {
                            this.maxHeight = null;
                        }
                    }, 150);
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../../_variables.scss";

.data-table {
    position: relative;

    & > .wrapper {
        box-shadow: 1px 1px 3px -1px rgb(0, 0, 0, 0.4);
    }

    // Table
    table {
        width: 100%;
        border-radius: $border-radius;
        border-collapse: separate;
        position: relative;
        border-spacing: 0;

        tr td {
            padding: 0.45rem 0.67em;

            // Centered
            &.centered {
                text-align: center;
            }
        }
    }

    // Header
    table {
        thead tr {
            th {
                background: #f1f0f1;
                padding: 0.45rem 0.67em;
                border-bottom: 1px solid #cdcccc;

                &:first-child {
                    // border-top-left-radius: $border-radius;
                }

                &:last-child {
                    // border-top-right-radius: $border-radius;
                }
            }
        }
    }

    // Checked
    .checked, .actions {
        width: 35px;

        .form-check {
            display: flex;
            align-items: center;
            margin: 0;
            padding-left: 0;

            .form-check-input {
                margin: 0;
                float: none;
            }
        }
    }

    // Striped
    .striped {
        tbody tr {
            &:nth-child(2n) {
                background: #f1f0f1;
            }
        }
    }

    // Hovered
    .hovered {
        tbody tr {
            transition: .15s all;

            &:hover {
                background: #e7e7e7;
            }
        }
    }

    // Auto Height
    &.auto-height {
        display: flex;
        flex-direction: column;

        & > .header {
            position: sticky;
            top: 0;
            z-index: 6;
        }

        & > .wrapper {
            display: flex;
            overflow-y: scroll;
        }
    }

    // Footer & Header
    .header, .footer {
        padding: 0.45rem 0.67em;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    // Full Width
    &.full-width {
        table {
            tr td {
                &:first-child {
                    padding-left: $grid-gutter-width + .5;
                }

                &:last-child {
                    padding-right: $grid-gutter-width + .5;
                }
            }

            thead tr th {
                &:first-child {
                    padding-left: $grid-gutter-width + .5;
                }

                &:last-child {
                    padding-right: $grid-gutter-width + .5;
                }
            }
        }

        .header, .footer {
            padding: .6rem $grid-gutter-width + .5;
        }
    }

    // Loading
    .loading {
        position: relative;

        &:after {
            background: rgba(0, 0, 0, .2);
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }

    // Empty Table
    .empty-table > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100px;
        font-size: $font-size-base;

        i {
            font-size: $font-size-base + 1.5;
            margin-bottom: .5rem;
        }
    }

    .dropdown{
        .dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .2rem;
            transition: $transition-base;
            border-radius: $border-radius-sm;

            i {
                font-size: $font-size-base + .1;
            }

            &::after {
                display: none;
            }

            &:hover, &.show {
                background: $primary;
                color: #FFF;
            }
        }
    }

    // Clear First Actions + Checked First Column Padding
    th.actions + .checked ,
    td.actions + .checked {
        padding-left: 0;
    }
}
</style>
