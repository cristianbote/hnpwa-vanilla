import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { filledArray } from '../core/filled-array';
import { ArticleElement } from '../elements/article-element';

export const NewsView = () => {
    let count = 30;
    let articles = filledArray(30, ArticleElement);
    let template;
    let pageNumber = 1;
    let cache;

    const nextPage = () => {
        pageNumber += 1;
        render();
    };

    const previousPage = () => {
        pageNumber -= 1;
        pageNumber = Math.max(pageNumber, 1);

        // Load the data afterwards
        render();
    };

    const loadData = () => {
        fetch(urls.new(pageNumber))
            .then(res => res.json())
            .then(res => {
                cache = res;
                render();
            });
    };

    const createTemplate = () => {
        if (!!cache && cache.length) {
            let cached = cache.slice(0, count * pageNumber);
            articles = cached.map(id => ArticleElement({ id }));
        }

        return div({
            className: 'new-view'
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