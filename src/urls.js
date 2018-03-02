const baseDomain = 'https://api.hnpwa.com/v0';
const extension = '.json';

export const urls = {
    'newstories': (page) => `${baseDomain}/newest/${page}${extension}`,
    'topstories': (page) => `${baseDomain}/news/${page}${extension}`,
    'askstories': (page) => `${baseDomain}/ask/${page}${extension}`,
    'jobstories': (page) => `${baseDomain}/jobs/${page}${extension}`,
    'showstories': (page) => `${baseDomain}/show/${page}${extension}`,
    'item': (id) => `${baseDomain}/item/${id}${extension}`
};