import { div, span, button } from '../core/dom-api';

export const Pagination = (props) => {
    let template;

    const createTemplate = () => {
        return div({ className: 'pagination'}, [
            button({ onclick: props.onPrevious, disabled: props.currentPage < 2 }, '< prev'),
            span({}, `${props.currentPage}`),
            button({ onclick: props.onNext, disabled: !props.hasMore }, 'next >')
        ]);
    };

    const render = () => {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
        }
    };

    template = createTemplate();

    return template;
};