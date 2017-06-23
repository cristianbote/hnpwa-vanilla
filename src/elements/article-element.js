import { div, article, a, span, h1 } from '../core/dom-api';
import { getItemData } from '../core/database';
import { set, get } from '../cache-store';

export const ArticleElement = (props) => {
    let defaultProps = {
        title: 'Loading',
        user: 'loading',
        score: 1,
        time: 'loading seconds ago',
        descendants: 0,
        url: '//blabla.com/'
    };
    let template;
    let empty = !props || (Object.keys(props).length === 1 && !!props.id);

    let data = empty ? defaultProps : props;

    const createTemplate = () => {

        let domain = data.url && data.url.split('//')[1].split('/')[0];

        return article({ className: (data === defaultProps) && 'loading' }, [
            h1({
                    onclick: () => { data.type === 'link' ? window.open(data.url) : location.href = `/item?${props.id}`; }
                }, [
                data.title,
                span({ className: 'basedomain' }, !!domain ? ` (${domain})` : '')]
            ),
            div({ className: 'details'}, [
                a({ className: 'author'}, data.by),
                div({ className: 'stars'}, `${data.score} ★`)
            ]),
            div({ className: 'subdetails'}, [
                div({ className: 'elapsed'}, data.time.toString()),
                a({
                    className: 'comments',
                    href: props && `/item?id=${props.id}`
                }, data.descendants ? `${data.descendants} comments` : 'discuss')
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
            getItemData(props.id)
                .then(res => {
                    data = res;
                    set(props.id, data, Date.now() + 10e3);
                    render();
                });
        }
    }

    return template;
};