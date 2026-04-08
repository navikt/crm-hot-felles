import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class Hot_flowTextAreaWithCounter extends LightningElement {
    @api label;
    @api inputText = '';
    @api required = false;
    @api errorText = '';
    @api maxCharacters = 255;

    get remainingCharacters() {
        return this.maxCharacters - (this.inputText ? this.inputText.length : 0);
    }

    get counterClass() {
        return this.remainingCharacters < 20 ? 'character-counter warning' : 'character-counter';
    }

    validate() {
        if (this.required && (!this.inputText || this.inputText.trim() === '')) {
            this.errorText = 'Vennligst fyll ut tekstfeltet for å gå videre.';
            return false;
        }

        this.errorText = '';
        return true;
    }

    handleUserInputTextarea(event) {
        let value = event.detail;
        if (value.length > this.maxCharacters) {
            value = value.substring(0, this.maxCharacters);
        }

        this.inputText = value;
        this.dispatchEvent(new FlowAttributeChangeEvent('inputText', this.inputText));

        if (this.errorText && this.inputText.trim() !== '') {
            this.errorText = '';
        }
    }
}
