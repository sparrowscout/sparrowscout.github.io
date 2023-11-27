---
title: 환경변수 파일 설정하기
---

# 환경변수 파일 설정하기

## frontEnd, Next.js의 경우

Next.js는 아래의 3가지 방식으로 환경변수 기능을 지원함

1. process.env.NODE_ENV : 구동환경 체크용 환경변수
2. .env 파일 : 구동 환경별 환경변수 적용 파일
3. NEXT*PUBLIC* : 브라우저에서 참조하기 위한 Prefix

4. process.env.NODE_ENV : 구동환경 체크 변수

- Next.js는 자동으로 process.env.NODE_ENV 변수를 생성하고, 구동 환경에 따라 아래의 3가지 값을 주입해 준다.
    1) development : 개발 환경(`next dev`)
    2) production : 배포 환경(`next staart`, `next build`)
    3) test : 테스트 환경

## backEnd, Nest.js의 경우