<template>
    <button @click="$refs.modal.instance.show()" class="btn btn-sm btn-success">
        <i class="fas fa-file-export"></i> Dışarı Aktar
    </button>

    <teleport to="body">
        <modal ref="modal" :slim="true" size="sm">
            <template v-slot:title><i class="fas fa-file-export"></i>Dışa Aktar</template>
            <template v-slot:content="props">
                <div class="px-2">
                    <SlickList :useDragHandle="true" axis="y" v-model:list="ordered">
                        <SlickItem class="drag-item exporter" v-for="(column, i) in ordered" :key="column.field"
                                   :index="i">
                            <label
                                class="list-group-item list-group-item-action px-3 py-1 rounded-0 fw-normal border-0">
                                <i class="fas fa-bars handle me-2" v-handle-directive></i>
                                <input class="form-check-input me-2" type="checkbox" v-model="column.visible">
                                {{ column.label }}
                            </label>
                        </SlickItem>
                    </SlickList>
                </div>
            </template>
            <template v-slot:buttons="{modal}">
                <div class="d-flex full-width">
                    <button class="btn btn-success full-width me-2" @click="exportStart('csv'); modal.hide()"><i
                        class="fas fa-file-csv fs-3 me-2"></i>CSV
                    </button>
                    <button class="btn btn-primary full-width" @click="exportStart('excel'); modal.hide()"><i
                        class="far fa-file-excel fs-3 me-2"></i>Excel
                    </button>
                </div>
            </template>
        </modal>
    </teleport>
</template>

<script>
import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort';

export default {
    name: "DataTableExporter",
    props: ['columns'],
    components: {SlickList, SlickItem},
    directives: {HandleDirective},
    data() {
        return {
            ordered: []
        }
    },
    mounted() {
        setTimeout(() => {
            this.$parent.columns.forEach((column) => {
                this.ordered.push({
                    field: column.field,
                    label: column.label || '',
                    visible: column.visible ?? true
                })
            })
        }, 1500);
    },
    computed: {
        getExportedColumns() {
            return this.ordered
                .filter((column) => column.visible)
                .map((column) => column.field)
        }
    },
    methods: {
        exportStart(format) {
            let api = this.$parent.getApiUrl;
            api.searchParams.set('export', format);

            // Create Post Form;
            let form = document.createElement("form");
            form.target = "exporter";
            form.method = "POST";
            form.action = api.toString();

            // Append Columns Data
            let columns = document.createElement("input");
            columns.type = "hidden";
            columns.name = "columns";
            columns.value = this.getExportedColumns;
            form.appendChild(columns);
            document.body.appendChild(form);

            // Create Download IFrame
            let iFrame = document.createElement('iframe');
            iFrame.id = 'exporter';

            // Submit
            form.submit();
            document.body.removeChild(form);
            this.$root.msg.success('Dışa aktarım başlatıldı.');
        }
    }
}
</script>

<style lang="scss">
.exporter.drag-item {
    z-index: 1500 !important;

    .handle {
        cursor: move;
        margin-top: 2px;
    }
}
</style>
