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
    'new': (page) => `https://node-hnapi.herokuapp.com/news?page=${page}`
};