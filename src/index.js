import {
    div, article, h1, span, a
} from './dom/api';

import { Nav } from './elements/nav';

const NewView = () => {
    return div({
        className: 'new-view'
    }, [
        ArticleElement()
    ]);
};
const TopView = () => {
    return div({
        className: 'top-view'
    }, [
        ArticleElement(),
        ArticleElement(),
    ]);
};

const ArticleElement = () => {
    return article({}, [
        h1(null, ['As US prepares to gut net neutrality', span({ className: 'basedomain' },'(google.com)')]),
        div({ className: 'details'}, [
            a({ className: 'author'}, 'slacka'),
            div({ className: 'stars'}, '1 ★')
        ]),
        div({ className: 'subdetails'}, [
            div({ className: 'elapsed'}, '2 hours ago'),
            a({ className: 'comments'}, 'discuss')
        ])
    ]);
};

// References
const AppNode = document.getElementById('app');
const HeaderNode = AppNode.querySelector('header');
const Routes = {
    '/': NewView,
    '/top': TopView,
};

// View Container
let container = document.querySelector('.view-container');
let currentView;
let navElement;

function _cleanContainer() {
    if (currentView) {
        currentView.parentElement.removeChild(currentView);
    }
    container.innerHTML = '';
}

function mountRouteElement(elem) {
    _cleanContainer();
    currentView = elem();
    container.appendChild(currentView);
}

function loadRoute() {
    let currentRoute = window.location.pathname;
    let route = Routes[currentRoute];

    if (!navElement) {
        navElement = Nav({ currentRoute });
        HeaderNode.appendChild(navElement);
    }

    if (route) {
        mountRouteElement(route);
    }
}

window.handlePushState = loadRoute;

document.addEventListener('DOMContentLoaded', loadRoute, false);