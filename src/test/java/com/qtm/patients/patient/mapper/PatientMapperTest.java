package com.qtm.patients.patient.mapper;

import com.qtm.commonlib.dto.PatientDto;
import com.qtm.patients.patient.entity.PatientEntity;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Test parametrico per il metodo updateEntity di PatientMapper.
 * Verifica che tutti i campi di PatientEntity vengano aggiornati correttamente da PatientDto.
 */
class PatientMapperTest {

    static Stream<TestData> updateEntityProvider() {
        return Stream.of(
            new TestData(new PatientEntity(), new PatientDto())
            // Puoi aggiungere altri casi con valori specifici
        );
    }

    @ParameterizedTest
    @MethodSource("updateEntityProvider")
    void testUpdateEntity(TestData data) {
        PatientMapper mapper = new PatientMapper();
        mapper.updateEntity(data.entity, data.dto);
        // Verifica che i campi siano uguali
        assertEquals(data.dto.getAssistedId(), data.entity.getAssistedId());
        assertEquals(data.dto.getFirstName(), data.entity.getFirstName());
        assertEquals(data.dto.getLastName(), data.entity.getLastName());
        assertEquals(data.dto.getFiscalCode(), data.entity.getFiscalCode());
        assertEquals(data.dto.getEmail(), data.entity.getEmail());
        assertEquals(data.dto.getPrimaryPhone(), data.entity.getPrimaryPhone());
        assertEquals(data.dto.getSecondaryPhone(), data.entity.getSecondaryPhone());
        assertEquals(data.dto.getRegionId(), data.entity.getRegionId());
        assertEquals(data.dto.getRegion(), data.entity.getRegion());
        assertEquals(data.dto.getProvinceId(), data.entity.getProvinceId());
        assertEquals(data.dto.getProvince(), data.entity.getProvince());
        assertEquals(data.dto.getCityId(), data.entity.getCityId());
        assertEquals(data.dto.getCity(), data.entity.getCity());
        assertEquals(data.dto.getDeliveryAddress(), data.entity.getDeliveryAddress());
        assertEquals(data.dto.getSecondaryAddresses(), data.entity.getSecondaryAddresses());
        assertEquals(data.dto.getCommunicationChannels(), data.entity.getCommunicationChannels());
        assertEquals(data.dto.getIdentificationDocumentReference(), data.entity.getIdentificationDocumentReference());
        assertEquals(data.dto.getDataProcessingConsent(), data.entity.getDataProcessingConsent());
        assertEquals(data.dto.getDataProcessingConsentDateTime(), data.entity.getDataProcessingConsentDateTime());
        assertEquals(data.dto.getDataProcessingConsentRevocationLog(), data.entity.getDataProcessingConsentRevocationLog());
        assertEquals(data.dto.getAdditionalConsents(), data.entity.getAdditionalConsents());
        assertEquals(data.dto.getTherapyStatus(), data.entity.getTherapyStatus());
        assertEquals(data.dto.getPrescribingSpecialist(), data.entity.getPrescribingSpecialist());
        assertEquals(data.dto.getReferenceHospitalStructure(), data.entity.getReferenceHospitalStructure());
        assertEquals(data.dto.getReferencePharmacy(), data.entity.getReferencePharmacy());
        assertEquals(data.dto.getPreferredPickupPharmacy(), data.entity.getPreferredPickupPharmacy());
        assertEquals(data.dto.getDeliveryMode(), data.entity.getDeliveryMode());
        assertEquals(data.dto.getReminderEnabled(), data.entity.getReminderEnabled());
        assertEquals(data.dto.getCaregiverFullName(), data.entity.getCaregiverFullName());
        assertEquals(data.dto.getCaregiverPhone(), data.entity.getCaregiverPhone());
        assertEquals(data.dto.getPreferredContact(), data.entity.getPreferredContact());
        assertEquals(data.dto.getStructureId(), data.entity.getStructureId());
    }

    static class TestData {
        PatientEntity entity;
        PatientDto dto;
        TestData(PatientEntity entity, PatientDto dto) {
            this.entity = entity;
            this.dto = dto;
        }
    }
}
