<template>
</template>
<script>
export default {
    mounted() {
        /**
         * Widget Sortable
         */
        /*let Sortable = require('sortablejs');
        $(document).ready(function () {
            let el = document.querySelector('.dashboard');
            if (el) {
                new Sortable(el, {
                    draggable: ".widget",
                    handle: ".mover",
                    animation: 200,
                    forceFallback: true,

                    onEnd: function (evt) {
                        $.each(evt.to.children, function (index, element) {
                            // Get Order URL
                            let orderUrl = $(element).data('order');
                            orderUrl = orderUrl.replace('0', index);

                            // Send Ajax Data
                            $.ajax({
                                url: orderUrl,
                                dataType: 'json',
                                complete: function (response) {
                                }
                            });
                        })
                    }
                });
            }
        });*/
    }
}
</script>
