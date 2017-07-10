export const urls = {
    'newstories': (page) => `https://node-hnapi.herokuapp.com/newest?page=${page}&${Date.now()}`,
    'topstories': (page) => `https://node-hnapi.herokuapp.com/news?page=${page}&${Date.now()}`,
    'askstories': (page) => `https://node-hnapi.herokuapp.com/ask?page=${page}&${Date.now()}`,
    'jobstories': (page) => `https://node-hnapi.herokuapp.com/jobs?page=${page}&${Date.now()}`,
    'showstories': (page) => `https://node-hnapi.herokuapp.com/show?page=${page}&${Date.now()}`,
    'item': (id) => `https://node-hnapi.herokuapp.com/item/${id}?&${Date.now()}`
};