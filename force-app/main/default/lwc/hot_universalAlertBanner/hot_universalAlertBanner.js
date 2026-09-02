import { LightningElement, api } from 'lwc';
import icons from '@salesforce/resourceUrl/aksel_ikoner';

export default class Hot_universalAlertBanner extends LightningElement {
    @api type = 'Info';
    @api message = '';
    @api closeButton = false;
    @api showIcon = false;
    @api textSize = 'small';

    announcementIcon = icons + '/Media/MegaphoneSpeakingFillWhite.svg';
    successIcon = icons + '/Status/CheckmarkCircleFillWhite.svg';
    warningIcon = icons + '/Status/ExclamationmarkTriangleFill.svg';
    errorIcon = icons + '/Status/XMarkOctagonFillWhite.svg';

    isClosed = false;

    get normalizedType() {
        const normalized = (this.type || 'info').toLowerCase();
        if (normalized === 'warning' || normalized === 'error' || normalized === 'info') {
            return normalized;
        }
        return 'info';
    }

    get isVisible() {
        return !this.isClosed;
    }

    get shouldShowIcon() {
        return this.showIcon !== false && this.showIcon !== 'false';
    }

    get textSizeClass() {
        return `banner__content--${this.textSize}`;
    }


    get resolvedIconName() {
        if (this.iconName) {
            return this.iconName;
        }

        switch (this.normalizedType) {
            case 'warning':
                return 'utility:warning';
            case 'error':
                return 'utility:error';
            default:
                return 'utility:info';
        }
    }

    get showCloseButton() {
        return this.closeButton !== false && this.closeButton !== 'false';
    }

    get bannerClass() {
        return `banner banner--${this.normalizedType}`;
    }

    get iconUrl() {
        switch (this.normalizedType) {
            case 'warning':
                return this.warningIcon;
            case 'error':
                return this.errorIcon;
            default:
                return this.announcementIcon;
        }
    }

    handleClose() {
        this.isClosed = true;
    }
}
