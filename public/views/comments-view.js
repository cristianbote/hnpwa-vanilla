import { div } from '../core/dom-api';
import { urls } from '../urls';

const commentsSort = (a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
};

const commentElement = (data) => {

    let replies = data && data.comments && data.comments.length && data.comments
        .sort(commentsSort)
        .map(item => commentElement(item));

    return`<div class="comment">
        <div class="details">
            <div class="user">${data.user}</div>
            <div class="time">${data.time_ago}</div>
        </div>
        <div class="content">
            ${data.content}
        </div>
        
        ${replies ? replies.join('') : ''}
    </div>`;
};


const commentsElement = (comments) => {
    return `<div class="comments">${comments.length && comments.sort(commentsSort).map(data => commentElement(data)).join('')}</div>`;
};

export const CommentsView = (props) => {
    let template;
    let data;
    let timeoutId;

    const loadData = () => {
        fetch(urls.item(props.routeParams.id))
            .then(res => res.json())
            .then(res => {
                data = res;
                render();
            });
    };

    function createTemplate() {
        let hasComments = data.comments.length;
        let commentsContent = commentsElement(data.comments);
        let url = data.url;

        url = url.indexOf('item') === 0 ? '/' + url : url;

        // Set the title
        document.querySelector('title').innerText = `${data.title} | Vanilla Hacker News PWA`;

        // Clear timeout
        if (timeoutId) clearTimeout(timeoutId);

        return div({
            className: 'item-view'
        }, `
            <a class="title" href="${url}" target="_blank">
                <h1>${data.title}<span>&#x2197;</span></h1>
            </a>
            <div class="subtitle ${data.type}">
                <div class="user">${data.user}</div>
                <div class="time-ago">${data.time_ago}</div>
                <div class="stars">${data.points} <span>★</span></div>
            </div>
            <div class="content">
                ${data.content || 'No content'}
            </div>
            <div class="comments">
                <div class="subtitle">${hasComments ? 'Comments' : 'No coments'}</div>
                
                ${commentsContent}
            </div>
        `);
    }

    function createFirstTemplate() {
        const firstTemplate = div({
            className: 'item-view'
        }, '<div class="content-loading">Loading content</div>');

        timeoutId = setTimeout(() => {
            firstTemplate.querySelector('.content-loading').innerHTML += '<br/>...<br/>Looks like it takes longer than expected';
            scheduleLongerTimeout(firstTemplate);
        }, 1e3);

        return firstTemplate;
    }

    function scheduleLongerTimeout(el) {
        timeoutId = setTimeout(() => {
            el.querySelector('.content-loading').innerHTML += '</br>...<br/>It\'s been over 2 seconds now, content should be arriving soon';
        }, 1500);
    }

    function render() {
        if (!!template.parentElement) {
            let newTemplate = createTemplate();
            template.parentElement.replaceChild(newTemplate, template);
            template = newTemplate;
        }
    }

    template = createFirstTemplate();

    loadData();

    return template;
};