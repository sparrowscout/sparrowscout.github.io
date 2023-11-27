---
title: [강연] 정보 접근성의 중요성과 필요성
parent: `UI/UX`
nav_order: 1
---



# 👨‍🏫 정보 접근성의 중요성과 필요성

11/7 화요일에 점핏에서 주최하고 삼성 강남에서 열린 '정보 접근성의 중요성과 필요성' 강연을 들을 수 있는 기회가 생겨서 다녀왔다. 사람인 프론트엔드 개발자로 일하고 계신 지성봉 개발자님의 강연이었다.

![thumbnail](https://cdn.jumpit.co.kr/images/61565/20233412113439576_1840_1256.jpg)

UI/UX 디자인을 전공한 프론트엔드 개발자 입장에서 디자인에서 고려하는 정보 접근성과 개발자 입장에서 고려하는 정보 접근성이 어디가 어떻게 다를까 알고싶은 마음에 신청하게 됐다.

결론부터 말하자면 다르지 않았다. 그리고 프로덕트의 접근성을 고려하는 일이 디자이너나 개발자, 각자의 할일에 한정되어 있는 일이 아니라 기획, 디자인에서부터 개발 구현까지 프로덕트를 만드는 팀이 함께 생각해야하는 일이라고 느껴졌다.

강의 중간중간에, 얼마나 우리가 소수를 배제하고 있는지 살짝 꼬집어주는 부분들이 있어서 좋았다. 예를 들어서 '**장애인이 우리 서비스를 사용할 리 없으니까** 접근성을 고려하지 않아도 괜찮다.', '접근성 함양은 **결국 장애인을 위한거니까** 고려하지 않아도 괜찮다.' 라는 생각 자체가 차별적이고, 프로덕트의 사용자를 배제하고 있는 사고방식이라는 것을 알려주셨다.


<br/>

> '누군가는 사용할 수 없는 서비스'라는 것은 서비스의 굉장한 취약점이고, 그 자체로 버그다.

> 가장 취약한 사용층을 최소 기준으로 두면 거의 모든 사용자의 문제가 자연스럽게 해결 될 수 있다.

위의 두 문장이 웹의 접근성과 UX의 이유를 상당 부분 설명할 수 있는 문장인 것 같다. 

지하철 엘리베이터는 원래 휠체어 사용자를 위해 설치된 시설물이지만, 실제로 사용하는 파이는 그 외가 더 크고, 전동 칫솔도, 누르는 방식으로 열리는 문 손잡이도 '원래 제품을 사용하는데 불편함이 있는 사람들을 위해 디자인, 설계 된' 제품들이지만 비장애인이 쓰기에도 훨씬 편하고 에너지가 덜 든다.

취약한 사용층을 타겟으로 UX 개선점을 찾는 것이 가장 효율적으로 UX를 개선하는 방향이고, 프로덕트를 만드는 맞는 방향이다.

<br/>

한국에서의 장애라는 단어는 많이 오염된 느낌이 있다. 단어 그 자체는 중립적이지만, 사회적인 논의와 접근이 이루어지지 않아서 장애에 대한 적절한 교육이 충분히 이루어지지도 않고, 재사회화 단계에서는 거의 전무하다. 

색약도 장애고, 시력이 너무 안 좋은 것도 장애고, 손을 다쳐서 일시적으로 손을 못 쓰는 상황도 장애다. 서비스는 어떤 사람이던 사용할 수 있어야하고, 팀은 제공할 수 있는 최대한의 대체 정보, 대체 도구를 제공해야한다.

유니버셜 디자인과 같이 웹 접근성도 서비스, 프로덕트에 있는 장벽을 없애서 더 폭 넓은 사용자가 좋은 사용자 경험을 겪게 하는데에 핵심이 있다. 장애인 사용자를 고려해서 설계된 프로덕트는 비장애인 사용자의 UX도 함양시킬 수 있다.

<br/>

## 어떤 방식으로 접근성을 높여야하는지?

모범 사례들을  가져와도 우리 서비스에 맞지 않을 수 있다. 서비스와 상황에 맞게 접근성 원칙을 사용해야한다.

POUR + 장애 유형별 대응 → **서비스 접근성 지침**

<br/>

## 접근성 원칙 #POUR

### Perceivable
사용자가 제시되는 정보를 인식할 수 있어야한다는 원칙 <br/>
모든 정보가 텍스트 기반으로도 제공되어야함 <br/>

### Operable
사용자가 인터페이스를 조작할 수 있어야 함  <br/>
사용자가 조작할 수 없는 인터랙션이 없어야 함  <br/>
- 키보드 만으로도 조작가능하게 제공, <br/>
- 단순 클릭만으로 조작 가능 → 스와이프 UI와 클릭 버튼 병행 <br/>

### Understandable
사용자가 정보를 이해할 수 있어야 한다는 원칙 <br/>
움직이는 컨텐츠는 멈출 수 있게 제공 <br/>
직관적으로 알 수 있는 컨텐츠 제공 <br/>
사용자가 결과를 예측할 수 있는 인터랙션 제공 <br/>

### Robust
기술 발전에 따라 컨텐츠는 계속 접근할 수 있어야 한다는 원칙

<br/>

## 장애의 종류

### 정보를 ‘인식’하는 감각에 대한 장애 
약한 감각으로도 인식할 수 있도록 선명하게 제공 <br/>
다른 감각을 사용하여 인식할 수 있도록 제공 <br/>

### 인터랙션을 할 수 있는 움직임에 대한 장애
손이 아닌 다른 수단으로도 충분히 상호작용 할 수 있게 제공 <br/>
입에 스틱을 문 채로 드래그앤 드랍을 할 수 있을지? <br/>

### 정보 처리 과정의 결함을 유발하는 장애
낮은 이해도, 기억력 장애  <br/>
대표적인 예로 노화로 인한 장애 <br/>

### 광과민성 발작 장애

<br/>

# 🧑‍💻

> 개발한다는 것 = 사용자가 사용하는 프로덕트를 만드는 일


![](https://mimg.segye.com/content/image/2023/11/10/20231110513966.jpg)

강연을 듣고 난 후 며칠 뒤 KBO 시리즈가 개막했는데 사전 예매도 100% 온라인으로 진행되고, 취소표도 거의 온라인으로 거래되기 때문에 노인 야구 팬들이 소외되고 있다는 뉴스를 봤다.

웹의 발전 방향이 크게 바뀌어야할 것 같다.