# Immagine runtime per il backend Spring Boot di QTMPatients.
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Variabili di default coerenti con la configurazione corrente del progetto.
ENV SERVER_PORT=8088 \
    SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3606/QTMPatients?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC \
    SPRING_DATASOURCE_USERNAME=user_app \
    SPRING_DATASOURCE_PASSWORD=user_password \
    SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=http://host.docker.internal:8085/realms/QTM

# Il jar viene prodotto localmente da Maven e poi incluso nell'immagine.
COPY target/qtm-patients-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8088

ENTRYPOINT ["java", "-jar", "app.jar"]