export const urls = {
    'newstories': (page) => `https://hnpwa.com/api/v0/newest.json?page=${page}`,
    'topstories': (page) => `https://hnpwa.com/api/v0/news.json?page=${page}`,
    'askstories': (page) => `https://hnpwa.com/api/v0/ask.json?page=${page}`,
    'jobstories': (page) => `https://hnpwa.com/api/v0/jobs.json?page=${page}`,
    'showstories': (page) => `https://hnpwa.com/api/v0/show.json?page=${page}`,
    'item': (id) => `https://hnpwa.com/api/v0/item/${id}.json`
};