import { Nav } from './elements/nav';
import { initialize } from './core/router';

import { NewsView } from './views/news-view';
import { TopView } from './views/top-view';
import { ShowView } from './views/show-view';
import { AskView } from './views/ask-view';
import { JobsView } from './views/jobs-view';
import { CommentsView } from './views/comments-view';

// References
const AppNode = document.getElementById('app');
const HeaderNode = AppNode.querySelector('header');

initialize(
    {
        '/': TopView,
        '/news': NewsView,
        '/item': CommentsView,
        '/show': ShowView,
        '/ask': AskView,
        '/jobs': JobsView
    },
    document.querySelector('.view-container'),
    {
        beforeMount: (route, currentRoute) => {
            if (!HeaderNode.querySelector('nav')) {
                HeaderNode.appendChild(Nav({ currentRoute }));
            }
        }
    }
);
