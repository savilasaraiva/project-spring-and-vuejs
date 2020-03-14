package quixada.npi.springproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quixada.npi.springproject.model.Curso;
import quixada.npi.springproject.service.CursoService;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping("")
    public ResponseEntity<List<Curso>> findAll() {
        return ResponseEntity.ok(cursoService.findAll());
    }

    @GetMapping("{id}")
    public Curso findById(@PathVariable Integer id) {
        // Busca curso pelo id e retornar curso...
        return cursoService.findById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Curso> create(@RequestBody Curso curso) {
        // Cadastrar curso e retornar curso cadastrado...
        return ResponseEntity.ok(cursoService.add(curso));
    }

    @PutMapping("{id}")
    public ResponseEntity<Curso> update(@RequestBody Curso curso) {
        return ResponseEntity.ok(cursoService.update(curso));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        Curso curso = findById(id);
        cursoService.delete(curso);
        ResponseEntity.ok().build();
    }
}
