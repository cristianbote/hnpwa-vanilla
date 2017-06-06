import { a, nav } from '../dom/api';

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

const Nav = (props) => {

    let currentActive;
    let template = nav(
        {},
        [
            link({ href: '/', className: ifPathMatchesSetActive(props.currentRoute, '/'), handleClick: handleOnClick }, 'new'),
            link({ href: '/top', className: ifPathMatchesSetActive(props.currentRoute, '/top'), handleClick: handleOnClick }, 'top'),
            link({ href: '/show', className: ifPathMatchesSetActive(props.currentRoute, '/show'), handleClick: handleOnClick }, 'show')
        ]
    );

    function handleOnClick(path) {
        let currentActive = currentActive || template.querySelector('.active');
        let nextActive = template.querySelector(`a[href="${path}"]`);

        if (nextActive) {
            currentActive.classList.remove('active');
            nextActive.classList.add('active');
            currentActive = nextActive;

            // TODO: Handle pushState
            window.history.pushState(null, null, path);
            window.handlePushState(path);
        }
    }

    return template;
};

export { Nav }