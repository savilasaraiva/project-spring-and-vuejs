package quixada.npi.springproject.service;

import quixada.npi.springproject.model.Curso;

import java.util.List;

public interface CursoService {

    List<Curso> findAll();

    Curso addCourse(Curso course);
}
