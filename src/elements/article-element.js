import { article } from '../core/dom-api';
import { get } from '../cache-store';

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

        let domain = data.domain;
        let commentsCount = data.comments_count;
        let articleUrlOrAddress = data.url ? data.url : `/item?id=${props.id}`;

        return article({ className: (data === defaultProps) && 'loading', render: render }, [`
            <a class="h1-title" ${!!domain ? 'target="_blank"' : ''} rel="noopener" href="${articleUrlOrAddress}">
                <h1>${data.title} ${!!domain ? '// <span class="basedomain">' + domain + '</span>' : ''}</h1>
            </a>
            <div class="details ${data.type}">
                <div class="author">${data.user}</div>
                <div class="stars">${data.points} ★</div>
            </div>
            <div class="subdetails">
                 <span class="elapsed">${data.time_ago}</span>
                 <a href="${props && `/item?id=${props.id}`}" class="comments">${commentsCount
                    ? commentsCount + ' comments' : 'discuss'}</a>
            </div>`
        ]);
    };

    const render = () => {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
        }
    };

    template = createTemplate();

    if (empty && props && props.id) {

        let cached = get(props.id);

        if (cached) {
            data = cached.data;
            render();
        }
    }

    return template;
};