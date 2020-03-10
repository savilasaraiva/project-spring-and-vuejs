<template>
    <v-toolbar absolute dense flat>
        <v-toolbar-title>
            <span>{{titulo}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
                v-if="voltar" class="secondary white--text"
                depressed small
                @click="redirect(voltar)"
        >
            <v-icon>reply_all</v-icon>
            Voltar
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "PageTitle",
        props: {
            titulo: {
                type: String,
                default: ""
            },
            voltar: {
                type: String,
                default: ""
            }
        },
        methods:{
            redirect(link) {
                this.$router.push(link)
            },
        }
    }
</script>

<style scoped>

</style>