package com.qtm.patients.patient.service;

/**
 * Criteri di ricerca pazienti derivati dai query params REST.
 */
public record PatientSearchCriteria(
        String assistedId,
        String firstName,
        String lastName,
        String email,
        String fiscalCode,
        Long structureId
) {
}