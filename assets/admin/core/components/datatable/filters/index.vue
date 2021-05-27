<template>
    <div class="dropdown column-filters">
        <!--Button-->
        <a ref="dropdown" class="dropdown-toggle"
           href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside" data-bs-boundary="window">
            <i class="fas fa-filter" :class="{'text-danger': isFilteredColumn}"></i>
        </a>

        <!--Content-->
        <div class="dropdown-menu p-2" v-for="column in getColumnArray">
            <template v-for="filter in column.filters">
                <!-- Type -> Text -->
                <div class="filter" v-if="filter.type === 'text'" ><pd-input @keyup.enter="submit" v-model="filter.value" type="text" :id="filter.field" :placeholder="filter.placeholder"></pd-input></div>
                <!-- Type -> Number -->
                <div class="filter" v-if="filter.type === 'number'" ><pd-input @keyup.enter="submit" v-model="filter.value" type="number" :id="filter.field" :placeholder="filter.placeholder"></pd-input></div>
                <!-- Type -> Mail -->
                <div class="filter" v-if="filter.type === 'email'" ><pd-input @keyup.enter="submit" v-model="filter.value" type="email" :id="filter.field" :placeholder="filter.placeholder"></pd-input></div>
                <!-- Type -> Tel -->
                <div class="filter" v-if="filter.type === 'tel'" ><pd-input @keyup.enter="submit" v-model="filter.value" type="tel" :id="filter.field" :placeholder="filter.placeholder"></pd-input></div>
                <!-- Type -> Range -->
                <div class="filter" v-if="filter.type === 'range'" ><pd-range v-model="filter.value" :id="filter.field" :min="filter.min" :max="filter.max" :step="filter.step"></pd-range></div>
                <!-- Type -> Checkbox -->
                <div class="filter" v-if="filter.type === 'checkbox'" ><pd-checkbox :id="filter.field" v-model="filter.value" :label="filter.label"></pd-checkbox></div>
                <!-- Type -> Switch -->
                <div class="filter" v-if="filter.type === 'switch'" ><pd-switch :id="filter.field" v-model="filter.value" :label="filter.label"></pd-switch></div>
                <!-- Type -> Date  -->
                <div class="filter" v-if="filter.type === 'date'" ><datepicker :id="filter.field" v-model="filter.value" :placeholder="filter.placeholder"></datepicker></div>
                <!-- Type -> DateRange  -->
                <div class="filter" v-if="filter.type === 'date_range'" ><datepicker :multiple="true" :id="filter.field" v-model="filter.value" :placeholder="filter.placeholder"></datepicker></div>
                <!-- Type -> Select  -->
                <div class="filter" v-if="filter.type === 'select' || filter.type === 'select_multiple'"><pd-select :multiple="filter.multiple || false" :id="filter.field" v-model="filter.value" :opts="filter.options" :placeholder="filter.placeholder"></pd-select></div>
            </template>

            <div class="buttons mt-2 d-flex align-items-center">
                <button class="btn btn-sm btn-warning d-flex align-items-center full-width me-2 justify-content-center" @click="clear(column)"><i class="fas fa-trash me-1"></i>Temizle</button>
                <button class="btn btn-sm btn-primary d-flex align-items-center full-width justify-content-center" @click="submit"><i class="fas fa-search me-1"></i><span>Ara</span></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColumnFilters',
    props: ['column', 'options'],
    computed:{
        getColumnArray() {
            return [this.column];
        },
        isFilteredColumn() {
            return this.column.filters.filter((filter) => {
                if (filter.value && typeof filter.value === 'object') {
                    let status = false;
                    Object.keys(filter.value).forEach((key) => {
                        if (filter.value[key] && (filter.value[key] !== filter.default[key])) {
                            status = true;
                            return;
                        }
                    })

                    return status;
                }
                return filter.value && filter.value !== filter.default
            }).length > 0
        },
    },
    methods: {
        submit() {
            this.$parent.$emit('filtered', true);
            this.bootstrap.Dropdown.getInstance(this.$refs.dropdown).hide();
        },
        clear(column) {
            column.filters.forEach((filter) => {
                filter.value = filter.default ?? null;
            })
        }
    }
}
</script>

<style lang="scss">
.column-filters{
    label{
        text-transform: capitalize;
    }

    .dropdown-menu{
        .filter {
            margin-bottom: .5rem;
        }
    }
}

</style>
