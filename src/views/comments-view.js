import { div } from '../core/dom-api';
import { urls } from '../urls';

const commentElement = (data) => {

    let replies = data && data.comments && data.comments.length && data.comments.map(item => commentElement(item).outerHTML);

    return div({ className: 'comment' }, `
        <div class="reply">&#8735;</div>
        <div class="details">
            <div class="user">${data.user}</div>
            <div class="time">${data.time_ago}</div>
        </div>
        <div class="content">
            ${data.content}
        </div>
        
        ${replies ? replies.join('') : ''}
    `);
};


const commentsElement = (comments) => {
    return div({ className: 'comments' }, comments.length && comments.map(data => commentElement(data)));
};

export const CommentsView = (props) => {
    let template;
    let data;

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

        return div({
            className: 'item-view'
        }, `
            <h1 className="title">${data.title}</h1>
            <div class="subtitle ${data.type}">
                <div class="user">${data.user}</div>
                <div class="time-ago">${data.time_ago}</div>
                <div class="stars">${data.points} <span>★</span></div>
            </div>
            <div class="content">
                ${data.content || 'No content'}
            </div>
            <div class="comments">
                ${hasComments ? 'Comments' : 'No coments'}
                
                ${commentsContent.innerHTML}
            </div>
        `);
    }

    function createFirstTemplate() {
        return div({
            className: 'item-view'
        }, '<div class="content-loading">Loading content</div>');
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