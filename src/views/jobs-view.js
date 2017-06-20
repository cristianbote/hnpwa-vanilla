import { div, button } from '../core/dom-api';
import { getData } from '../core/database';
import { filledArray } from '../core/filled-array';
import { ArticleElement } from '../elements/article-element';

export const JobsView = () => {
    let count = 30;
    let articles = filledArray(30, ArticleElement);
    let template;
    let pageNumber = 0;
    let cache;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const loadData = () => {
        getData('jobstories', pageNumber * count, (pageNumber + 1) * count)
            .then(res => {
                let nodeArticles = res.map(itemData => {
                    return ArticleElement({...itemData});
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

    const createTemplate = () => {
        if (!!cache && cache.length) {
            let cached = cache.slice(0, count * pageNumber);
            articles = cached.map(id => ArticleElement({ id }));
        }

        return div({
            className: 'ask-view'
        }, articles.concat([
            button({
                className: 'more-items',
                onclick: nextPage
            }, 'Load more items')
        ]));
    };

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