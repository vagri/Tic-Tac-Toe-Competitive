package tttc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TTTCApplication {

    public static void main(String[] args) {
        SpringApplication.run(TTTCApplication.class, args);
    }

    // Enable CORS for all origins and paths
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:63342") // your frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}