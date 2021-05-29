<template>
    <div class="dashboard">
        <div ref="container" class="wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Dragula from 'dragula';

export default {
    mounted() {
        Dragula([this.$refs.container], {
            moves: function (el, container, handle) {
                return handle.tagName === 'I' ? handle.parentNode && handle.parentNode.classList.contains('mover') :
                    handle.classList.contains('mover')
            }
        }).on('drop', function (el) {
            let index = 0;
            for (let widget of evt.to.children) {
                this.$root.http.get(widget.getAttribute('data-order').replace(0, index));
                index++;
            }
        })
    }
}
</script>

<style lang="scss">
@import "~dragula/dist/dragula.min.css";
@import "../../_variables.scss";

.dashboard {
    padding: $grid-gutter-width $grid-gutter-width * 1.5;
    position: relative;

    .wrap {
        margin-left: -1rem;
        display: flex;
        flex-flow: row wrap;
    }

    .widget {
        background: #f1f1f1;
        border-radius: $border-radius-sm;
        margin-left: 1rem;
        margin-bottom: 1rem;
        position: relative;
        min-height: 30px;
        box-shadow: 1px 1px 3px -1px rgb(0 0 0 / 50%);

        &.clean {
            background: transparent;
            box-shadow: none;
        }

        .actions {
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            transition: .2s all;
            transition-delay: .6s;
        }

        &:hover {
            .actions {
                opacity: 1;
            }
        }

        &.half {
            width: calc(50% - 1rem);
            @include media-breakpoint-down(md) {
                width: calc(100% - 1rem);
            }
        }

        &.full {
            width: calc(100% - 1rem);
        }
    }

    .mover {
        cursor: move;
    }

    .nav-link {
        padding: .5rem .5rem;
        line-height: .25rem;
        opacity: .4;
        transition: .2s all;

        &:hover {
            background: $primary;
            color: #FFF;
            opacity: 1;
        }

        &.close:hover {
            background: $danger;
            color: #FFF;
        }
    }
}
</style>
