---
title: Build Time Test
parent: SDK
nav_order: 1
---

# Build Time Test

SDK 패키징을 위해 번들러 툴과 컴파일 툴을 비교했습니다. 동일한 요구사항 내에서 번들러들끼리 비교한 이후, 제일 빠른 툴과 제일 느린 툴의 loader, plugin 등을 변경해서 환경 안에서 최적의 방식을 찾아내려고 했습니다.

[🐱 github repository ↗︎](https://github.com/sparrowscout/dummy-ESBuild)

## 1. 번들러 목록

1. **rollUp** : HLS.js가 사용하고 있는 번들러, 라이브러리 패키징에 적절한 툴
2. **webPack** : 클래식이라고 생각되어서 목록에 넣음
3. **ESBuild** : LATEST이기도하고, 굉장히 빠르다고 들어서 비교군에 넣음

<br/>

## 2. 번들 요구사항

1. **input**: index.ts <br/>
   **output**: index.cjs(UMD), index.js(ESM), index.d.ts
   > Typescript로 작성된 원본 소스 1개로 node 기반 모듈과 브라우저 기반 모듈을 포괄적으로 지원 하기 위해 UMD, ESM 라이브러리로 번들 + 타입스크립트 사용자를 지원하기 위해 .d.ts 파일 emit
2. minify: true

> ### UMD와 ESM을 선택한 이유?
>
> ### Javascript module
>
> 1.  **CommonJS** : 맨 처음 자바스크립트를 웹 이외 환경, node 기반에서 사용하려고 했고, 모듈화를 맨 처음 시작함. 자바스크립트 V8엔진 이후에 CommonJS 모듈 발표함. 서버사이드 환경에 더 적합함.
> 2.  **AMD** : CommonJS보다 브라우저 환경에 더 적합함.
> 3.  **UMD** : CommonJS와 AMD를 동시에 호환하기 위해 만들어짐. 사용자의 모듈 로더를 확인해서 CommonJS, AMD, Window 방식으로 분기함
> 4.  **ESM** : ECMAScript Module. 자바스크립트 ES6에서부터 사용 가능한 모듈
>
> <br/>
>
> 📚 → 라이브러리 패키징을 위한 빌드 테스트였기 때문에, 사용자의 환경을 최대한 포괄하기 위해 다양한 스펙트럼의 모듈을 제공하기위해서 UMD와 ESM을 선택함

<br/>

## 3. 테스트 환경

1. macOS Ventura 13.5.1

<br/>

## 4. 테스트 방식

1. 각 비교군 번들 5회 실행, 최장 시간과 최저 시간을 제외하고 빌드 시간의 산술평균 비교

1. script에 대한 총 시간을 구하기 위해서 yarn 명령어 사용
1. WebPack, RollUp은 빌드 완료 시 측정된 시간 log가 내장되어있는데 ESBuild는 아니었음. <br/>
   그래서 `build.onEnd((result) => {})` `build.onStart(() => {})` API 사용 <br/> `metafile:true` config로 각각 파일 별 빌드 시작 시점과 종료 시점 구함

<br/>

## 5. 번들러 테스트 결과

1. **yarn script**: `rm -rf dist && tsc --emitDeclarationOnly && build`

| bundler | 1                                                   | 2                                                   | 3                                                   | 4                                                   | 5                                                   | 평균                                                  |
| ------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| ESBuild | **total** 2.24s<br/>**esm** 7ms<br/>**umd** 6ms     | **total** 2.27s<br/>**esm** 6ms<br/>**umd** 5ms     | **total** 2.29s<br/>**esm** 7ms<br/>**umd** 5ms     | **total** 2.50s<br/>**esm** 13ms<br/>**umd** 10ms   | **total** 2.76s<br/>**esm** 9ms<br/>**umd** 6ms     | **total** 2.35s<br/>**esm** 7.67ms<br/>**umd** 5.67ms |
| RollUp  | **total** 3.46s<br/>**esm** 431ms<br/>**umd** 710ms | **total** 3.48s<br/>**esm** 430ms<br/>**umd** 709ms | **total** 3.49s<br/>**esm** 434ms<br/>**umd** 704ms | **total** 3.50s<br/>**esm** 438ms<br/>**umd** 708ms | **total** 3.53s<br/>**esm** 433ms<br/>**umd** 716ms | **total** 3.49s<br/>**esm** 432.6ms<br/>**umd** 709ms |
| WebPack | **total** 2.97s<br/>**esm** 379ms<br/>**umd** 415ms | **total** 3.02s<br/>**esm** 384ms<br/>**umd** 404ms | **total** 3.02s<br/>**esm** 391ms<br/>**umd** 410ms | **total** 3.17s<br/>**esm** 380ms<br/>**umd** 411ms | **total** 3.86s<br/>**esm** 409ms<br/>**umd** 431ms | **total** 3.07s<br/>**esm** 395ms<br/>**umd** 412ms   |

## 6. 번들러 테스트 결론

dist 폴더를 청소하고, tsc 컴파일시간을 제외하고 각 번들링 시간 평균을 구하면 ESBuild, WebPack, RollUp 순으로 빨랐습니다.
 || bundler | esm | umd | total(+tsc)|
|--|------ |:--: |:--: |:--:|
|1| ESBuild |7.67ms|5.67ms |2.76s|
|2| WebPack |395ms |412ms |3.07s|
|3| RollUp |432.6ms |709ms |3.49s|

1. ESBuild : <br/>
   ① UMD 번들러를 제공하고 있지 않아서, 다른 사용자가 만든 Plugin인 'umdWrapper'를 사용함 <br/>
   ② TypeScript Complier가 내장되어 있어서, 별도의 transpile plugin 혹은 loader가 불필요함

2. Webpack : <br/>
   ① TypeScript complie을 위해서 'ts-loader'를 사용함 (공식문서) <br/>
   ② production mode로 빌드 시 minify & mangle 기본으로 실행됨

3. RollUp : <br/>
   ① TypeScript complie을 위해서 'typescript' plugin을 사용함 <br/>
   ② minify를 위해서 'terser' plugin을 사용함
