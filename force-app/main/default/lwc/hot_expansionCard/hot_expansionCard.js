import { LightningElement, api } from 'lwc';

let nextCardId = 0;

export default class Hot_expansionCard extends LightningElement {
    @api title = '';
    @api description = '';
    @api size = 'medium';
    @api color = 'neutral';
    @api ariaLabel;
    @api defaultOpen = false;

    _open = false;
    _isControlled = false;
    cardId = `hot-expansion-card-${nextCardId++}`;

    connectedCallback() {
        if (!this._isControlled) {
            this._open = this.isDefaultOpen;
        }
    }

    @api
    get open() {
        return this._open;
    }

    set open(value) {
        this._isControlled = true;
        this._open = value === true || value === 'true';
    }

    get isDefaultOpen() {
        return this.defaultOpen === true || this.defaultOpen === 'true';
    }

    get isOpen() {
        return this.open;
    }

    get cardClass() {
        const validSizes = ['medium', 'small'];
        const validColors = [
            'neutral',
            'accent',
            'info',
            'success',
            'warning',
            'danger',
            'brand-magenta',
            'brand-beige',
            'brand-blue',
            'meta-purple',
            'meta-lime'
        ];
        const cardSize = validSizes.includes(this.size) ? this.size : 'medium';
        const cardColor = validColors.includes(this.color) ? this.color : 'neutral';

        return `expansion-card expansion-card--${cardSize} expansion-card--${cardColor}`;
    }

    get contentId() {
        return `${this.cardId}-content`;
    }

    get contentHidden() {
        return !this.isOpen;
    }

    get sectionAriaLabel() {
        return this.ariaLabel || this.title;
    }

    handleToggle() {
        const nextOpen = !this.isOpen;

        if (!this._isControlled) {
            this._open = nextOpen;
        }

        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: { open: nextOpen },
                bubbles: true,
                composed: true
            })
        );
    }
}
