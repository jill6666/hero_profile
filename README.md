
# hero_profile

## Description
See how powerful Heroes is, and look at yourself. <br/>
Ummm...
Let's reset partical of their superpower!
<!-- 我們該如何執行完成的 package -->
## Run in Shell
```
$ npm install
$ npm start
$ open http://localhost:3000
```
<!-- 專案的架構、Web 的架構邏輯 -->
## About Architecture
```
...
src
|-component
  |-HeroList.jsx
  |-Skeleton.jsx
|-HeroPage
  |-const.js
  |-index.jsx
  |-ProfileItem.jsx
|-api.js
|-App.jsx
|-Hero.jsx
|-index.js
|-styles.css
...
```
1. The `src/component` file is put reuse components in, so that we can find them faster.
2. In `src/api.js`, handle all api's method, baseURL and variables.
3. Save some string in `src/HeroPage/const.js` for replace them more convenient.

<!-- 你對於所有使用到的第三方 library 的理解，以及他們的功能簡介 -->
## Libraries used in this project
1. [material-ui]('https://www.npmjs.com/package/@material-ui/core')
> Description: React components for faster and simpler web development.<br/>
> Reason: Choose it for some styled components looks simply and comfortable.<br/>
2. [axios]('https://www.npmjs.com/package/axios')
> Description: Promise based HTTP client for the browser and node.js<br/>
> Reason: Awesome library for develop a project. It can help us to management all requests in one.<br/>
<!-- 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解 -->
## Others
Comment rules (do not leave too many comments if unnecessary)
1. Comment `TODO: sth` when there's something unfinished. <br/>
2. Comment for explain why we use this solution.(may not the best but the opportunest)
<!-- 在這份專案中你遇到的困難、問題，以及解決的方法 -->
## Obstacles
困難 & 問題：
1. 按下 `<a href='/:heroId/profile' />`連結時，頁面不能更新<br/>
soluton: use <Link /> to switch router and component in react-router-dom instead of re-render the page.<br/>
2. error msg:
```
index.js:27 Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```
The problem is to set state in `<Route path="/heroes/:heroId"/>` to update value of `<HeroList ... val={value} />`<br/>
(/src/App.jsx)
<img width="972" alt="截圖 2021-11-06 下午4 51 35" src="https://user-images.githubusercontent.com/73696750/140603912-889f1f77-ea1e-4e7a-a46d-0b71aac94de7.png">
solution: Remove set state function and handle state in another way like the image above.
