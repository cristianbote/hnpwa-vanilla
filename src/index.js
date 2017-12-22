import 'unfetch/polyfill';

import { initialize } from './core/router';
import { GenericView } from './elements/generic-view';
import { CommentsView } from './views/comments-view';

const defineView = (viewClassName, urlName) => {
    return (props) => {
        return GenericView({ viewClassName, urlName, ...props });
    }
};

const routes = {
    '/': defineView('top-view', 'topstories'),
    '/news': defineView('news-view', 'newstories'),
    '/show': defineView('show-view','showstories'),
    '/ask': defineView('ask-view', 'askstories'),
    '/jobs': defineView('jobs-view', 'jobstories'),
    '/item': CommentsView
};

const viewContainer = document.querySelector('.view-container');

const hooks = {};

// Initialize the app
initialize(routes, viewContainer, hooks);
