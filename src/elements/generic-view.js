import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';
import { Pagination } from '../elements/pagination';

export const GenericView = ({ viewClassName, urlName, routeParams }) => {
    let articles = [];
    let template;
    let parsedPageNumber = parseInt(routeParams.page, 10);
    let pageNumber = isNaN(parsedPageNumber) ? 1 : parsedPageNumber;

    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > 30) pageNumber = 30;

    const nextPage = () => {
        pageNumber += 1;
        loadData();
    };

    const previousPage = () => {

        if (pageNumber === 1) return;

        pageNumber = Math.max(1, pageNumber - 1);
        loadData();
    };

    const loadData = () => {
        template.classList.add('loading');

        // Set the page number in address bar
        history.pushState(null, null, `${location.pathname}?page=${pageNumber}`);

        fetch(urls[urlName](pageNumber))
            .then(res => res.json())
            .then(res => {

                let nodeArticles = res.map(itemData => {
                    return ArticleElement({...itemData});
                });

                articles = nodeArticles.slice();
                render();
            });
    };

    const createTemplate = () => {
        return div({
            className: viewClassName
        }, [
            Pagination({
                currentPage: pageNumber,
                onPrevious: () => previousPage(),
                onNext: () => nextPage()
            })
        ].concat(articles));
    };

    function createFirstTemplate() {
        return div({
            className: viewClassName
        }, `<div class="content-loading">Loading content</div>`);
    }

    function render() {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
            template.classList.remove('loading');
        }
    }

    template = createFirstTemplate();

    loadData();

    return template;
};