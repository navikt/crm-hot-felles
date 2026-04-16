import { LightningElement, api } from 'lwc';
import icons from '@salesforce/resourceUrl/aksel_ikoner';

export default class InfoCard extends LightningElement {
    informationIcon = icons + '/aksel-icons/Status/InformationSquare.svg';
    warningIcon = icons + '/aksel-icons/Status/ExclamationMarkTriangle.svg';
    neutralIcon = icons + '/aksel-icons/Statistics_and_math/BulletList.svg';
    dangerIcon = icons + '/aksel-icons/Files_and_application/ClockDashed.svg';

    @api type = 'neutral';
    @api title = '';
    @api content = '';
    @api showIcon = false;
    @api url;

    get cardClass() {
        const validTypes = ['neutral', 'info', 'warning', 'danger'];
        const type = validTypes.includes(this.type) ? this.type : 'neutral';
        return `infoCard infoCard--${type}`;
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
}
