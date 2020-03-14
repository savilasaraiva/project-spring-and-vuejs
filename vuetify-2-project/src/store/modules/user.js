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
                '/usuarios/add', state.course,
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
                `/usuarios/${state.usuarios.id}`, state.user,
                {headers: {Authorization: auth.state.token}})
            commit('clearUser', res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async deleteUser({state, commit}){
        try {
            const res = await axios.delete(
                `/cursos/${state.course.id}`,
                {headers: {Authorization: auth.state.token}})
            commit('clearCourse', res.data)
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
