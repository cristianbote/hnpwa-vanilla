import { GenericView } from '../elements/generic-view';

export const NewsView = () => {
    return GenericView({
        viewClassName: 'news-view',
        urlName: 'newstories'
    })
};