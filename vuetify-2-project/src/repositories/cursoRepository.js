import Repository from "./Repository";

const resource = "/cursos";

export default {
    getAll() {
        return Repository.get(`${resource}`)
    }
}
