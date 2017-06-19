import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { filledArray } from '../core/filled-array';
import { ArticleElement } from '../elements/article-element';

export const CommentsView = (props) => {
    let template;

    const loadData = () => {
        // fetch(urls.tops(pageNumber))
        //     .then(res => res.json())
        //     .then(res => {
        //         let nodeArticles = res.map(itemData => {
        //             return ArticleElement({...itemData});
        //         });
        //
        //         if (pageNumber === 1) {
        //             articles = nodeArticles.slice();
        //             render();
        //         } else {
        //             let refChild = template.querySelector('.more-items');
        //             nodeArticles.forEach(node => template.insertBefore(node, refChild));
        //         }
        //     });
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