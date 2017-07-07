import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';

export const GenericView = ({ viewClassName, urlName }) => {
    let count = 30;
    let articles = [];
    let template;
    let pageNumber = 1;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const loadData = () => {

        fetch(urls[urlName](pageNumber))
            .then(res => res.json())
            .then(res => {

                let nodeArticles = res.map(itemData => {
                    return ArticleElement({...itemData});
                });

                if (pageNumber === 1) {
                    articles = nodeArticles.slice();
                    render();
                } else {
                    let refChild = template.querySelector('.more-items');
                    nodeArticles.forEach(node => template.insertBefore(node, refChild));
                }
            });
    };

    const createTemplate = () => {
        return div({
            className: viewClassName
        }, articles.concat([
            button({
                className: 'more-items',
                onclick: nextPage
            }, 'Load more items')
        ]));
    };

    function createFirstTemplate() {
        return div({
            className: viewClassName
        }, '<div class="content-loading">Loading content</div>');
    }

    function render() {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
        }
    }

    template = createFirstTemplate();

    loadData();

    return template;
};