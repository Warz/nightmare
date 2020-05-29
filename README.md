# nightmare

This is a demo project where I'm using my fork of `vue-jstree-extended` 
([click here to view my fork](https://github.com/Warz/vue-jstree)). 
There is an issue with including composition api. 
I'm unable to use it successfully for [similar reasons as this guy](https://github.com/vuejs/composition-api/issues/228#issue-549103799).

in `vue-jstree-extended/src/index.js` I have added these three lines:
```
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
```

However I should not need to use any of them (?) in vue-jstree-extended because 
they are all included in `nightmare`.   

I added these lines to make the tree appear. But I'm getting this error 
when I right click and item and selects cut, then paste into another: 

`[Vue warn]: You may have an infinite update loop in a component render function.`

If I don't add those 3 lines I'm getting this error instead:

`Error in data(): "Error: [vue-composition-api] must call Vue.use(plugin) before using any function."`

and the tree doesn't load at all.

In vue-jstree-extended I have set peerDependencies in package.json:
  ```
  "peerDependencies": {
    "@vue/composition-api": "^0.5.0"
  }
```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
