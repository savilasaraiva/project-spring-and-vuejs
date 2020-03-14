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
                        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                            <v-card-text>
                                <v-container>
                                    <div v-if="dialogDelete === true">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                Deseja deletar {{course.nome}}?
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div v-else-if="dialogDelete === false">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-text-field type="text" v-model="course.nome" label="Nome" :rules="[v => !!v || 'Nome é requerido']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-text-field type="text" v-model="course.sigla" label="Sigla" :rules="[v => !!v || 'Sigla é requerido']" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-select :items="items" v-model="course.turno" label="Turno" :rules="[v => !!v || 'Turno é requerido']" required></v-select>
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
                                        <v-btn color="blue darken-1" text @click="save" :disabled="!valid">Salvar</v-btn>
                                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                    </div>
                                </v-card-actions>
                        </v-form>
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
                                <v-icon medium="" color="success" @click="deleteItem(item)">delete</v-icon>
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
            items: ['Manhã', 'Tarde', 'Noite'],
            dialogDelete: false,
            dialog: false,
            valid: true,
            headers: [
                { text: 'Nome', align: 'left', value: 'nome' },
                { text: 'Turno', value: 'turno' },
                { text: "Acões", value: "action", sortable: false, width: "8%" }
            ],
            courseIndex: -1,
            defaultCourse: {
                id: 0,
                nome: '',
                sigla: '',
                turno: ''
            },
            lazy: false,
        }),

        created() {
            this.listCourses()
        },

        computed: {
            formTitle () {
                if (this.dialogDelete) {
                    return "Deletar Curso";
                }else
                    return this.courseIndex === -1 ? 'Novo Curso' : 'Editar Curso'
            },
            ...mapState(['cursos', 'course']),
        },

        methods: {
            ...mapActions(['listCourses', 'setCourse', 'addCourse', 'updateCourse', 'deleteCourse']),
            editItem (item) {
                this.dialogDelete = false;
                this.courseIndex = this.cursos.indexOf(item);
                this.setCourse(item);
                this.dialog = true;
            },
            deleteItem (item) {
                this.dialogDelete = true;
                this.courseIndex = this.cursos.indexOf(item);
                this.setCourse(item);
                this.dialog = true;
            },
            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.setCourse(this.defaultCourse);
                    this.courseIndex = -1;
                    this.dialogDelete = false;
                    this.$refs.form.resetValidation()
                }, 300);
            },
            save () {
                this.$refs.form.validate()
                if(this.courseIndex > -1) {
                    Object.assign(this.cursos[this.courseIndex], this.course)
                    this.updateCourse()
                    this.$refs.form.resetValidation()
                }else{
                    this.addCourse()
                    this.$refs.form.resetValidation()
                }
                this.close()
            },
            remove() {
                this.cursos.splice(this.course, 1);
                this.deleteCourse()
                this.close();
            }
        }
    }

</script>
