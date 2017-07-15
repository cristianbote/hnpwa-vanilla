import { div, button } from '../core/dom-api';
import { urls } from '../urls';
import { ArticleElement } from '../elements/article-element';
import { Pagination } from '../elements/pagination';

export const GenericView = ({ viewClassName, urlName }) => {
    let articles = [];
    let template;
    let pageNumber = 1;
    let countPerPage = 30;
    let totalPages;

    const nextPage = () => {

        if (pageNumber === totalPages) return;

        pageNumber = Math.min(totalPages, pageNumber + 1);
        loadData();
    };

    const previousPage = () => {

        if (pageNumber === 1) return;

        pageNumber = Math.max(1, pageNumber - 1);
        loadData();
    };

    const totalItemsUrl = `https://hacker-news.firebaseio.com/v0/${urlName}.json`;

    const loadData = () => {

        if (!totalPages) {

            fetch(totalItemsUrl)
                .then(res => res.json())
                .then(res => {
                    totalPages = Math.ceil(res.length / countPerPage);
                    loadItemsData();
                });
        } else {
            loadItemsData();
        }
    };

    const loadItemsData = () => {
        articles = [
            div({}, 'Loading items')
        ];
        render();

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
                totalPages: totalPages,
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
        }
    }

    template = createFirstTemplate();

    loadData();

    return template;
};