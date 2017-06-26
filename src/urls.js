/*

 https://hacker-news.firebaseio.com/v0/item/ID.json?pretty=print
 https://hacker-news.firebaseio.com/v0/topstories.json?pretty=print
 https://hacker-news.firebaseio.com/v0/newstories.json?pretty=print
 https://hacker-news.firebaseio.com/v0/showstories.json?pretty=print
 https://hacker-news.firebaseio.com/v0/askstories.json?pretty=print
 https://hacker-news.firebaseio.com/v0/jobstories.json?pretty=print
 https://hacker-news.firebaseio.com/v0/updates/items.json?pretty=print // Comments

 */

export const urls = {
    'newstories': (page) => `https://hacker-news.firebaseio.com/v0/newstories.json?pretty=print`,
    'topstories': (page) => `https://node-hnapi.herokuapp.com/news?page=${page}`,
    'askstories': (page) => `https://hacker-news.firebaseio.com/v0/askstories.json?pretty=print`,
    'jobstories': (page) => `https://hacker-news.firebaseio.com/v0/jobstories.json?pretty=print`,
    'showstories': (page) => `https://hacker-news.firebaseio.com/v0/showstories.json?pretty=print`,
    'item': (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?pretty=print`
};