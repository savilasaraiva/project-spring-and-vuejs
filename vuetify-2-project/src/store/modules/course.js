import axios from 'axios'
import auth from "./auth";
import {RepositoryFactory} from "../../repositories/RepositoryFactory";
const cursoRepo = RepositoryFactory.get("curso");

// state
const state = {
    cursos:[],
    course: {
        id: 0,
        nome: '',
        sigla: '',
        turno: ''
    }
};

// actions
const actions = {
    async listCourses({state, commit}){
        const res = await cursoRepo.getAll()
        commit('setCourses', res.data)
    },
    async addCourse({state, commit}){
        try {
            const res = await axios.post(
                '/cursos/add', state.course,
                {headers: {Authorization: auth.state.token}})
            commit('clearCourse', res.data)
            state.cursos.push(res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async updateCourse({state, commit}){
        try {
            const res = await axios.put(
                `/cursos/${state.course.id}`, state.course,
                {headers: {Authorization: auth.state.token}})
            commit('clearCourse', res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async deleteCourse({state, commit}){
        try {
            const res = await axios.delete(
                `/cursos/${state.course.id}`,
                {headers: {Authorization: auth.state.token}})
            commit('clearCourse', res.data)
        }catch (errs){
            console.log(errs)
        }
    },
    async setCourse({state, commit}, course){
        commit('setCourse', course);
    },
};

// getters
const getters = {

};

// mutations
const mutations = {
    setCourses (state, cursos){
        state.cursos = cursos
    },
    setCourse(state, course){
        state.course.id = course.id,
        state.course.nome = course.nome,
        state.course.sigla = course.sigla,
        state.course.turno = course.turno
    },
    clearCourse(state){
        state.course.id = 0,
        state.course.nome = '',
        state.course.sigla = '',
        state.course.turno = ''
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
