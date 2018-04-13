// View Container
let container;
let currentView;
let routes = {};

function _cleanContainer() {
    if (currentView && currentView.parentElement) {
        currentView.parentElement.removeChild(currentView);
    }

    container.innerHTML = '';
}

function mountRouteElement(elem, routeParams) {
    _cleanContainer();

    currentView = elem({ container, routeParams });

    container.appendChild(currentView);
}

function getFullUrl(href) {
    return href.split(location.host)[1];
}

/**
 * Returns the location params from url
 * @returns {object}
 */
function getLocationParams() {
    let out = {};

    // Parse the location object
    location.search.substr(1).split('&').forEach(parts => {
        let values = parts.split('=');
        out[values[0]] = values[1];
    });

    return out;
}

export const loadRoute = (url, noPush) => {
    const currentUrl = url || getFullUrl(location.href);
    const currentRoute = currentUrl.split('?')[0];

    const route = routes[currentRoute];
    const navLink = document.querySelector(`nav a[href^="${currentRoute}"]`);
    const currentActiveLink = document.querySelector(`nav a.active`);

    if (route) {
        if (currentActiveLink) currentActiveLink.classList.remove('active');
        if (navLink) navLink.classList.add('active');
        mountRouteElement(route, Object.assign({}, getLocationParams(), { noPush }));
    } else {
        console.log('no route found');
    }
};

window.handleOnClick = function handleOnClick(e) {

    const url = e.target.getAttribute('href');

    e.stopImmediatePropagation();
    e.preventDefault();

    // Push the state
    window.history.pushState({ pathname: url.split('?')[0] }, '', url);
    window.handlePushState(url, true);

    return false;
};

window.handlePushState = loadRoute;
window.addEventListener('popstate', e => {
    if (e.state) {
        loadRoute(e.state.pathname, true);
    }
});

export const initialize = (routesDefinition, containerElement) => {
    routes = routesDefinition;
    container = containerElement;

    // Assign the onclick action
    [].slice.call(document.querySelectorAll('nav .view'))
        .forEach(node => node.onclick = window.handleOnClick);

    loadRoute();
};