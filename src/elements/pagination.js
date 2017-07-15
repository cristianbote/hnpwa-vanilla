import { div, span, button } from '../core/dom-api';

export const Pagination = (props) => {
    let template;

    const createTemplate = () => {
        return div({ className: 'pagination'}, [
            button({ onclick: props.onPrevious }, '< prev'),
            span({}, `${props.currentPage} / ${props.totalPages}`),
            button({ onclick: props.onNext }, 'next >')
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