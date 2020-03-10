import UsuarioRepository from "./usuarioRepository";

const repositories = {
    usuario: UsuarioRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
