public with sharing class HOT_DynamicAlertBannerController {
@AuraEnabled(cacheable=true)
    public static String getFieldValue(String objectApiName, String fieldApiName, Id recordId) {

        if(String.isBlank(objectApiName) || String.isBlank(fieldApiName) || recordId == null) {
            return null;
        }

        String query = 'SELECT ' + fieldApiName +
                       ' FROM ' + objectApiName +
                       ' WHERE Id = :recordId LIMIT 1';

        SObject record = Database.query(query);

        Object value = record.get(fieldApiName);

        if(value == null) {
            return null;
        }

        return String.valueOf(value);
    }
}