import { article } from '../core/dom-api';
import { getItemData } from '../core/database';
import { set, get } from '../cache-store';
import { timeAgo } from './time-ago-element';

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

        let domain = data.domain || (data.url && data.url.indexOf('/') !== -1 && data.url.split('//')[1].split('/')[0]);
        let commentsCount = data.descendants || data.comments_count;
        let articleUrlOrAddress = data.url ? data.url : `/item?id=${props.id}`;

        return article({ className: (data === defaultProps) && 'loading' }, [`
            <a class="h1-title" target="${!!domain ? '_blank' : '_top'} "rel="noopener" href="${articleUrlOrAddress}">
                <h1>${data.title} <span class="basedomain">${!!domain ? '// ' + domain : ''}</span></h1>
            </a>
            <div class="details">
                <div class="author">${data.by || data.user}</div>
                <div class="stars">${data.score || data.points} ★</div>
            </div>
            <div class="subdetails">
                 <span class="elapsed">${data.time_ago ? data.time_ago : timeAgo(data.time) + ' ago'}</span>
                 <a href="${props && `/item?id=${props.id}`}" class="comments">${commentsCount
                    ? commentsCount + ' comments' : 'discuss'}</a>
            </div>`
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
                    render();
                });
        }
    }

    return template;
};