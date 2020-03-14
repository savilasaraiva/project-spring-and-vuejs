<template>
    <div>
        <v-card-widget enableActions :title="'Usuários'">
            <div slot="widget-header-action">

            </div>
            <div slot="widget-content">
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{on}">
                        <v-btn color="primary" class="mb-2" v-on="on">Novo Usuário</v-btn>
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
                                            Deseja deletar {{user.nome}}?
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else-if="dialogDelete === false">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field type="text" v-model="user.nome" label="Nome"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field type="text" v-model="user.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field type="password" v-model="user.password" label="Senha"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="8">
                                            <v-select v-model="user.curso" :items="cursos" label="Curso" item-text="nome"
                                                      item-value="id" return-object>
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-switch v-model="user.habilitado" :label="'Habilitado'">
                                            </v-switch>
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
                                :items="usuarios"
                                :items-per-page="5"
                                class="elevation-1">
                            <template v-slot:item.action="{ item }">
                                <v-icon medium="" color="success" class="mr-2" @click="editItem(item)">edit</v-icon>
                                <div v-if="item.habilitado === false">
                                    <v-icon medium="" color="success" @click="deleteItem(item)">delete</v-icon>
                                </div>
                            </template>
                            <template v-slot:item.habilits="{ item }">
                                <v-switch disabled v-model="item.habilitado">
                                </v-switch>
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
    import { mapState, mapActions } from 'vuex'
    //import {createNamespacedHelpers} from 'vuex'
    //const {mapState, mapActions} = createNamespacedHelpers('user')

    export default {
        name: 'user',
        components: {
            VCardWidget
        },
        data: () => ({
            dialogDelete: false,
            dialog: false,
            valid: true,
            headers: [
                { text: 'Nome', align: 'left', value: 'nome' },
                { text: 'Email', value: 'email' },
                { text: 'Habilitado', value: 'habilits', sortable: false },
                { text: "Acões", value: "action", sortable: false, width: "8%" }
            ],
            userIndex: -1,
            defaultUser: {
                nome: '',
                email: '',
                password: '',
                habilitado: false
            },
            lazy: false,
        }),

        created() {
            this.listUsers(),
            this.listCourses()
        },

        computed: {
            formTitle () {
                if (this.dialogDelete) {
                    return "Deletar Usuário";
                }else
                    return this.userIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
            },
            ...mapState('user', ['usuarios', 'user']),
            ...mapState('course', ['cursos', 'course'])
        },

        methods: {
            ...mapActions('user', ['listUsers', 'setUser', 'addUser', 'updateUser', 'deleteUser']),
            ...mapActions('course', ['listCourses', 'setCourse']),
            editItem (item) {
                this.dialogDelete = false;
                this.userIndex = this.usuarios.indexOf(item);
                this.setUser(item);
                this.dialog = true;
            },
            deleteItem (item) {
                this.dialogDelete = true;
                this.userIndex = this.usuarios.indexOf(item);
                this.setUser(item);
                this.dialog = true;
            },
            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.userIndex = -1;
                    this.dialogDelete = false;
                }, 300);
            },
            save () {
                this.user.addUser()
                Object.assign(this.usuarios[this.userIndex], this.user)
                this.close()
            },
            remove() {
                this.usuarios.splice(this.userIndex, 1);
                this.close();
            }
        }
    }

</script>
