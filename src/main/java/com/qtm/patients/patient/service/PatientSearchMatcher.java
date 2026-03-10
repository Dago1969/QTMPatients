package com.qtm.patients.patient.service;

import com.qtm.patients.patient.entity.PatientEntity;

import java.util.Locale;

/**
 * Logica pura per verificare la corrispondenza di un paziente ai filtri di ricerca.
 */
public final class PatientSearchMatcher {

    private PatientSearchMatcher() {
    }

    public static boolean matches(PatientEntity patient, PatientSearchCriteria criteria) {
        return contains(patient.getAssistedId(), criteria.assistedId())
                && contains(patient.getFirstName(), criteria.firstName())
                && contains(patient.getLastName(), criteria.lastName())
                && contains(patient.getEmail(), criteria.email())
                && contains(patient.getFiscalCode(), criteria.fiscalCode())
                && equalsLong(patient.getStructureId(), criteria.structureId());
    }

    private static boolean contains(String actualValue, String filterValue) {
        if (filterValue == null || filterValue.isBlank()) {
            return true;
        }
        if (actualValue == null || actualValue.isBlank()) {
            return false;
        }
        return actualValue.toLowerCase(Locale.ROOT).contains(filterValue.trim().toLowerCase(Locale.ROOT));
    }

    private static boolean equalsLong(Long actualValue, Long filterValue) {
        return filterValue == null || filterValue.equals(actualValue);
    }
}