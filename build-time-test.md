---
title: Build Time Test
parent: SDK
nav_order: 1
---

# Build Time Test

SDK 패키징을 위해 번들러 툴과 컴파일 툴을 비교했습니다. 동일한 요구사항 내에서 번들러들끼리 비교한 이후, 제일 빠른 툴과 제일 느린 툴의 loader, plugin 등을 변경해서 환경 안에서 최적이 방식을 찾아내려고 했습니다.

## 1. 번들러 목록

1. **rollUp** : HLS.js가 사용하고 있는 번들러, 라이브러리 패키징에 적절한 툴
2. **webPack** : 클래식이라고 생각되어서 목록에 넣음
3. **ESBuild** : LATEST이기도하고, 굉장히 빠르다고 들어서 비교군에 넣음

<br/>

## 2. 번들 요구사항

1. **input**: index.ts <br/>
   **output**: index.cjs(UMD), index.js(ESM), index.d.ts
2. minify: true

> UMD와 ESM을 선택한 이유?

> IIFE와 UMD의 다른점?

<br/>

## 3. 테스트 환경

1. macOS Ventura 13.5.1

<br/>

## 4. 테스트 방식

1. 각 비교군 번들 5회 실행, 최장 시간과 최저 시간을 제외하고 빌드 시간의 산술평균 비교

<br/>

## 5. 번들러 테스트 결과

1. **yarn script**: `rm -rf dist && tsc --emitDeclarationOnly && build`

| bundler | 1                                                   | 2                                                   | 3                                                   | 4                                                   | 5                                                   | 평균                                                  |
| ------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| esbuild | **total** 2.24s<br/>**esm** 7ms<br/>**umd** 6ms     | **total** 2.27s<br/>**esm** 6ms<br/>**umd** 5ms     | **total** 2.29s<br/>**esm** 7ms<br/>**umd** 5ms     | **total** 2.50s<br/>**esm** 13ms<br/>**umd** 10ms   | **total** 2.76s<br/>**esm** 9ms<br/>**umd** 6ms     | **total** 2.35s<br/>**esm** 7.67ms<br/>**umd** 5.67ms |
| rollup  | **total** 3.46s<br/>**esm** 431ms<br/>**umd** 710ms | **total** 3.48s<br/>**esm** 430ms<br/>**umd** 709ms | **total** 3.49s<br/>**esm** 434ms<br/>**umd** 704ms | **total** 3.50s<br/>**esm** 438ms<br/>**umd** 708ms | **total** 3.53s<br/>**esm** 433ms<br/>**umd** 716ms | **total** 3.49s<br/>**esm** 432.6ms<br/>**umd** 709ms |
| webpack | **total** 2.97s<br/>**esm** 379ms<br/>**umd** 415ms | **total** 3.02s<br/>**esm** 384ms<br/>**umd** 404ms | **total** 3.02s<br/>**esm** 391ms<br/>**umd** 410ms | **total** 3.17s<br/>**esm** 380ms<br/>**umd** 411ms | **total** 3.86s<br/>**esm** 409ms<br/>**umd** 431ms | **total** 3.07s<br/>**esm** 395ms<br/>**umd** 412ms   |

### 1. 번들러 테스트 결론

2. bundlers with SWC

| bundler | with SWC+tsc | with SWC |
| ------- | ------------ | -------- |
| esbuild |              |          |
| rollup  |              |          |
| webpack |              |          |
