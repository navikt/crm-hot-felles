@isTest
private class HOT_DynamicAlertBannerControllerTest {

    @testSetup
    static void setupData() {
        Account acc = new Account(
            Name = 'Test Account'
        );
        insert acc;
    }

    @isTest
    static void testGetFieldValue_ReturnsValue() {
        Account acc = [SELECT Id, Name FROM Account LIMIT 1];

        Test.startTest();
        String result = HOT_DynamicAlertBannerController.getFieldValue(
            'Account',
            'Name',
            acc.Id
        );
        Test.stopTest();

        System.assertEquals('Test Account', result);
    }

    @isTest
static void testGetFieldValue_FieldIsNull() {
    Account acc = [SELECT Id FROM Account LIMIT 1];

    Test.startTest();
    String result = HOT_DynamicAlertBannerController.getFieldValue(
        'Account',
        'AccountNumber',
        acc.Id
    );
    Test.stopTest();

    System.assertEquals(null, result);
}

    @isTest
    static void testGetFieldValue_BlankObjectName() {
        Account acc = [SELECT Id FROM Account LIMIT 1];

        Test.startTest();
        String result = HOT_DynamicAlertBannerController.getFieldValue(
            '',
            'Name',
            acc.Id
        );
        Test.stopTest();

        System.assertEquals(null, result);
    }

    @isTest
    static void testGetFieldValue_BlankFieldName() {
        Account acc = [SELECT Id FROM Account LIMIT 1];

        Test.startTest();
        String result = HOT_DynamicAlertBannerController.getFieldValue(
            'Account',
            '',
            acc.Id
        );
        Test.stopTest();

        System.assertEquals(null, result);
    }

    @isTest
    static void testGetFieldValue_NullRecordId() {

        Test.startTest();
        String result = HOT_DynamicAlertBannerController.getFieldValue(
            'Account',
            'Name',
            null
        );
        Test.stopTest();

        System.assertEquals(null, result);
    }
}