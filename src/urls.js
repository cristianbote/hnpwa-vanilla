const baseDomain = 'https://api.hnpwa.com/v0';
const extension = '.json';

export const urls = {
    'newstories': (page) => `${baseDomain}/newest${extension}?page=${page}`,
    'topstories': (page) => `${baseDomain}/news${extension}?page=${page}`,
    'askstories': (page) => `${baseDomain}/ask${extension}?page=${page}`,
    'jobstories': (page) => `${baseDomain}/jobs${extension}?page=${page}`,
    'showstories': (page) => `${baseDomain}/show${extension}?page=${page}`,
    'item': (id) => `${baseDomain}/item/${id}${extension}`
};