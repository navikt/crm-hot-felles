import { LightningElement, api } from 'lwc';

const COLORS = [
    'accent',
    'neutral',
    'brand-beige',
    'brand-blue',
    'brand-magenta',
    'info',
    'success',
    'warning',
    'danger',
    'meta-lime',
    'meta-purple'
];

const VARIANTS = [
    'outline',
    'moderate',
    'strong',

    // Legacy variants supported by Aksel
    'warning',
    'warning-filled',
    'warning-moderate',
    'error',
    'error-filled',
    'error-moderate',
    'info',
    'info-filled',
    'info-moderate',
    'success',
    'success-filled',
    'success-moderate',
    'neutral',
    'neutral-filled',
    'neutral-moderate',
    'alt1',
    'alt1-filled',
    'alt1-moderate',
    'alt2',
    'alt2-filled',
    'alt2-moderate',
    'alt3',
    'alt3-filled',
    'alt3-moderate'
];

const LEGACY_COLOR_MAP = {
    warning: 'warning',
    'warning-filled': 'warning',
    'warning-moderate': 'warning',

    error: 'danger',
    'error-filled': 'danger',
    'error-moderate': 'danger',

    info: 'info',
    'info-filled': 'info',
    'info-moderate': 'info',

    success: 'success',
    'success-filled': 'success',
    'success-moderate': 'success',

    neutral: 'neutral',
    'neutral-filled': 'neutral',
    'neutral-moderate': 'neutral',

    alt1: 'meta-purple',
    'alt1-filled': 'meta-purple',
    'alt1-moderate': 'meta-purple',

    alt2: 'meta-lime',
    'alt2-filled': 'meta-lime',
    'alt2-moderate': 'meta-lime',

    alt3: 'info',
    'alt3-filled': 'info',
    'alt3-moderate': 'info'
};

export default class Tag extends LightningElement {
    /**
     * Text shown inside the tag.
     *
     * If you use the default slot, you don't need to set this.
     */
    @api label;

    /**
     * outline | moderate | strong
     *
     * Legacy variants are also supported.
     */
    @api variant = 'outline';

    /**
     * medium | small | xsmall
     */
    @api size = 'medium';

    /**
     * Aksel color.
     */
    @api color;

    /**
     * Optional aria-label.
     */
    @api ariaLabel;

    get hasIcon() {
        return this.template.querySelector('[slot="icon"]') !== null;
    }

    get tagClass() {
        return ['tag', `tag--${this.normalizedSize}`].join(' ');
    }

    get normalizedSize() {
        if (['medium', 'small', 'xsmall'].includes(this.size)) {
            return this.size;
        }

        return 'medium';
    }

    get resolvedVariant() {
        if (this.variant === 'outline' || this.variant === 'moderate' || this.variant === 'strong') {
            return this.variant;
        }

        if (this.variant.endsWith('-filled')) {
            return 'strong';
        }

        if (this.variant.endsWith('-moderate')) {
            return 'moderate';
        }

        return 'outline';
    }

    get resolvedColor() {
        // Explicit color takes precedence, just like data-color
        // in the React implementation.
        if (this.color && COLORS.includes(this.color)) {
            return this.color;
        }

        return LEGACY_COLOR_MAP[this.variant] || 'neutral';
    }

    renderedCallback() {
        // LWC doesn't have React's children/icon API.
        // The slot is used for optional icons.
        this.updateIconVisibility();
    }

    updateIconVisibility() {
        const icon = this.template.querySelector('.tag__icon');

        if (!icon) {
            return;
        }

        const slot = icon.querySelector('slot');

        if (!slot) {
            return;
        }

        const assignedNodes = slot.assignedNodes();

        icon.hidden = assignedNodes.length === 0;
    }
}
