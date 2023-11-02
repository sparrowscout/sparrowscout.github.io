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

1. yarn script : `rm -rf dist && tsc --emitDeclarationOnly && build`
2. average = 5회 실행 후, 최장 시간과 최저 시간을 제외하고 빌드 시간의 산술평균

### ESBuild

|           | average                             |
| --------- | ----------------------------------- |
| cjs (umd) | <span style="color:#00c853"> 5.67ms |
| js (esm)  | <span style="color:#00c853"> 7.67ms |
| total     | <span style="color:#00c853">2.35s   |

|          |   1   |   2   |   3   |   4   |   5   |
| -------- | :---: | :---: | :---: | :---: | :---: |
| cjs(umd) |  6ms  |  5ms  |  5ms  | 10ms  |  6ms  |
| js(esm)  |  7ms  |  6ms  |  7ms  | 13ms  |  9ms  |
| total    | 2.24s | 2.27s | 2.29s | 2.50s | 2.76s |

### RollUp

|           | average                              |
| --------- | ------------------------------------ |
| cjs (umd) | <span style="color:#00c853"> 709ms   |
| js (esm)  | <span style="color:#00c853"> 432.6ms |
| total     | <span style="color:#00c853">3.49s    |

|          |   1   |   2   |   3   |   4   |   5   |
| -------- | :---: | :---: | :---: | :---: | :---: |
| cjs(umd) | 710ms | 709ms | 704ms | 708ms | 716ms |
| js(esm)  | 431ms | 430ms | 434ms | 438ms | 433ms |
| total    | 3.46s | 3.48s | 3.49s | 3.50s | 3.53s |

### WebPack

|           | average                            |
| --------- | ---------------------------------- |
| cjs (umd) | <span style="color:#00c853"> 412ms |
| js (esm)  | <span style="color:#00c853"> 395ms |
| total     | <span style="color:#00c853">3.07s  |

|          |   1   |   2   |   3   |   4   |   5   |
| -------- | :---: | :---: | :---: | :---: | :---: |
| cjs(umd) | 415ms | 404ms | 410ms | 411ms | 431ms |
| js(esm)  | 379ms | 384ms | 391ms | 380ms | 409ms |
| total    | 2.97s | 3.02s | 3.02s | 3.17s | 3.86s |

<br/>

## 6. 번들러 테스트 1차 결론

| ↑   | bundler |   esm   |  umd   | total |
| --- | ------- | :-----: | :----: | :---: |
| 1   | ESBuild | 7.67ms  | 5.67ms | 2.76s |
| 2   | WebPack |  395ms  | 412ms  | 3.07s |
| 3   | RollUp  | 432.6ms | 709ms  | 3.49s |

