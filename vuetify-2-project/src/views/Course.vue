<template>
    <div>
        <v-card-widget enableActions :title="'Cursos'">
            <div slot="widget-header-action">

            </div>
            <div slot="widget-content">
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{on}">
                        <v-btn color="primary" class="mb-2" v-on="on">Novo Curso</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>

                                <div v-if="dialogDelete === true">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            Deseja deletar {{course.nome}} ?
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else-if="dialogDelete === false">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field type="text" v-model="course.nome" label="Nome"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field type="text" v-model="course.sigla" label="Sigla"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-select :items="course.turno" v-model="course.turno" label="Turno"></v-select>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div v-if="dialogDelete === true">
                                <v-btn color="blue darken-1" text @click="remove">Deletar</v-btn>
                                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                            </div>
                            <div v-else-if="dialogDelete === false">
                                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-row>
                    <v-col cols="12">
                        <v-data-table
                                :headers="headers"
                                :items="cursos"
                                :items-per-page="5"
                                class="elevation-1">
                            <template v-slot:item.action="{ item }">
                                <v-icon medium="" color="success" class="mr-2" @click="editItem(item)">edit</v-icon>
                                <div v-if="item.habilitado === false">
                                    <v-icon medium="" color="success" @click="deleteItem(item)">delete</v-icon>
                                </div>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </div>
        </v-card-widget>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VCardWidget from "@/components/VWidget";
    import {createNamespacedHelpers} from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('course')
    export default {
        name: 'course',
        components: {
            VCardWidget
        },

        data: () => ({
            dialogDelete: false,
            dialog: false,
            headers: [
                { text: 'Nome', align: 'left', value: 'nome' },
                { text: 'Turno', value: 'turno' },
                { text: "Acões", value: "action", sortable: false, width: "8%" }
            ],
            courseIndex: -1,
            defaultCourse: {
                nome: '',
                sigla: '',
                turno: ''
            },
        }),

        created() {
            this.listCourse()
        },

        computed: {
            formTitle () {
                if (this.dialogDelete) {
                    return "Deletar Curso";
                }else
                    return this.courseIndex === -1 ? 'Novo Curso' : 'Editar Curso'
            },
            ...mapState(['cursos', 'course'])
        },

        methods: {
            ...mapActions(['listCourses', 'addCourse']),
            editItem (item) {
                this.dialogDelete = false;
                this.courseIndex = this.cursos.indexOf(item);
                this.dialog = true;
            },
            deleteItem (item) {
                this.dialogDelete = true;
                this.courseIndex = this.cursos.indexOf(item);
                this.dialog = true;
            },
            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.courseIndex = -1;
                    this.dialogDelete = false;
                }, 300);
            },
            save () {
                this.addCourse()
                Object.assign(this.cursos[this.courseIndex], this.course)
                this.close()
            },
            remove() {
                this.cursos.splice(this.courseIndex, 1);
                this.close();
            }
        }
    }

</script>
