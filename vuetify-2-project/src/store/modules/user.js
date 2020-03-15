import axios from 'axios'
import auth from "./auth";
import {RepositoryFactory} from "../../repositories/RepositoryFactory";
const usuarioRepo = RepositoryFactory.get("usuario");

// state
const state = {
    usuarios:[],
    user: {
        id: 0,
        nome: '',
        email: '',
        password: '',
        habilitado: false,
        curso: 0
    }
};

// actions
const actions = {
    async listUsers({state, commit}){
        const res = await usuarioRepo.getAll()
        commit('setUsers', res.data)
    },
    async addUser({state, commit}){
        try {
            const res = await axios.post(
                '/usuarios/add', state.user,
                {headers: {Authorization: auth.state.token}})
            commit('clearUser', res.data)
            state.usuarios.push(res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async updateUser({state, commit}){
        try {
            const res = await axios.put(
                `/usuarios/${state.user.id}`, state.user,
                {headers: {Authorization: auth.state.token}})
            commit('clearUser', res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async deleteUser({state, commit}){
        try {
            const res = await axios.delete(
                `/usuarios/${state.user.id}`,
                {headers: {Authorization: auth.state.token}})
            commit('clearUser', res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async setUser({state, commit}, course){
        commit('setUser', course);
    },
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
        state.user.id = user.id,
        state.user.nome = user.nome,
        state.user.email = user.email,
        state.user.password = user.password,
        state.user.habilitado = user.habilitado,
        state.user.curso = user.curso
    },
    clearUser(state){
        state.user.id = 0,
        state.user.nome = '',
        state.user.email = '',
        state.user.password = '',
        state.user.habilitado = '',
        state.user.curso = 0
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
