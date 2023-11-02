---
title: 리렌더링 줄이기
nav_order: 2
parent: TroubleShootings
---

# 1. 어디서 리렌더링이 발생하는지 확인하기 <br/>

## 개발자 도구의 중단점(Breakpoints) 활용

✏️ 개발자 도구의 Source 탭에서 Breakpoints(중단점)를 이용해서 어떤 순간에 어느 라인을 실행하는지 체크하기

![크롬 개발자 도구의 Source 탭](./img//chrome_breakpoint.png)

### 🟠 Breakpoints:<br/>

Breakpoints를 확인하고 싶은 함수 라인을 클릭하고나서 웹을 다시 실행시키거나 해당 함수가 실행되는 행동을 하면 함수 실행 타이밍에 브라우저 잠시 중단됨 <br/>

### 🟨 Data taps:<br/>

Breakpoints에 대한 데이터를 볼 수 있는 탭들 <br/>

1. Watch: 오른쪽 + 아이콘을 통해 변수명을 입력하면 중단 시점의 변수에 담겨있는 값을 확인할 수 있음 <br/>
   🟩 : 확인하고싶은 변수명

2. Breakpoints: 중단점을 한번에 확인할 수 있음, 중단점이 걸린 파일 별로 확인하고 중단점을 해제/등록할 수 있음 <br/>
   🟦 : 중단점이 걸린 파일들

3. Scope: 스코프 내에 있는 모든 변수, 객체들의 값을 보여줌 <br/>

4. Call Stack: 중단 시점에 실행되는 함수의 call stack을 볼 수 있음.<br/>
   ![chrome_callStack](./img/chrome_callStack.png)
   리액트 환경일 경우 대부분 react hook으로 스택이 꽉 채워져서 콜 스택의 경우 프론트엔드보다는 라이브러리, SDK 소스 확인할 때 유용했음.

<br/>

# 2. 왜 리렌더링이 발생하는지 확인하기
