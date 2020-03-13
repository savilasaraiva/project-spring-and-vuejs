import axios from 'axios'
import auth from "./auth";
import {RepositoryFactory} from "../../repositories/RepositoryFactory";
const cursoRepo = RepositoryFactory.get("curso");

// state
const state = {
    cursos:[],
    course: {
        nome: '',
        sigla: '',
        turno: ''
    }
};

// actions
const actions = {
    async addCourse({state, commit}){
        try {
            const res = await axios.post(
                '/cursos/add', state.course,
                {headers: {Authorization: auth.state.token}})
            commit('clearCourse')
        }catch (errs){
            console.log(errs)
        }
    },

    async listCourses({state, commit}){
        const res = await usuarioRepo.getAll()
        commit('setCourses', res.data)
    }
};

// getters
const getters = {

};

// mutations
const mutations = {
    setUsers (state, cursos){
        state.cursos = cursos
    },
    setUser(state, course){
        state.course.nome = course.nome,
        state.course.sigla = course.sigla,
        state.course.turno = course.turno
    },
    clearCourse(state){
        state.course.nome = '',
        state.course.email = '',
        state.course.password = ''
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
