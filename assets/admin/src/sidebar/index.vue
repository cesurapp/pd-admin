<template>
    <div class="app-nav" :class="{'active': active, 'bigmenu': bigMenu}">
        <button class="toggle" @click="toggleActive"><i class="fas fa-angle-right"></i></button>
        <div class="wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        bigMenu: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: true,
            dropdowns: [],
            activeItem: null,
            activeDropdown: null,
            mobileWidth: 768
        }
    },
    methods: {
        toggleActive() {
            if (window.outerWidth > this.mobileWidth) {
                this.active = !this.active;
                localStorage.setItem('menu-active', this.active);
            }
        },
        closeAllDropdown() {
            this.dropdowns.forEach((dropdown) => {
                dropdown.classList.remove('active');
            })
        },
        removeActive() {
            if (this.activeDropdown) {
                if (this.activeDropdown.classList.contains('dropdown')) {
                    this.activeDropdown.children[1].style.maxHeight = null;

                    let active = this.activeDropdown.children[1].querySelector('.active');
                    if (active) {
                        active.classList.remove('active');
                    }
                }

                this.activeDropdown.classList.remove('active');
            }
        },
        setActiveDropdown(dropdown) {
            this.activeDropdown = dropdown;
            dropdown.children[1].style.maxHeight = 'calc(' + dropdown.children[1].scrollHeight + 'px + 1rem)';
            dropdown.classList.toggle('active');
        },
        setActiveToContentNav() {
            let contentNav = document.querySelector('[sidebar]');
            if (contentNav) {
                contentNav = contentNav.getAttribute('sidebar');
                this.activeItem = document.querySelector(`#main_menu [data-id='${contentNav}']`);
                let parentSibling = this.activeItem
                while (!parentSibling.classList.contains('pd-menu')) {
                    if (parentSibling.tagName === 'LI') {
                        parentSibling.classList.add('active');
                    }

                    parentSibling = parentSibling.parentNode;
                }
            }
        },
        setSize(width) {
            if (width <= this.mobileWidth) {
                this.active = false;
            }
        },
    },

    mounted() {
        // Set Menu Activate
        this.active = 'true' === localStorage.getItem('menu-active');
        this.setSize(window.outerWidth);
        window.addEventListener('resize', (event) => this.setSize(event.target.outerWidth))

        // Set Active Item
        this.setActiveToContentNav();
        this.activeDropdown = this.$el.querySelector('.active');

        // Find Dropdowns
        this.dropdowns = this.$el.querySelectorAll('.dropdown');

        // Add Click Event
        this.dropdowns.forEach((dropdown) => {
            dropdown.children[0].addEventListener('click', (event) => {
                event.preventDefault();

                let currentActive = this.activeDropdown ? this.activeDropdown.classList.contains('active') : null;
                this.removeActive();

                if (this.activeDropdown !== dropdown) {
                    this.setActiveDropdown(dropdown);
                } else if (!currentActive) {
                    this.setActiveDropdown(dropdown);
                }
            })
        })
    }
}
</script>
<style lang="scss">
@import "../../_variables.scss";
$grid-gutter-width: 1.2rem;

