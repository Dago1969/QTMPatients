package com.qtm.patients.config;

import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Gestione centralizzata delle eccezioni REST con messaggi leggibili dal frontend.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ProblemDetail handleResponseStatusException(ResponseStatusException exception) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(exception.getStatusCode(), exception.getReason());
        problemDetail.setTitle("Errore applicativo");
        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        String detail = exception.getBindingResult().getFieldErrors().stream()
                .map(this::toValidationMessage)
                .collect(Collectors.joining("; "));
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
        problemDetail.setTitle("Dati non validi");
        return problemDetail;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleConstraintViolationException(ConstraintViolationException exception) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, exception.getMessage());
        problemDetail.setTitle("Vincolo non valido");
        return problemDetail;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetail handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        String detail = resolvePersistenceMessage(exception);
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, detail);
        problemDetail.setTitle("Errore di persistenza");
        return problemDetail;
    }

    private String toValidationMessage(FieldError fieldError) {
        return fieldError.getField() + ": " + (fieldError.getDefaultMessage() == null ? "valore non valido" : fieldError.getDefaultMessage());
    }

    private String resolvePersistenceMessage(DataIntegrityViolationException exception) {
        String message = exception.getMostSpecificCause() == null
                ? "Errore di persistenza"
                : exception.getMostSpecificCause().getMessage();
        String normalized = message.toLowerCase(Locale.ROOT);

        if (normalized.contains("duplicate entry") && normalized.contains("fiscal_code")) {
            return "Esiste gia un paziente con lo stesso codice fiscale";
        }

        if (normalized.contains("duplicate entry") && normalized.contains("assisted_id")) {
            return "Esiste gia un paziente con lo stesso ID assistito";
        }

        if (normalized.contains("not null")) {
            return "Uno o piu campi obbligatori non sono valorizzati";
        }

        return "Operazione non completata per un vincolo del database";
    }
}