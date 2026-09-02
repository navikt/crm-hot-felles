import { LightningElement, api } from 'lwc';
import syncBankAccountNumber from '@salesforce/apex/HOT_DataSynchController.doBankAccountNumberSync';
import updateKrrInfo from '@salesforce/apex/HOT_KrrInformationController.updateKrrInformation';

export default class Hot_dataSyncer extends LightningElement {
    @api ident;

    @api
    async startSync() {
        try {
            await this.syncBankAccountNumber(this.ident);
            await this.updateKrrInfo(this.ident);
        } catch (error) {}
    }

    async syncBankAccountNumber(ident) {
        try {
            await syncBankAccountNumber({ ident: ident });
        } catch (error) {}
    }

    async updateKrrInfo(ident) {
        try {
            await updateKrrInfo({ ident: ident });
        } catch (error) {}
    }
}
