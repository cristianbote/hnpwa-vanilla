import { div, button, footer } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';

const footerComponent = footer(null, `
        <a href="https://github.com/cristianbote/hnpwa-vanilla" target="_blank">
            <img src="https://github.com/favicon.ico" alt="Github" width="16" />
        </a>`);

export const GenericView = ({ viewClassName, urlName }) => {
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
            }, 'Load more items'),
            footerComponent
        ]));
    };

    function createFirstTemplate() {
        return div({
            className: viewClassName
        }, `<div class="content-loading">Loading content</div>${footerComponent.outerHTML}`);
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