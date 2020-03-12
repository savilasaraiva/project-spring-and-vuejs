package quixada.npi.springproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quixada.npi.springproject.model.Usuario;
import quixada.npi.springproject.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("")
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<List<Usuario>> find(@PathVariable Integer id) {
        // Busca usuário pelo id e retornar usuário...
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        // Cadastrar usuário e retornar usuário cadastrado...
        return ResponseEntity.ok(usuarioService.addUser(usuario));
    }

    //@DeleteMapping("{id}")
    //TODO: excluir usuário

    // @PutMapping("{id}")
    /*public ResponseEntity<Usuario> update(@RequestBody Usuario usuario) {

    }*/



}
