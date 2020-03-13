package quixada.npi.springproject.service;

import org.springframework.stereotype.Service;
import quixada.npi.springproject.model.Usuario;

import java.util.List;

@Service
public interface UsuarioService {

    Usuario findByEmail(String email);

    List<Usuario> findAll();

    Usuario addUser(Usuario user);
}
