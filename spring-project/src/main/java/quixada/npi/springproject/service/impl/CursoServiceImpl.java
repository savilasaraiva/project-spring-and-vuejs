package quixada.npi.springproject.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import quixada.npi.springproject.model.Curso;
import quixada.npi.springproject.repository.CursoRepository;
import quixada.npi.springproject.service.CursoService;

import java.util.List;

public class CursoServiceImpl implements CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Override
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    @Override
    public Curso addCourse(Curso course) {
        return cursoRepository.save(course);
    }
}
