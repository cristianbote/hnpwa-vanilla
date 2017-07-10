export const urls = {
    'newstories': (page) => `https://node-hnapi.herokuapp.com/newest?page=${page}`,
    'topstories': (page) => `https://node-hnapi.herokuapp.com/news?page=${page}`,
    'askstories': (page) => `https://node-hnapi.herokuapp.com/ask?page=${page}`,
    'jobstories': (page) => `https://node-hnapi.herokuapp.com/jobs?page=${page}`,
    'showstories': (page) => `https://node-hnapi.herokuapp.com/show?page=${page}`,
    'item': (id) => `https://node-hnapi.herokuapp.com/item/${id}`
};