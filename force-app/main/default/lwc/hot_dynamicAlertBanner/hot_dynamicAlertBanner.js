import { LightningElement, api, wire } from 'lwc';
import getFieldValue from '@salesforce/apex/Hot_DynamicAlertBannerController.getFieldValue';

export default class Hot_dynamicAlertBanner extends LightningElement {
    @api object;
    @api field;
    @api pretext;
    @api type;
    @api recordId;

    fieldValue;
    error;

    @wire(getFieldValue, {
        objectApiName: '$object',
        fieldApiName: '$field',
        recordId: '$recordId'
    })
    wiredField({ error, data }) {
        if (data) {
            this.fieldValue = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.fieldValue = undefined;
        }
    }

    get iconName() {
        switch (this.type) {
            case 'Error':
                return 'utility:error';
            case 'Warning':
                return 'utility:warning';
            default:
                return 'utility:info';
        }
    }

    get bannerClass() {
        switch (this.type) {
            case 'Error':
                return 'slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error';
            case 'Warning':
                return 'slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_warning';
            default:
                return 'slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_info';
        }
    }
}
