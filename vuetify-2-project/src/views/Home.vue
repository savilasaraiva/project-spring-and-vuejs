<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
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
                        Deseja deletar {{editedItem.nome}} ?
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else-if="dialogDelete === false">
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field v-model="editedItem.nome" label="Nome"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field v-model="editedItem.password" label="Senha"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-switch v-model="editedItem.habilitado" :label="`Habilitado: ${editedItem.habilitado}`">
                        </v-switch>
                      </v-col>
                    </v-row>
                  </div>
                </v-row>
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
                  <v-icon medium="" color="success" @click="deleteItem(item)">delete</v-icon>
                </template>
                <template v-slot:no-data="">
                  <v-btn color="primary" @click="initialize">Resetar</v-btn>
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
import {RepositoryFactory} from "@/repositories/RepositoryFactory";
const usuarioRepo = RepositoryFactory.get("usuario");

export default {
  name: 'home',
  components: {
    VCardWidget
  },

  data: () => ({
    dialogDelete: false,
    dialog: false,
    headers: [
      {
        text: 'Nome',
        align: 'left',
        value: 'nome',
      },
      { text: 'Email', value: 'email' },
      { text: 'Habilitado', value: 'habilitado' },
      { text: "Acões", value: "action", sortable: false, width: "8%" }
],
    usuarios :[],
    editedIndex: -1,
    editedItem: {
      nome: '',
      email: '',
      habilitado: false
    },
    defaultItem: {
      nome: '',
      email: '',
      habilitado: false
    },
  }),

  created() {
    usuarioRepo.getAll().then(res => {
      this.usuarios = res.data;
    }).catch(console.error);
  },

  computed: {
    formTitle () {
      if (this.dialogDelete) {
        return "Deletar Usuário";
      }else
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
    },
  },

  methods: {
    editItem (item) {
      this.dialogDelete = false;
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem (item) {
      this.dialogDelete = true;
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.dialogDelete = false;
      }, 300);
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.usuarios[this.editedIndex], this.editedItem)
      } else {
        this.usuarios.push(this.editedItem)
      }
      this.close()
    },
    remove() {
      this.usuarios.splice(this.editedIndex, 1);
      this.close();
    }
  }
}
</script>
