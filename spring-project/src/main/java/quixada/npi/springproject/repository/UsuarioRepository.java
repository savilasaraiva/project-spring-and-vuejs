package quixada.npi.springproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import quixada.npi.springproject.model.Usuario;

import java.util.List;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    List<Usuario> findAll();

    Usuario findByEmail(String email);
}
