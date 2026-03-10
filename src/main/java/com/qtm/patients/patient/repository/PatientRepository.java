package com.qtm.patients.patient.repository;

import com.qtm.patients.patient.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository JPA dei pazienti.
 */
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {

    boolean existsByFiscalCodeIgnoreCase(String fiscalCode);

    boolean existsByFiscalCodeIgnoreCaseAndIdNot(String fiscalCode, Long id);
}