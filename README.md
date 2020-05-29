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

These three lines was required in order to make errors go away on load. But I'm getting this error 
when I right click an item and selects cut, then paste into another item: 

`[Vue warn]: You may have an infinite update loop in a component render function.`

I am not getting this error in the `vue-jstree-extended` project, only when it's
included and ran from here. It's included using symlink, perhaps that is relevant?

If I don't add those 3 lines I'm getting this error instead:

`Error in data(): "Error: [vue-composition-api] must call Vue.use(plugin) before using any function."`

and the tree doesn't load at all.

In vue-jstree-extended I have set peerDependencies in package.json:
  ```
  "peerDependencies": {
    "@vue/composition-api": "^0.5.0"
  }
```

It's declared as peerDependency to avoid code duplication

**We need to fix so that:**
1. The tree works both while running dev in the library (vue-jstree-extended) and 
   when including the library into nightmare. 
2. There is no code duplication (no need for importing Vue and Composition API twice)
3. Errors are fully resolved in tree (no infinite loop etc)
4. It needs to work with the same import scheme that are being used now:
 `import { VJstree, useTreeActions, useMultiTree} from 'vue-jstree-extended'` (using /dist not source files)

## Project setup
```
npm install
```

Clone [my fork](https://github.com/Warz/vue-jstree) of `vue-jstree-extended` 
as a separate project/directory. Then `cd` to the folder (vue-jstree-extended/)
and type:  

```
npm link
```

then cd back to this folder (nightmare/) and type:
```
npm link vue-jstree-extended
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
