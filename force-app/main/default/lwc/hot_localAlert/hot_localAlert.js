import { LightningElement, api } from 'lwc';
import icons from '@salesforce/resourceUrl/aksel_ikoner';

export default class LocalAlert extends LightningElement {
    announcementIcon = icons + '/Media/MegaphoneSpeaking.svg';
    successIcon = icons + '/Status/CheckmarkCircle.svg';
    warningIcon = icons + '/Status/ExclamationmarkTriangle.svg';
    errorIcon = icons + '/Status/XMarkOctagonFillWhite.svg';
    closeIcon = icons + '/Status/XMark.svg';

    // type can be 'announcement', 'success', 'warning', or 'error'
    @api type = 'announcement';
    @api title = '';
    @api content = '';
    @api urlText = '';
    @api url = '';
    @api showCloseButton = false;
    @api ariaLabel = '';
    // Size can be 'small' or 'medium'
    @api size = 'medium';

    isVisible = true;

    get hasLink() {
        return Boolean(this.urlText && this.url);
    }

    get hasBodyContent() {
        return Boolean(this.content || this.hasLink);
    }

    get containerClass() {
        return `local-alert local-alert--${this.type} local-alert--${this.size}`;
    }

    get headerClass() {
        return `local-alert__header local-alert__header--${this.type}`;
    }

    get titleClass() {
        return `local-alert__title local-alert__title--${this.size}`;
    }

    get contentClass() {
        return `local-alert__content local-alert__content--${this.size}`;
    }

    get bodyClass() {
        return `local-alert__body local-alert__body--${this.size}`;
    }

    get ariaLive() {
        return this.type === 'error' || this.type === 'warning' ? 'assertive' : 'polite';
    }

    get ariaLabelComputed() {
        return this.ariaLabel || this.title;
    }

    get iconUrl() {
        switch (this.type) {
            case 'success':
                return this.successIcon;
            case 'warning':
                return this.warningIcon;
            case 'error':
                return this.errorIcon;
            default:
                return this.announcementIcon;
        }
    }

    handleClose() {
        this.isVisible = false;

        this.dispatchEvent(
            new CustomEvent('close', {
                detail: {
                    type: this.type,
                    title: this.title
                }
            })
        );
    }
}
