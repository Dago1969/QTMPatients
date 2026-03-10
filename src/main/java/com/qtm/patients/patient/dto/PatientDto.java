package com.qtm.patients.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * DTO paziente per comunicazione REST frontend/backend.
 */
@Getter
@Setter
@NoArgsConstructor
public class PatientDto {

    private Long id;
    private String assistedId;

    @NotBlank(message = "Il nome e obbligatorio")
    private String firstName;

    @NotBlank(message = "Il cognome e obbligatorio")
    private String lastName;

    @NotBlank(message = "Il codice fiscale e obbligatorio")
    private String fiscalCode;

    private String email;
    private String primaryPhone;
    private String secondaryPhone;
    private Long regionId;
    private String region;
    private Long provinceId;
    private String province;
    private Long cityId;
    private String city;
    private String deliveryAddress;
    private String secondaryAddresses;
    private String communicationChannels;
    private String identificationDocumentReference;
    private Boolean dataProcessingConsent;
    private LocalDateTime dataProcessingConsentDateTime;
    private String dataProcessingConsentRevocationLog;
    private String additionalConsents;
    private String therapyStatus;
    private String prescribingSpecialist;
    private String referenceHospitalStructure;
    private String referencePharmacy;
    private String preferredPickupPharmacy;
    private String deliveryMode;
    private Boolean reminderEnabled;
    private String caregiverFullName;
    private String caregiverPhone;
    private String preferredContact;
    private Long structureId;
}