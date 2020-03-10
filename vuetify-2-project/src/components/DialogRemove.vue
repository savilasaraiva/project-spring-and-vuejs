<template>
    <v-dialog v-model="dialogVisible" persistent max-width="370">
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>{{descricao}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="confirmAction()">[E] Excluir</v-btn>
          <v-btn text color="grey" @click="toogleVisible()">[C] Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  mounted(){
    document.addEventListener("keyup", this.onKeyPress)
  },

  destroyed() {
    document.removeEventListener("keyup", this.onKeyPress)
  },

  methods: {
    onKeyPress(e){
      if(e.key.toLowerCase() == "e" && this.dialogVisible)
        this.confirmAction()
      else if(e.key.toLowerCase() == "c" && this.dialogVisible)
        this.toogleVisible()
      else if(e.key.toLowerCase() == 'escape' && this.dialogVisible)
        this.toogleVisible()
    }
  },

  name: 'dialog-remove',
  props:{
    dialogVisible: Boolean,
    confirmAction: Function,
    toogleVisible: Function,
    descricao: String
  }
}
</script>

<style scoped>

</style>
