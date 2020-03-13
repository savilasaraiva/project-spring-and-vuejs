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
    public ResponseEntity<List<Curso>> find(@PathVariable Integer id) {
        // Busca curso pelo id e retornar usuário...
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Curso> create(@RequestBody Curso curso) {
        // Cadastrar curso e retornar curso cadastrado...
        return ResponseEntity.ok(cursoService.addCourse(curso));
    }

    //@DeleteMapping("{id}")
    //TODO: excluir curso

    // @PutMapping("{id}")
    /*public ResponseEntity<Curso> update(@RequestBody Curso curso) {

    }*/
}
