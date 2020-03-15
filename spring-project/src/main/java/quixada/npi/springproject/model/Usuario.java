package quixada.npi.springproject.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
public class Usuario implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty
	private String nome;
	
	@NotEmpty
	@Column(unique = true)
	private String email;
	
	@NotEmpty
	private String password;

	@ManyToOne
	private Curso curso;

	private boolean habilitado;

	public Usuario() {}

	public Usuario (Integer id, String nome, String email, Curso curso) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.curso = curso;
	}

	public Usuario (String nome, String email, String password, Curso curso, boolean habilitado) {
		this.nome = nome;
		this.email = email;
		this.password = password;
		this.curso = curso;
		this.habilitado = habilitado;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) { this.password = password; }

	public Curso getCurso() { return curso; }

	public void setCurso(Curso curso) { this.curso = curso; }

	public boolean isHabilitado() {
		return habilitado;
	}

	public void setHabilitado(boolean habilitado) {
		this.habilitado = habilitado;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.emptyList();
		//return this.papeis;
	}
	
	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.habilitado;
	}

	public List<String> getRoles() {
			return new ArrayList<String>();
	}

	@Override
	public String toString() {
		return "Usuario{" +
				"id=" + id +
				", nome='" + nome + '\'' +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				", curso='" + curso.getNome() + '\'' +
				", habilitado=" + habilitado +
				'}';
	}
}
