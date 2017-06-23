import { div, button } from '../core/dom-api';
import { getData } from '../core/database';
import { filledArray } from '../core/filled-array';
import { ArticleElement } from '../elements/article-element';

export const TopView = () => {
    let template;
    let count = 30;
    let articles = filledArray(count, ArticleElement);
    let pageNumber = 0;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const loadData = () => {
        getData('topstories', pageNumber * count, (pageNumber + 1) * count)
            .then(res => {
                let nodeArticles = res.map(id => {
                    return ArticleElement({ id });
                });

                if (pageNumber === 0) {
                    articles = nodeArticles.slice();
                    render();
                } else {
                    let refChild = template.querySelector('.more-items');
                    nodeArticles.forEach(node => template.insertBefore(node, refChild));
                }
            });
    };

    function createTemplate() {
        return div({
            className: 'top-view'
        }, articles.concat([
            button({
                className: 'more-items',
                onclick: nextPage
            }, 'Load more items')
        ]));
    }

    function render() {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            let frag = document.createDocumentFragment();

            frag.appendChild(newTemplate);

            template.parentElement.replaceChild(frag, template);
            template = newTemplate;
        }
    }

    template = createTemplate();

    loadData();

    return template;
};