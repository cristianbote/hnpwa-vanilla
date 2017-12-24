// View Container
let container;
let currentView;
let routes = {};
let hooks = {
    beforeMount: () => {},
    afterMount: () => {}
};
let anchorTags;

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
    hooks.afterMount();
}

function lookupPathsWithParams(path) {
    let parts = path.split('/');
    let out;

    Object.keys(routes).map(id => {

        if (out) {
            return;
        }

        let savedRouteParts = id.split('/');

        let res = savedRouteParts.map((part, i) => {
            return (part === parts[i] || part[0] === '{') ? 0 : part;
        }).reduce((a, b) => { return a + b });

        if (id !== '/' && res === 0) {
            out = routes[id];
        }
    });

    return out;
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

        hooks.beforeMount(route, currentRoute);
        mountRouteElement(route, { ...getLocationParams(), noPush });
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

export const initialize = (routesDefinition, containerElement, hooksDefinition) => {
    routes = routesDefinition;
    container = containerElement;
    hooks = { ...hooks, ...hooksDefinition };

    // Assign the onclick action
    anchorTags = [].slice.call(document.querySelectorAll('nav .view'));
    anchorTags.forEach(node => node.onclick = window.handleOnClick);

    loadRoute();
};