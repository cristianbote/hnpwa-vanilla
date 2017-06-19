import { a, nav } from '../core/dom-api';

const link = (props, label) => {
    let template = a({ ...props }, label);

    template.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        props.handleClick(props.href);
        return false;
    });

    return template;
};

function ifPathMatchesSetActive(path, href) {
    return path === href && ('active');
}

export const Nav = (props) => {

    let currentActive;
    let template = nav(
        {},
        [
            link({ href: '/', className: ifPathMatchesSetActive(props.currentRoute, '/'), handleClick: handleOnClick }, 'top'),
            link({ href: '/news', className: ifPathMatchesSetActive(props.currentRoute, '/news'), handleClick: handleOnClick }, 'new'),
            link({ href: '/show', className: ifPathMatchesSetActive(props.currentRoute, '/show'), handleClick: handleOnClick }, 'show')
        ]
    );

    function handleOnClick(path) {
        let currentActive = currentActive || template.querySelector('.active');
        let nextActive = template.querySelector(`a[href="${path}"]`);

        if (nextActive) {
            currentActive && currentActive.classList.remove('active');
            nextActive.classList.add('active');
            currentActive = nextActive;
        }

        // Push the state
        window.history.pushState(null, null, path);
        window.handlePushState(path);
    }

    return template;
};
