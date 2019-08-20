import { initialize } from './core/router';
import { GenericView } from './elements/generic-view';
import { CommentsView } from './views/comments-view';

const createGenericView = (viewClassName, urlName) => {
    return (props) => {
        return GenericView({ viewClassName, urlName, container: props.container, routeParams: props.routeParams });
    }
};

const routes = {
    '/': createGenericView('top-view', 'topstories'),
    '/news': createGenericView('news-view', 'newstories'),
    '/show': createGenericView('show-view','showstories'),
    '/ask': createGenericView('ask-view', 'askstories'),
    '/jobs': createGenericView('jobs-view', 'jobstories'),
    '/item': CommentsView
};

const viewContainer = document.querySelector('.view-container');

// Initialize the app
initialize(routes, viewContainer);
