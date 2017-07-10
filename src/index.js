import { initialize } from './core/router';
import { GenericView } from './elements/generic-view';
import { CommentsView } from './views/comments-view';

const routes = {
    '/': () => GenericView({
        viewClassName: 'top-view',
        urlName: 'topstories'
    }),
    '/news': () => GenericView({
        viewClassName: 'news-view',
        urlName: 'newstories'
    }),
    '/show': () => GenericView({
        viewClassName: 'show-view',
        urlName: 'showstories'
    }),
    '/ask': () => GenericView({
        viewClassName: 'ask-view',
        urlName: 'askstories'
    }),
    '/jobs': () => GenericView({
        viewClassName: 'jobs-view',
        urlName: 'jobstories'
    }),

    '/item': CommentsView
};

const viewContainer = document.querySelector('.view-container');

const hooks = {};

// Initialize the app
initialize(routes, viewContainer, hooks);
