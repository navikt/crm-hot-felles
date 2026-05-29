import { LightningElement, api } from 'lwc';
import icons from '@salesforce/resourceUrl/aksel_ikoner';

export default class LocalAlert extends LightningElement {
    announcementIcon = icons + '/Media/MegaphoneSpeakingFillWhite.svg';
    successIcon = icons + '/Status/CheckmarkCircleFillWhite.svg';
    warningIcon = icons + '/Status/ExclamationmarkTriangleFillWhite.svg';
    errorIcon = icons + '/Status/XMarkOctagonFillWhite.svg';

    @api type = 'announcement'; // type can be 'announcement', 'success', 'warning', or 'error'
    @api title = '';
    @api content = '';
    @api contentView = 'show'; // contentView default is show, to hide content, set to 'title-only'
    @api urlText = '';
    @api url = '';
    @api ariaLabel = '';
    @api size = 'medium'; // Size can be 'small' or 'medium'

    isVisible = true;

    get hasLink() {
        return Boolean(this.urlText && this.url);
    }

    get hasBodyContent() {
        return Boolean(this.content || this.hasLink);
    }

    get shouldShowBody() {
        return this.contentView !== 'title-only' && this.hasBodyContent;
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

    get linkClass() {
        return `local-alert__link local-alert__link--${this.size}`;
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

    get screenReaderSectionLabel() {
        switch (this.type) {
            case 'success':
                return 'Suksess';
            case 'warning':
                return 'Advarsel';
            case 'error':
                return 'Feil';
            default:
                return 'Kunngjøring';
        }
    }

    get screenReaderTitleLabel() {
        switch (this.type) {
            case 'success':
                return `Suksess: ${this.title}`;
            case 'warning':
                return `Advarsel: ${this.title}`;
            case 'error':
                return `Feil: ${this.title}`;
            default:
                return `Kunngjøring: ${this.title}`;
        }
    }
}
