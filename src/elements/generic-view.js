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
        const noPush = routeParams.noPush;

        template.classList.add('loading');

        if (!noPush) {
            const currentPath = location.pathname;
            const url = `${currentPath}?page=${pageNumber}`;

            // Set the page number in address bar
            history.pushState({url, pathname: currentPath}, '', url);
        }

        fetch(urls[urlName](pageNumber))
            .then(res => res.json())
            .then(res => {

                let nodeArticles = res.map(itemData => {
                    return ArticleElement(JSON.parse(JSON.stringify(itemData)));
                });

                articles = nodeArticles.slice();

                render();
            })
            .catch(e => {
                console.log('You are offline');
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
                onNext: () => nextPage(),
                hasMore: articles.length === 30
            }),
            div({
                className: 'wrapper'
            }, articles)
        ]);
    };

    function createFirstTemplate() {

        // Set the title
        document.querySelector('title').innerText = 'Vanilla Hacker News PWA';

        return div({
            className: viewClassName
        }, `<div class="content-loading">Loading content</div>`);
    }

    function createOfflineTemplate() {
        return div({
            className: viewClassName
        }, `<div class="offline-content">Failed to fetch new data. You might be offline and the data is not in cache yet.<div class="logo-icon"></div></div>`);
    }

    function render(renderFunc) {
        if (!!template.parentElement) {
            let newTemplate = renderFunc ? renderFunc() : createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
            template.classList.remove('loading');
        }
    }

    template = createFirstTemplate();

    loadData();

    return template;
};