---
title: 1. M-M-S
parent: hls.js
nav_order: 1
---

# Master Playlist - Media Playlist - Segment URL

클라이언트에서 호출한 hls가 브라우저에 영상을 띄우게 되는 과정은 크게 아래와 같은 단계로 나뉜다. 이번 문서에서는 hls.js가 클라이언트 단에서 호출을 받는 곳에서부터 segment를 transmuxer에 넘기는 부분까지를 코드와 같이 기록했다.

> **Master Playlist parsing → <br/>
> Media Playlist parsing → <br/>
> segment load → <br/>**
> transmux → <br/>
> MSE에 buffer append

![masterPlaylist](./img/MasterPlaylist.png)

![mms](./img/MMS.png)
