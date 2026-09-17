import { createElement } from 'lwc';
import HotExpansionCard from 'c/hot_expansionCard';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

function createComponent(properties = {}) {
    const element = createElement('c-hot-expansion-card', { is: HotExpansionCard });
    Object.assign(element, properties);
    document.body.appendChild(element);
    return element;
}

describe('c-hot-expansion-card', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('uses defaultOpen as the initial uncontrolled state', () => {
        const element = createComponent({ defaultOpen: true });
        const content = element.shadowRoot.querySelector('.expansion-card__content');

        expect(element.open).toBe(true);
        expect(content.getAttribute('data-open')).toBe('true');
        expect(content.getAttribute('aria-hidden')).toBe('false');
    });

    it('toggles uncontrolled state and emits the next state', async () => {
        const element = createComponent();
        const toggleHandler = jest.fn();
        element.addEventListener('toggle', toggleHandler);

        element.shadowRoot.querySelector('.expansion-card__header-button').click();
        await flushPromises();

        expect(element.open).toBe(true);
        expect(toggleHandler).toHaveBeenCalledWith(
            expect.objectContaining({ detail: { open: true } })
        );
    });

    it('emits the next state without changing controlled state', () => {
        const element = createComponent({ open: false });
        const toggleHandler = jest.fn();
        element.addEventListener('toggle', toggleHandler);

        element.shadowRoot.querySelector('.expansion-card__header-button').click();

        expect(element.open).toBe(false);
        expect(toggleHandler).toHaveBeenCalledWith(
            expect.objectContaining({ detail: { open: true } })
        );
    });
});
