---
title: Modules
parent: Packaging
grand_parent: SDK
nav_order: 1
---

> [📎 You don't Know JS module](https://ui.toast.com/weekly-pick/ko_20190418), <br/> [📎 JavaScript 표준을 위한 움직임: CommonJS와 AMD](https://d2.naver.com/helloworld/12864) 글을 요약 • 정리한 글입니다.

# Modules

자바스크립트의 모듈

<br/>

# [CommonJS ↗︎](https://nodejs.org/api/modules.html)

> a group with a goal of building up the JavaScript ecosystem for web servers, desktop and command line apps and in the browser.

JavaScript를 브라우저 밖에서도(브라우저용 언어를 넘어 범용적으로) 사용하려고 조직한 자발적 워킹 그룹 → 범용적으로 사용하려면 모듈화 필요함

> 먼저 모듈은 자신만의 독립적인 실행 영역이 있어야 한다. 따라서 전역변수와 지역변수를 분리하는 것이 매우 중요하다. 서버사이드 JavaScript의 경우에는 파일마다 독립적인 파일 스코프가 있기 때문에 파일 하나에 모듈 하나를 작성하면 간단히 해결된다.

V8 엔진 등장 → 서버사이드 JavaScript 환경을 전제로하는 CommonJS API 0.1 발표

> 하지만 이런 방식은 브라우저에서는 결정적인 단점이 있다. 필요한 모듈을 모두 내려받을 때까지 아무것도 할 수 없게 되는 것이다. 이 단점을 극복하려는 여러 방법이 CommonJS에서 논의되었지만, 결국 동적으로 < script > 태그를 삽입하는 방법으로 가닥을 잡는다. < script > 태그를 동적으로 삽입하는 방법은 JavaScript 로더들이 사용하는 가장 일반적인 방법이기도 하다.

# [AMD(Asynchronous Module Definition) ↗︎ ](https://github.com/amdjs/amdjs-api/wiki/AMD)

CommonJS와 비교해서, 브라우저 내에서의 실행에 중점을 둔 JavaScript 표준 API 라이브러리 제작 그룹, CommonJS에서 독립함

> AMD에서는 비동기 모듈(필요한 모듈을 네트워크를 통해 내려받을 수 있도록 하는 것)에 대한 표준안을 다루고 있다.
>
> 대표적으로 꼽을 수 있는 것이 바로 define() 함수다. 브라우저 환경의 JavaScript는 파일 스코프가 따로 존재하지 않기 때문에 이 define() 함수로 파일 스코프의 역할을 대신한다. 즉, 일종의 네임스페이스 역할을 하여 모듈에서 사용하는 변수와 전역변수를 분리한다. 물론 define() 함수는 전역함수로 AMD 명세를 구현하는 서드파티 벤더가 모듈 로더에 구현해야 한다.

## 📌

> 필요한 파일이 모두 로컬 디스크에 있어 바로 불러 쓸 수 있는 상황, 즉 서버사이드에서는 CommonJS 명세가 AMD 방식보다 간결하다. 반면 필요한 파일을 네트워크를 통해 내려받아야 하는 브라우저와 같은 환경에서는 AMD가 CommonJS보다 더 유연한 방법을 제공한다.

# [UMD(Universal Module Definition) ↗︎](https://github.com/umdjs/umd)

> UMD, or Universal Module Definition, is a module definition format that aims to be compatible with both CommonJS and AMD. It also allows you to export the module as a global variable that you can include in your application through a simple <script> tag.

It does this by wrapping the modules in a boilerplate that checks the environment to detect how the module is used, and produces the correct exported object.

## ❓

The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others).

## ES Module

ECMAScript 명세에 수록된 모듈 개념 (ES6)
