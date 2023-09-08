---
title: References
parent: Test
nav_order: 2
---

#Refereces

<hr/>

# test tools and scripts in HLS.js

<br/>

## 1. test tools

<p>
테스트 러너 : Karma <br/>

테스트 프레임 워크 : mocha, sinon-chai <br/>

테스트 커버리지 : ⭕️ [karma-coverage](https://github.com/karma-runner/karma-coverage)  <br/>

크로스 브라우징 테스트 : ⭕️ [Selenium WebDriver](https://www.seleniumhq.org/) <br/>

</p>

<br/>

## 2. npm scripts

```javascript
"test": "npm run test:unit && npm run test:func",
"test:unit": "karma start karma.conf.js",
"test:unit:debug": "DEBUG_UNIT_TESTS=1 karma start karma.conf.js --auto-watch --no-single-run --browsers Chrome",
"test:unit:watch": "karma start karma.conf.js --auto-watch --no-single-run",
"test:func": "BABEL_ENV=development mocha --require @babel/register tests/functional/auto/setup.js --timeout 40000 --exit",
"test:func:light": "BABEL_ENV=development HLSJS_LIGHT=1 mocha --require @babel/register tests/functional/auto/setup.js --timeout 40000 --exit",
"test:func:sauce": "SAUCE=1 UA=safari OS='OS X 10.15' BABEL_ENV=development mocha --require @babel/register tests/functional/auto/setup.js --timeout 40000 --exit",
```
