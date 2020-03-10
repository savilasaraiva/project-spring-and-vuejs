/*
    Como utilizar:
        Para mostrar uma mensagem de sucesso:
            this.$store.dispatch("app/putInfo", "MENSAGEM DE INFORMAÇÃO A SER EXIBIDA!")

        Para mostrar uma mensagem de erro:
            this.$store.dispatch("app/putError", "MENSAGEM DE ERRO A SER EXIBIDA!")
*/
const state = {
    messages: {
        error: "",
        info: ""
    }
}

const actions = {
    putError({commit}, message){
        commit('SET_ERROR', message)
    },
    putInfo({commit}, message){
        commit('SET_INFO', message)
    },
    clearError({commit}){
        commit('SET_ERROR', "")
    },
    clearInfo({commit}){
        commit('SET_INFO', "")
    }
}

const getters = {
    GET_ERROR(state) {
        return state.messages.error
    },
    GET_INFO(state) {
        return state.messages.info
    }
}

const mutations = {
    SET_ERROR: (state, message) => {
        state.messages.error =  message
    },
    SET_INFO: (state, message) => {
        state.messages.info = message
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}