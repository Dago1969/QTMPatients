package com.qtm.patients;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Verifica minima del bootstrap Spring Boot.
 */
@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:qtmpatients;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost/test-issuer",
    "spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost/test-issuer/jwks"
})
class QtmPatientsApplicationTests {

    @Test
    void contextLoads() {
    }
}