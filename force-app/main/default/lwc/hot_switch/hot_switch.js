import { LightningElement, api } from 'lwc';

let nextId = 0;

function normalizeBoolean(value) {
    return value === true || value === 'true' || value === '';
}

export default class HotSwitch extends LightningElement {
    _checked = false;
    _defaultChecked = false;
    _id = `hot-switch-${++nextId}`;

    @api label = '';
    @api description = '';
    @api name;
    @api value;
    @api inputId;
    @api size = 'medium';
    @api position = 'left';
    @api ariaLabel;
    @api ariaDescribedby;
    @api readOnlyTitle = 'Skrivebeskyttet';

    @api
    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = normalizeBoolean(value);
    }

    @api
    get defaultChecked() {
        return this._defaultChecked;
    }

    set defaultChecked(value) {
        this._defaultChecked = normalizeBoolean(value);
        this._checked = this._defaultChecked;
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get loading() {
        return this._loading;
    }

    set loading(value) {
        this._loading = normalizeBoolean(value);
    }

    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api
    get hideLabel() {
        return this._hideLabel;
    }

    set hideLabel(value) {
        this._hideLabel = normalizeBoolean(value);
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    _disabled = false;
    _loading = false;
    _readOnly = false;
    _hideLabel = false;
    _required = false;

    get computedInputId() {
        return this.inputId || this._id;
    }

    get computedAriaDescribedby() {
        return this.ariaDescribedby || null;
    }

    get normalizedSize() {
        return this.size === 'small' ? 'small' : 'medium';
    }

    get normalizedPosition() {
        return this.position === 'right' ? 'right' : 'left';
    }

    get isReadonly() {
        return this.readOnly;
    }

    get isInputDisabled() {
        return this.disabled || this.loading;
    }

    get ariaReadonly() {
        return this.readOnly ? 'true' : null;
    }

    get switchClass() {
        const classes = [
            'aksel-switch',
            `aksel-switch--${this.normalizedSize}`,
            `aksel-switch--${this.normalizedPosition}`
        ];

        if (this.loading) {
            classes.push('aksel-switch--loading');
        }

        if (this.isInputDisabled) {
            classes.push('aksel-switch--disabled');
        }

        if (this.readOnly) {
            classes.push('aksel-switch--readonly');
        }

        if (this.hideLabel) {
            classes.push('aksel-switch--standalone');
        }

        return classes.join(' ');
    }

    get contentClass() {
        const classes = ['aksel-switch__content'];

        if (this.hideLabel) {
            classes.push('aksel-sr-only');
        }

        if (this.description && !this.hideLabel) {
            classes.push('aksel-switch--with-description');
        }

        return classes.join(' ');
    }

    get labelClass() {
        return `aksel-switch__label aksel-body-short aksel-body-short--${this.normalizedSize}`;
    }

    get descriptionClass() {
        return `aksel-form-field__subdescription aksel-switch__description aksel-body-short aksel-body-short--${this.normalizedSize}`;
    }

    get showLoader() {
        return this.loading;
    }

    get showSmallCheck() {
        return this.checked && !this.loading && this.normalizedSize === 'small';
    }

    get showCheck() {
        return this.checked && !this.loading;
    }

    get loaderClass() {
        const classes = ['aksel-switch__loader'];

        if (this.checked) {
            classes.push('aksel-switch__loader--checked');
        }

        if (this.normalizedSize === 'small') {
            classes.push('aksel-switch__loader--small');
        }

        return classes.join(' ');
    }

    handleClick(event) {
        if (this.readOnly) {
            event.preventDefault();
        }
    }

    handleChange(event) {
        event.stopPropagation();

        if (this.readOnly) {
            event.target.checked = this.checked;
            return;
        }

        this.updateChecked(event.target.checked);
    }

    handleKeyDown(event) {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.readOnly) {
            event.target.checked = this.checked;
            return;
        }

        const checked = !this.checked;
        event.target.checked = checked;
        this.updateChecked(checked);
    }

    updateChecked(checked) {
        this._checked = checked;
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: {
                    checked: this.checked,
                    value: this.value
                }
            })
        );
    }
}
