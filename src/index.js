import { initialize } from './core/router';
import { NewsView } from './views/news-view';
import { TopView } from './views/top-view';
import { ShowView } from './views/show-view';
import { AskView } from './views/ask-view';
import { JobsView } from './views/jobs-view';
import { CommentsView } from './views/comments-view';

const routes = {
    '/': TopView,
    '/news': NewsView,
    '/item': CommentsView,
    '/show': ShowView,
    '/ask': AskView,
    '/jobs': JobsView
};

const viewContainer = document.querySelector('.view-container');

const hooks = {};

// Initialize the app
initialize(routes, viewContainer, hooks);
