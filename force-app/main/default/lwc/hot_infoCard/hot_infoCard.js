import { LightningElement, api } from 'lwc';
import icons from '@salesforce/resourceUrl/aksel_ikoner';

export default class InfoCard extends LightningElement {
    informationIcon = icons + '/Status/InformationSquare.svg';
    warningIcon = icons + '/Status/ExclamationmarkTriangle.svg';
    neutralIcon = icons + '/Statistics_and_math/BulletList.svg';
    dangerIcon = icons + '/Files_and_application/ClockDashed.svg';

    @api type = 'neutral';
    @api title = '';
    @api content = '';
    @api showIcon = false;
    @api url;
    @api urlText;

    get cardClass() {
        const validTypes = ['neutral', 'info', 'warning', 'danger'];
        const type = validTypes.includes(this.type) ? this.type : 'neutral';
        return `infoCard infoCard--${type}`;
    }
    get headerClass() {
        return `infoCard__header ${this.isEitherContentOrUrl ? 'infoCard__header--with-border' : ''}`;
    }

    // Determines whether title should be normal or bold based on content presence
    get titleClass() {
        return this.hasContent ? 'infoCard__title' : 'infoCard__title infoCard__title--normal';
    }

    get shouldShowIcon() {
        return this.showIcon === true || this.showIcon === 'true';
    }

    get icon() {
        switch (this.type) {
            case 'neutral':
                return this.neutralIcon;
            case 'info':
                return this.informationIcon;
            case 'warning':
                return this.warningIcon;
            case 'danger':
                return this.dangerIcon;
            default:
                return this.neutralIcon;
        }
    }
    get isEitherContentOrUrl() {
        return this.hasContent || this.hasUrl;
    }

    get hasContent() {
        return typeof this.content === 'string' ? this.content.trim().length > 0 : Boolean(this.content);
    }

    get hasUrl() {
        return typeof this.url === 'string' ? this.url.trim().length > 0 : Boolean(this.url);
    }
}
