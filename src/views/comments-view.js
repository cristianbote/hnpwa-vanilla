import { div } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';

export const CommentsView = (props) => {
    let template;

    console.log('props', props);

    const loadData = () => {
        fetch(urls.item(props.routeParams.id))
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    };

    function createTemplate() {
        return div({
            className: 'item-view'
        }, [
            div(null, 'itmre view')
        ]);
    }

    function render() {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
        }
    }

    template = createTemplate();

    loadData();

    return template;
};