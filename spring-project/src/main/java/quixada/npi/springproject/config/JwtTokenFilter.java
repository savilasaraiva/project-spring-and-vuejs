package quixada.npi.springproject.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import quixada.npi.springproject.exception.InvalidJwtAuthenticationException;
import quixada.npi.springproject.exception.StandardError;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class JwtTokenFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		try {
	        String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
	        if (token != null && jwtTokenProvider.validateToken(token)) {
	            Authentication auth = jwtTokenProvider.getAuthentication(token);

				String refreshToken = jwtTokenProvider.createRefreshToken(token);
				res.setHeader("Access-Control-Expose-Headers", "Authorization");
				res.setHeader("Authorization", "Bearer " + refreshToken);

				if (auth != null) {
	                SecurityContextHolder.getContext().setAuthentication(auth);
	            }
	        }
    	} catch(InvalidJwtAuthenticationException ex) {
			StandardError error = new StandardError(HttpStatus.UNAUTHORIZED.value(), "Token inválido ou expirado!", ex.getMessage(), req.getHeader("Referer"));
			res.setStatus(error.getStatus());
			res.setContentType("application/json");

			ObjectMapper mapper = new ObjectMapper();
			PrintWriter out = res.getWriter();
			String json = mapper.writeValueAsString(error);
			out.print(json);
			out.flush();

			return;

		}
		filterChain.doFilter(req, res);

    }

}