.app-nav {
    background: linear-gradient(45deg,#343434,#3f3f3f);
    max-height: 100vh;
    min-height: 100vh;
    position: sticky;
    top: 0;
    transition: $transition-base;
    transition-delay: .25s;
    z-index: 3;
    box-shadow: 0.07rem 0 0.07rem rgb(0 0 0 / 15%);

    .toggle {
        background: #3a3a3a;
        position: absolute;
        border: none;
        z-index: 2;
        color: #FFF;
        outline: none;
        padding: 0;
        width: 15px;
        height: 100px;
        border-radius: 0 $border-radius $border-radius 0;
        transform: translate(50%, -50%);
        top: 50%;
        left: calc(100% - 8px);
        opacity: 0;
        transition: $transition-base;

        i {
            transition: $transition-base;
            margin-left: -2px;
        }
    }

    &:hover {
        .toggle {
            opacity: 1;
        }
    }

    &.active {
        .toggle i {
            transform: rotate(180deg);
        }
    }

    &:not(.active) {
        position: fixed;
        width: 8px !important;
        z-index: 5;
        height: 100%;

        .wrapper {
            opacity: 0;
            transition-delay: .25s;
        }

        .toggle {
            opacity: .25;
            transform: translate(50%, -50%);
        }

        &:hover {
            width: 275px !important;

            .wrapper {
                opacity: 1;
                transition-delay: .5s;
            }

            .toggle {
                opacity: 1;
            }

            @include media-breakpoint-up(md) {
                transition-delay: .5s;
                .wrapper {
                    transition-delay: .5s;
                }
            }
        }
    }

    .wrapper {
        color: #eaedf2;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 0 $grid-gutter-width;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        transition: $transition-base;
    }

    ul, li {
        list-style-type: none;
        margin-left: 0;
        padding-left: 0;
        margin-bottom: 0;
    }

    .logo {
        background: #3d3d3d;
        position: sticky;
        top: 0;
        padding-top: $grid-gutter-width / 1.3;
        padding-bottom: $grid-gutter-width / 1.3;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        a {
            display: block;
            border-radius: $border-radius;
            text-align: center;
            margin-bottom: 0;

            img {
                max-height: 35px;
            }
        }
    }

    .pd-menu a {
        display: flex;
        align-items: center;
        color: #afb2b6;
        padding: $grid-gutter-width / 1.3 $grid-gutter-width;
        transition: $transition-base;
        font-weight: 600;
        position: relative;
        font-size: $font-size-base + .1;
        line-height: $font-size-base + .1;

        i {
            margin-right: $grid-gutter-width;
            font-size: $font-size-base + .7rem;
            width: 24px;
        }
    }

    .pd-menu {
        margin-bottom: 1rem;
    }

    // Dropdown
    .dropdown {
        & > a {
            position: relative;

            &:after {
                content: " ";
                position: absolute;
                border: solid #afb2b6;
                border-width: 0 2px 2px 0;
                display: inline-block;
                padding: 3px;
                transform: rotate(135deg);
                right: $grid-gutter-width;
                transition: .25s all;
            }
        }

        &.active {
            & > ul {
                max-height: inherit;
            }
            & > a:after {
                border-color: #FFF;
                transform: rotate(45deg);
                margin-top: -3px;
                margin-right: 2px;
            }
        }
    }

    // First Level
    .pd-menu {
        &:not(:hover) > li.active > a,
        &:not(:hover) > ul > li.active > a,
        & > li.open > a,
        & > .dropdown:hover > a,
        & > li > a {
            &:hover{
                background: $primary;
                color: #FFF;
                &:after {
                    border-color: #FFF;
                }
            }
        }

        & > li.active {
            & > a {
                background: $primary;
                color: #FFF;
            }
        }

        & > li {
            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .menu_level_1, .menu_level_2, .menu_level_3 {
        padding: 0 0 0 calc(25px + 1.2rem);
        transition: all .25s ease-out;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        background: rgba(0,0,0,0.1);

        & > li > a {
            padding: $grid-gutter-width / 1.3 $grid-gutter-width;
            font-weight: 400;
            font-size: $font-size-base;
            line-height: $font-size-base;
            color: #afb2b6;
        }
        & > li.active > a {
            position: relative;
            color: #FFF;
            &:after{
                content: "";
                position: absolute;
                left: -14px;
                background: $primary;
                margin-top: 1px;
                width: 8px;
                height: 8px;
                border-radius: $border-radius-sm;
            }
        }
        & > li.open > a,
        & > li > a:hover {
            background: transparent;
            color: #FFF;
            opacity: 1;
        }
    }

    // Active
    li.active {
        .menu_level_1 {
            opacity: 1;
        }
    }

    li.active, li.open {
        .menu_level_1 {
            padding-top: .5rem;
            padding-bottom: .5rem;
        }
    }

    .header {
        text-transform: uppercase;
        font-size: .7rem;
        color: rgba(255, 255, 255, .5);
        padding: $grid-gutter-width / 5 $grid-gutter-width / 1.5;
        margin-top: .25rem;
        font-weight: 500;
    }

    // Big Menu
    &.bigmenu {
        width: 170px !important;
        .pd-menu a {
            flex-direction: column;
            padding: $grid-gutter-width;

            i {
                margin-right: 0;
                margin-bottom: $grid-gutter-width * 0.85;
                font-size: $font-size-base + 1.5rem;
                width: auto;
            }
        }

        .dropdown a:after{
            display: none;
        }

        li .menu_level_1{
            padding-left: 0;
            a{
                align-items: start;
                padding: $grid-gutter-width / 1.3 $grid-gutter-width;
            }
        }
    }
}
</style>
