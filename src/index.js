import {
    div, article, h1, span, a
} from './core/dom-api';

import { Nav } from './elements/nav';
import { initialize } from './core/router';

import { NewsView } from './views/news-view';
import { TopView } from './views/top-view';

// References
const AppNode = document.getElementById('app');
const HeaderNode = AppNode.querySelector('header');

initialize(
    {
        '/': NewsView,
        '/top': TopView,
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
