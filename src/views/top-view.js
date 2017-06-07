import { div } from '../core/dom-api';
import { urls } from '../urls';
import { filledArray } from '../core/filled-array';
import { ArticleElement } from '../elements/article-element';

export const TopView = () => {
    let template;
    let count = 30;
    let articles = filledArray(count, ArticleElement);
    let pageNumber = 1;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const previousPage = () => {
        pageNumber -= 1;
        pageNumber = Math.max(pageNumber, 1);

        // Load the data afterwards
        loadData();
    };

    const loadData = () => {
        fetch(urls.tops(pageNumber))
            .then(res => res.json())
            .then(res => {
                articles = res.map(itemData => {
                    return ArticleElement({ ...itemData  });
                });

                render();
            });
    };

    function createTemplate() {
        return div({
            className: 'top-view'
        }, articles);
    }

    function render() {
        template.parentElement.replaceChild(createTemplate(), template);
    }

    template = createTemplate();

    loadData();

    return template;
};