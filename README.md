## Plain Javascript(no framework) Hacker News Example

See this application live at: https://hnpwa-vanilla.firebaseapp.com

This is an example of a PWA built using no framework for view manipulation just Webpack for bundling and service worker.
*Do think of this as the way to build your application using no framework - my 2 cents*. 

Made with ❤️ in Cluj-Napoca, Transylvania 🏰

> Icons made by [Freepik](http://www.freepik.com) Freepik from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

## Installation

1. Clone the repo    
1. Run `npm install`
1. Serve it locally with `npm run serve`
    * Running _production_ locally `npm run start-prod`
1. Open it up in your browser
    * https://127.0.0.1:8080

## Details

I've built this as an experiment to see if, native/vanilla javascript, can beat the PWA scores on https://hnpwa.com/ As soon as I finish the implementation, I'd be posting the Lighthouse report. Things are going so good so far.
There are a couple of thing that I had to do, in order to make it speedier. Check it out!

### _Component_ based composition

So, we must acknowledge the path that React opened, for view composition, moving the composition part in javascript,
leaving you focused on what exactly you'd like to accomplish.

Therefore, my take on the composition was pretty straightforward with a React-like approach, but using the
native dom-api.

So a component would look like
```javascript
import { div, a } from '../core/dom-api';

export const myCustomNavigation = (props) => {
    return div(
        { className: 'my-custom-navigation' },
        [
            a({ href: '/' }, 'Home'),
            a({ href: '/about' }, 'About'),
            a({ href: '/contact' }, 'Contact')
        ]
    )
};
```

As you can see, it's pretty darn similar to React/Preact and the bunch. There's no magic happening behind the scene. If you peek inside `./core/dom-api.js` you'll see that
everything is split and there's just one `createElement` function, which returns a function that will actually create the _component_ based on the params given: props, and content.

I'll let you explore more. :)

## Feedback welcomed!

Feel free to drop a line, file an issue and so on. Much appreciated!
