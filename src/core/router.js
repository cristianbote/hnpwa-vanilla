// View Container
let container;
let currentView;
let routes = {};
let hooks = {
    beforeMount: () => {},
    afterMount: () => {}
};

function _cleanContainer() {
    if (currentView && currentView.parentElement) {
        currentView.parentElement.removeChild(currentView);
    }

    container.innerHTML = '';
}

function mountRouteElement(elem) {
    _cleanContainer();

    currentView = elem(container);

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

export const loadRoute = () => {
    let currentRoute = window.location.pathname;
    let route = routes[currentRoute];

    if (route) {
        hooks.beforeMount(route, currentRoute);
        mountRouteElement(route);
    } else {
        console.log('no route found');
    }
};

window.handlePushState = loadRoute;

export const initialize = (routesDefinition, containerElement, hooksDefinition) => {
    routes = routesDefinition;
    container = containerElement;
    hooks = { ...hooks, ...hooksDefinition };

    loadRoute();
};