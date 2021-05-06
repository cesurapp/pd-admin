<template>
    <div class="content-menu" :class="{'sticky-header': stickyHeader}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ContentMenu',
    props: {
        stickyHeader: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss">
@import "../../_variables.scss";

.content-menu {
    padding: 0 $grid-gutter-width * 1.5;
    box-shadow: 0 0 2px 0 #43485d;
    background: #d1d4e0;
    z-index: 2;

    .pd-menu {
        display: inline-flex;
        align-items: center;
        list-style-type: none;
        padding: 0;
        margin-bottom: 0;
        max-width: 100%;
        overflow-x: auto;

        li {
            display: inline-flex;
            margin-right: 1rem;
        }

        a {
            padding: .5rem 0;
            opacity: .7;
            transition: $transition-base;
            font-weight: 500;
            position: relative;
            white-space: nowrap;

            &:after {
                content: " ";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 0;
                background: $primary;
                transition: $transition-base;
                border-radius: $border-radius;
            }
        }

        &:not(:hover) .active a,
        a:hover,
        li.active a:hover {
            opacity: 1;
            &:after{
                height: 3px;
            }
        }
    }
}
</style>