1. ESBuild : <br/>
   ① UMD 번들러를 제공하고 있지 않아서, 다른 사용자가 만든 Plugin인 'umdWrapper'를 사용함 ([github issue ↗︎](https://github.com/evanw/esbuild/issues/507#issuecomment-1356794943))<br/>
   ② TypeScript Complier가 내장되어 있어서, 별도의 transpile plugin 혹은 loader가 불필요함

2. Webpack : <br/>
   ① TypeScript complie을 위해서 'ts-loader'를 사용함 ([공식문서 ↗︎](https://webpack.kr/guides/typescript/)) <br/>
   ② production mode로 빌드 시 minify & mangle 기본으로 실행됨

3. RollUp : <br/>
   ① TypeScript complie을 위해서 'typescript' plugin을 사용함 ([공식문서 ↗︎](https://rollupjs.org/command-line-interface/#configplugin-plugin))<br/>
   ② minify를 위해서 'terser' plugin을 사용함 (타 라이브러리, 타 번들러 참고)

### → ESBuild > WebPack > RollUp 순으로 빠름. <br/>

ESBuild > RollUp > Webpack 순서일 줄 알았는데 예상과 다르게 RollUp이 가장 느렸음. <br/>

RollUp이 TypeScript transpile plugin과 minify plugin을 두개 다 사용하고 있어서 plugin 영향이 있는지 체크하고,
세 개 번들러 모두 번들러 각각에서 추천하고 있는, 혹은 각각 특징에 맞게 다른 plugin, loader를 사용하고 있기 때문에 최대한 통일해보는 과정이 필요할 것 같음.

<br/>

## RollUp이 가장 느렸던 이유 찾기 (Plugin)

### 1. typescript O, minify O (기존 configuration)

|       | average                              |
| ----- | ------------------------------------ |
| cjs   | <span style="color:#00c853"> 709ms   |
| js    | <span style="color:#00c853"> 432.6ms |
| total | <span style="color:#00c853">3.49s    |

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 710ms | 709ms | 704ms | 708ms | 716ms |
| js    | 431ms | 430ms | 434ms | 438ms | 433ms |
| total | 3.45s | 3.48s | 3.49s | 3.50s | 3.53s |

### 2. typescript X, minify X

|       | average                             |
| ----- | ----------------------------------- |
| cjs   | <span style="color:#00c853"> 21.3ms |
| js    | <span style="color:#00c853"> 4ms    |
| total | <span style="color:#00c853">0.47s   |

→ 다른 plugin을 사용하지 않고, RollUp의 내장 config만을 사용해 `JavaScript` → `JavaScript` bundle만 실행했을 때 훨씬 빠른 결과 나옴

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 22ms  | 22ms  | 21ms  | 21ms  | 21ms  |
| js    | 4ms   | 4ms   | 4ms   | 4ms   | 5ms   |
| total | 0.48s | 0.47s | 0.47s | 0.47s | 0.47s |

### 3. typescript X, minify O

|       | average                            |
| ----- | ---------------------------------- |
| cjs   | <span style="color:#00c853"> 141ms |
| js    | <span style="color:#00c853">112ms  |
| total | <span style="color:#00c853"> 0.75s |

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 142ms | 141ms | 141ms | 141ms | 141ms |
| js    | 112ms | 112ms | 112ms | 111ms | 113ms |
| total | 0.75s | 0.75s | 0.75s | 0.75s | 0.84s |

### 4. typescript O, minify X

|       | average                              |
| ----- | ------------------------------------ |
| cjs   | <span style="color:#00c853"> 592ms   |
| js    | <span style="color:#00c853">325.67ms |
| total | <span style="color:#00c853"> 1.66s   |

→ typescript plugin을 사용하지 않고, minify 도구인 terser plugin을 사용한 3번 케이스와 비교해봤을 때, typescript plugin의 transpile 과정이 가장 많은 시간을 소비하고 있음

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 596ms | 590ms | 585ms | 612ms | 592ms |
| js    | 337ms | 319ms | 327ms | 321ms | 329ms |
| total | 1.68s | 1.65s | 1.65s | 1.67s | 1.66s |

<br/>

plugin이랑 tsc를 하나씩 빼 봤을 때 `@rollup/plugin-typescript` 과정이 가장 오래걸려서 대체할 수 있는 transpiler로 babel을 사용해서 테스트 해보기로했다.

<br/>

## RollUp with Babel transpiler

```javascript
 plugins: [
      babel({
        extensions: [".ts", ".js"],
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [["@babel/preset-typescript"]],
        plugins: [],
      }),
      terser(),
    ],
```

### 1. babel O, minify X tsc O

|       | average                               |
| ----- | ------------------------------------- |
| cjs   | <span style="color:#00c853"> 179.67ms |
| js    | <span style="color:#00c853">52ms      |
| total | <span style="color:#00c853"> 2.40s    |

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 179ms | 180ms | 177ms | 180ms | 181ms |
| js    | 17ms  | 17ms  | 18ms  | 18ms  | 17ms  |
| total | 2.56s | 2.69s | 2.31s | 2.32s | 2.33s |

### 1. babel O, minify O tsc O

|       | average                              |
| ----- | ------------------------------------ |
| cjs   | <span style="color:#00c853"> 274.3ms |
| js    | <span style="color:#00c853">100.67ms |
| total | <span style="color:#00c853"> 2.54s   |

|       | 1     | 2     | 3     | 4     | 5     |
| ----- | ----- | ----- | ----- | ----- | ----- |
| cjs   | 287ms | 274ms | 274ms | 274ms | 275ms |
| js    | 101ms | 100ms | 101ms | 99ms  | 101ms |
| total | 2.59s | 2.52s | 2.52s | 2.51s | 2.68s |

### → Babel을 사용하니까 ts-loader를 사용한 WebPack보다 빠르게 나왔다.

그렇다면 통일된 transpiler로 비교해서 babel-loader를 사용한 webpack보다는?

### 1-1. WebPack with Babel

```javascript
{
    loader: "babel-loader",
    options:{
                plugins: ["@babel/plugin-transform-typescript"],
            },
},

```

|       | average                            |
| ----- | ---------------------------------- |
| cjs   | <span style="color:#00c853"> 456ms |
| js    | <span style="color:#00c853">436ms  |
| total | <span style="color:#00c853"> 2.97s |

|       | 1      | 2      | 3      | 4      | 5      |
| ----- | ------ | ------ | ------ | ------ | ------ |
| cjs   | 456 ms | 508 ms | 443 ms | 469 ms | 443 ms |
| js    | 435 ms | 482 ms | 423 ms | 448 ms | 425 ms |
| total | 2.83s  | 3.09s  | 3.28s  | 3.00s  | 2.83s  |

babel-loader를 사용한 WebPack보다 빨랐다! <br/>

오히려 Webpack은 babel-loader를 사용하니까 ts-loader를 사용했을 때보다 느려졌다.

## RollUp은 더 빨라질 수 있을까? (complier 비교)

이제 Babel과 SWC를 비교해보려고 했는데<br/> RollUp이 제공하고 있는 [Plugins, Packages, and Resources 문서↗︎](https://github.com/rollup/awesome)에 SWC plugin이 없었다 ...

# 결론

1. ESBuild에 Typescript transpile이 내장되어있는건 TypeScript 환경에서 굉장히 장점인 것 같다.
2. TypeScript 환경인지, 다양한 개발 환경을 지원해야하는 라이브러리 개발인지, 어디까지 보수적으로 진행할지 프로젝트 by 프로젝트, 정책 by 정책이겠지만 어느정도 번들러가 탄생한 이유와 시점에 따라 적절한 번들러가 존재하는 것 같다.
