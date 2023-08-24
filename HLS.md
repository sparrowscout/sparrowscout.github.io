---
title: hls.js
has_children: true
nav_order: 2
---

# hls.js

### hls.js는
브라우저 상의 Media Source Extension(MSE)를 HTTP 프로토콜을 사용해 컨텐츠를 제공하는 어쩌구

### Media Source Extension(MSE)
adpative streaming을 위해 제공되는 브라우저 표준 기술

### adpative streaming (↔︎ Progressive download)
영상을 다양한 해상도로 인코딩해 segment로 잘게 쪼개서 저장해두고 네트워크 통신을 통해 사용자에게 segment단위로 데이터를 전달함

>segment들의 경로를 갖고있는 데이터 묶음 = media playlist <br/>
>해상도 별 media playlist들의 경로를 갖고있는 데이터 묶음 = master playlist

잘게 쪼개진 segment로 데이터를 제공하기때문에 사용자의 대역폭(bandwidth)에 따라 다음 데이터를 쉽게 교체할 수 있음. 사용자가 컨텐츠를 보는 중에 네트워크 상태가 나빠지면 더 낮은 bandwidth를 가지고 있는 media playlist의 segement들을 요청함.
