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
    currentView = elem();
    container.appendChild(currentView);
    hooks.afterMount();
}

export const loadRoute = () => {
    let currentRoute = window.location.pathname;
    let route = routes[currentRoute];

    if (route) {
        hooks.beforeMount(route, currentRoute);
        mountRouteElement(route);
    }
};

window.handlePushState = loadRoute;

export const initialize = (routesDefinition, containerElement, hooksDefinition) => {
    routes = routesDefinition;
    container = containerElement;
    hooks = { ...hooks, ...hooksDefinition };

    loadRoute();
};