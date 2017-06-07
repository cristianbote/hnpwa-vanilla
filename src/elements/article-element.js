import { div, article, a, span, h1 } from '../core/dom-api';
import { urls } from '../urls';

export const ArticleElement = (props) => {
    let defaultProps = {
        title: 'Loading',
        domain: 'loading.com',
        user: 'loadng',
        points: 1,
        time_ago: 'loading seconds ago',
        comments_count: 0
    };

    props = props || defaultProps;

    let template = article({ className: 'loading' }, [
        h1(null, [props.title, span({ className: 'basedomain' },` (${props.domain})`)]),
        div({ className: 'details'}, [
            a({ className: 'author'}, props.user),
            div({ className: 'stars'}, `${props.points} ★`)
        ]),
        div({ className: 'subdetails'}, [
            div({ className: 'elapsed'}, props.time_ago),
            a({ className: 'comments'}, props.comments_count ? `${props.comments_count} comments` : 'discuss')
        ])
    ]);

    return template;
};