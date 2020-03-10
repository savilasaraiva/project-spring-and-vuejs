<template>
    <v-snackbar
        class="mt-0 mr-1"
        v-model="visibilidadeStatus"
        :color="cor"
        top
        right
        :timeout="4000"
    >
        {{texto}}
    </v-snackbar>
</template>

<script>
    export default {
        name: "AppSnackbar",
        data() {
            return {
                visibilidadeStatus: false
            }
        },
        props: {
            visibilidade: {
                type: Boolean,
                default: false
            },
            cor: {
                type: String,
                default: "grey"
            },
            texto: {
                type: String,
                default: ""
            }
        },

        watch: {
            visibilidade() {
                this.visibilidadeStatus = true;
            }
        }
    }
</script>

<style scoped>

</style>