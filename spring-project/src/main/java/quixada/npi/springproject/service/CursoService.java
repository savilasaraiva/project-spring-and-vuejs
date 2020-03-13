package quixada.npi.springproject.service;

import org.springframework.stereotype.Service;
import quixada.npi.springproject.model.Curso;

import java.util.List;

@Service
public interface CursoService {

    List<Curso> findAll();

    Curso addCourse(Curso course);
}
