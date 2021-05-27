<template>
    <nav class="pd-pagination">
        <ul class="pagination mb-0">
            <li class="page-item" :class="{'disabled': !isPrev}"><a class="page-link" href="#" @click="prev"><i
                class="fas fa-arrow-left"></i></a></li>

            <li class="page-item" v-for="n in getBeforeCount">
                <a v-if="n > 0" class="page-link" href="#" @click="prev(n)">{{ n }}</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">{{ current }}</a></li>
            <li class="page-item" v-for="n in getAfterCount">
                <a v-if="n <= getTotalPage" class="page-link" href="#" @click="next(n - 1)">{{ n }}</a>
            </li>

            <li class="page-item" :class="{'disabled': !isNext}"><a class="page-link" href="#" @click="next"><i
                class="fas fa-arrow-right"></i></a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        total: {type: Number, default: 100},
        page: {type: Number, default: 1},
        limit: {type: Number, default: 20},
        before: {type: Number, default: 2},
        after: {type: Number, default: 2},
    },
    data() {
        return {
            current: this.page
        }
    },
    computed: {
        isNext() {
            return this.current < this.getTotalPage
        },
        isPrev() {
            return this.current > 1
        },
        getTotalPage() {
            return Math.ceil(this.total / this.limit);
        },
        getBeforeCount() {
            return Array(this.before).fill(this.current - this.before).map((x, y) => x + y)
        },
        getAfterCount() {
            return Array(this.after).fill(this.current + 1).map((x, y) => x + y)
        }
    },
    watch: {
        current(val) {
            this.$emit('change', val);
        }
    },
    methods: {
        prev(n) {
            if (typeof n === 'number') {
                return this.current = n;
            }
            this.current--;
        },
        next(n) {
            if (typeof n === 'number') {
                this.current = n;
            }
            this.current++;
        }
    }
}
</script>

<style lang="scss">
@import "../../../_variables.scss";

.page-link {
    min-width: 37px;
    text-align: center;
}
</style>
