import axios from 'axios'
import auth from "./auth";
import {RepositoryFactory} from "../../repositories/RepositoryFactory";
const usuarioRepo = RepositoryFactory.get("usuario");

// state
const state = {
    usuarios:[],
    user: {
        nome: '',
        email: '',
        password: '',
        habilitado: false
    }
};

// actions
const actions = {
    async addUser({state, commit}){
        try {
            const res = await axios.post(
                '/usuarios/add', state.user,
                {headers: {Authorization: auth.state.token}})
            commit('clearUser')
        }catch (errs){
            console.log(errs)
        }
    },

    async listUser({state, commit}){
        const res = await usuarioRepo.getAll()
        commit('setUsers', res.data)
    }
};

// getters
const getters = {

};

// mutations
const mutations = {
    setUsers (state, usuarios){
        state.usuarios = usuarios
    },
    setUser(state, user){
        state.user.nome = user.nome,
        state.user.email = user.email,
        state.user.password = user.password,
        state.user.habilitado = user.habilitado
    },
    clearUser(state){
        state.user.nome = '',
        state.user.email = '',
        state.user.password = '',
        state.user.habilitado = ''
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
