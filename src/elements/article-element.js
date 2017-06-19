import { div, article, a, span, h1 } from '../core/dom-api';
import { urls } from '../urls';
import { set, get } from '../cache-store';

export const ArticleElement = (props) => {
    let defaultProps = {
        title: 'Loading',
        domain: 'loading.com',
        user: 'loadng',
        points: 1,
        time_ago: 'loading seconds ago',
        comments_count: 0
    };
    let template;
    let empty = !props || (Object.keys(props).length === 1 && !!props.id);

    let data = empty ? defaultProps : props;

    const createTemplate = () => {
        return article({ className: (data === defaultProps) && 'loading' }, [
            h1({
                    onclick: () => { data.type === 'link' ? window.open(data.url) : location.href = `/item?${props.id}`; }
                }, [
                data.title,
                span({ className: 'basedomain' }, !!data.domain ? ` (${data.domain})` : '')]
            ),
            div({ className: 'details'}, [
                a({ className: 'author'}, data.user),
                div({ className: 'stars'}, `${data.points} ★`)
            ]),
            div({ className: 'subdetails'}, [
                div({ className: 'elapsed'}, data.time_ago),
                a({
                    className: 'comments',
                    href: props && `/item?id=${props.id}`
                }, data.comments_count ? `${data.comments_count} comments` : 'discuss')
            ])
        ]);
    };

    const render = () => {
        if (template.parentElement) {
            template.parentElement.replaceChild(createTemplate(), template);
        } else {
            template = createTemplate();
        }
    };

    template = createTemplate();

    if (empty && props && props.id) {
        let cached = get(props.id);

        if (cached) {
            data = cached.data;
            render();
        } else {

            fetch(urls.item(props.id))
                .then(res => res.json())
                .then(res => {
                    data = {
                        title: res.title,
                        domain: res.url && res.url.split('//')[1].split('/')[0],
                        user: res.by,
                        points: res.score,
                        time_ago: 'loading seconds ago',
                        comments_count: res.descendants
                    };

                    set(props.id, data, Date.now() + 10e3);

                    render();
                });
        }
    }

    return template;
};