import UsuarioRepository from "./usuarioRepository";
import CursoRepository from "./cursoRepository";

const repositories = {
    usuario: UsuarioRepository,
    curso: CursoRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
