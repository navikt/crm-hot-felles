import { LightningElement, api } from 'lwc';

const TOGGLE_SELECTED_ICON_PATH =
    'M10 18.125C14.4873 18.125 18.125 14.4873 18.125 10C18.125 5.51269 14.4873 1.875 10 1.875C5.51269 1.875 1.875 5.51269 1.875 10C1.875 14.4873 5.51269 18.125 10 18.125ZM14.128 7.72904C14.3695 7.44357 14.3339 7.01635 14.0485 6.7748C13.763 6.53326 13.3358 6.56886 13.0942 6.85432L8.60428 12.1606L6.41627 9.97263C6.15185 9.70822 5.72315 9.70822 5.45873 9.97263C5.19431 10.2371 5.19431 10.6658 5.45873 10.9302L8.16706 13.6385C8.30095 13.7724 8.48479 13.8441 8.67397 13.8362C8.86316 13.8284 9.0404 13.7416 9.16271 13.5971L14.128 7.72904Z';
const TOGGLE_UNSELECTED_ICON_PATH =
    'M10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125ZM1.875 10C1.875 5.51269 5.51269 1.875 10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10Z';

export default class hot_Chips extends LightningElement {
    _itemsInput = [];
    _chips = [];
    _size = 'medium';

    @api
    set size(value) {
        this._size = value === 'small' ? 'small' : 'medium';
    }

    get size() {
        return this._size;
    }

    @api
    set items(value) {
        this._itemsInput = value;
        this._chips = this.normalizeItems(value);
    }

    get items() {
        return this._itemsInput;
    }

    get listClassName() {
        return `chips chips--${this.size}`;
    }

    get renderedChips() {
        return this._chips;
    }

    handleChipClick(event) {
        const index = Number(event.currentTarget.dataset.index);
        const chip = this._chips[index];
        if (!chip || chip.disabled) {
            return;
        }

        const detail = {
            index,
            chip: this.toPublicChip(chip)
        };

        this.dispatchEvent(new CustomEvent('chipclick', { detail }));

        if (chip.type === 'toggle') {
            this.dispatchEvent(
                new CustomEvent('toggle', {
                    detail: {
                        ...detail,
                        selected: chip.selected,
                        nextSelected: !chip.selected
                    }
                })
            );
            return;
        }

        this.dispatchEvent(new CustomEvent('delete', { detail }));
    }

    normalizeItems(value) {
        const source = this.parseItems(value);
        return source.map((item, index) => this.normalizeChip(item, index));
    }

    parseItems(value) {
        if (Array.isArray(value)) {
            return value;
        }

        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                return [];
            }
        }

        return [];
    }

    normalizeChip(item, index) {
        const raw = item || {};
        const label = this.getChipLabel(raw, index);
        const color = raw['data-color'] || raw.dataColor || this.variantToColor(raw.variant);
        const isRemovable = raw.type === 'removable' || raw.removable === true;
        const type = isRemovable ? 'removable' : 'toggle';
        const checkmark = raw.checkmark !== false;
        const selected = Boolean(raw.selected);
        const disabled = Boolean(raw.disabled);
        const key = raw.id || raw.value || `${type}-${label}-${index}`;

        return {
            ...raw,
            key,
            index,
            type,
            isToggle: type === 'toggle',
            isRemovable: type === 'removable',
            label,
            color,
            selected,
            disabled,
            checkmark,
            showToggleCheckmark: type === 'toggle' && checkmark,
            dataPressed: selected ? 'true' : 'false',
            ariaPressed: type === 'toggle' ? (selected ? 'true' : 'false') : null,
            ariaLabel: type === 'removable' ? `${label} fjern` : null,
            className: this.getChipClassName(type, selected, checkmark),
            iconPath: selected ? TOGGLE_SELECTED_ICON_PATH : TOGGLE_UNSELECTED_ICON_PATH,
            removablePath:
                'M15.5303 5.53033C15.8232 5.23744 15.8232 4.76256 15.5303 4.46967C15.2374 4.17678 14.7626 4.17678 14.4697 4.46967L10 8.93934L5.53033 4.46967C5.23744 4.17678 4.76256 4.17678 4.46967 4.46967C4.17678 4.76256 4.17678 5.23744 4.46967 5.53033L8.93934 10L4.46967 14.4697C4.17678 14.7626 4.17678 15.2374 4.46967 15.5303C4.76256 15.8232 5.23744 15.8232 5.53033 15.5303L10 11.0607L14.4697 15.5303C14.7626 15.8232 15.2374 15.8232 15.5303 15.5303C15.8232 15.2374 15.8232 14.7626 15.5303 14.4697L11.0607 10L15.5303 5.53033Z'
        };
    }

    getChipLabel(item, index) {
        if (typeof item.children === 'string' && item.children.length > 0) {
            return item.children;
        }
        if (typeof item.label === 'string' && item.label.length > 0) {
            return item.label;
        }
        if (typeof item.text === 'string' && item.text.length > 0) {
            return item.text;
        }
        if (item.value !== undefined && item.value !== null) {
            return String(item.value);
        }
        return `Chip ${index + 1}`;
    }

    getChipClassName(type, selected, checkmark) {
        const classNames = ['chip'];
        if (type === 'toggle') {
            classNames.push('chip--toggle');
            if (checkmark) {
                classNames.push('chip--with-checkmark');
            }
            if (selected) {
                classNames.push('chip--selected');
            }
            return classNames.join(' ');
        }

        classNames.push('chip--removable');
        return classNames.join(' ');
    }

    toPublicChip(chip) {
        return {
            key: chip.key,
            type: chip.type,
            label: chip.label,
            value: chip.value,
            selected: chip.selected,
            disabled: chip.disabled,
            checkmark: chip.checkmark,
            color: chip.color
        };
    }

    variantToColor(variant) {
        switch (variant) {
            case 'action':
                return 'accent';
            case 'neutral':
                return 'neutral';
            default:
                return undefined;
        }
    }
}
