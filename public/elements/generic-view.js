import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';
import { Pagination } from '../elements/pagination';

const createPagination = (props) => (
    Pagination({
        currentPage: props.pageNumber,
        onPrevious: () => props.previousPage(),
        onNext: () => props.nextPage(),
        hasMore: props.hasMore
    })
);

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
        const hasMore = articles.length === 30;
        const paginationComponent = () => createPagination({
            pageNumber,
            previousPage,
            nextPage,
            hasMore
        });

        return div({
            className: viewClassName
        }, [
            div({
                className: 'wrapper'
            },
                [paginationComponent()]
                    .concat([
                        div({ className: "donut" })
                    ])
                    .concat(articles)
                    .concat(paginationComponent())
            )
        ]);
    };

    function createFirstTemplate() {

        // Set the title
        document.querySelector('title').innerText = 'Vanilla Hacker News PWA';

        return div({
            className: viewClassName
        }, `<div class="content-loading">Loading content</div>`);
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