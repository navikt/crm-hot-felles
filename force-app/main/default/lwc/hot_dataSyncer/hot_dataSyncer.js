import { LightningElement } from 'lwc';
import syncBankAccountNumber from '@salesforce/apex/HOT_DataSynchController.doBankAccountNumberSync';
import updateKrrInfo from '@salesforce/apex/HOT_KrrInformationController.updateKrrInformation';

export default class Hot_dataSyncer extends LightningElement {
    hasStarted = false;

    connectedCallback() {
        if (this.hasStarted) {
            return;
        }

        this.hasStarted = true;
        void this.startSync();
    }

    async startSync() {
        try {
            await this.syncBankAccountNumber();
            await this.updateKrrInfo();
        } catch (error) {
            console.error('[hot_dataSyncer][ERR] Data sync failed:', JSON.stringify(error, null, 2));
        }
    }

    async syncBankAccountNumber() {
        try {
            await syncBankAccountNumber();
        } catch (error) {
            console.error('[hot_dataSyncer][ERR] Bank account number sync failed:', JSON.stringify(error, null, 2));
            throw error;
        }
    }

    async updateKrrInfo() {
        try {
            await updateKrrInfo();
        } catch (error) {
            console.error('[hot_dataSyncer][ERR] KRR information update failed:', JSON.stringify(error, null, 2));
            throw error;
        }
    }
}
