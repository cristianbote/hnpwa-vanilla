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

export const loadRoute = () => {
    let currentRoute = window.location.pathname;
    let route = routes[currentRoute];
    let navLink = document.querySelector(`nav a[href="${currentRoute}"`);
    let currentActiveLink = document.querySelector(`nav a.active`);

    if (route) {
        if (currentActiveLink) currentActiveLink.classList.remove('active');
        if (navLink) navLink.classList.add('active');

        hooks.beforeMount(route, currentRoute);
        mountRouteElement(route, getLocationParams());
    } else {
        console.log('no route found');
    }
};

window.handleOnClick = function handleOnClick(e) {

    let path = e.target.getAttribute('href');

    e.stopImmediatePropagation();
    e.preventDefault();

    // Push the state
    window.history.pushState(null, null, path);
    window.handlePushState(path);

    return false;
};

window.handlePushState = loadRoute;

export const initialize = (routesDefinition, containerElement, hooksDefinition) => {
    routes = routesDefinition;
    container = containerElement;
    hooks = { ...hooks, ...hooksDefinition };

    // Assign the onclick action
    anchorTags = [].slice.call(document.querySelectorAll('nav .view'));
    anchorTags.forEach(node => node.onclick = window.handleOnClick);

    loadRoute();
};