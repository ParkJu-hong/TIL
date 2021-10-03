stylish는 웹사이트의 디자인을 사용자 마음대로 수정할 수 있는 기능

[https://userstyles.org/](https://userstyles.org/)

많이 쓰이는 css 속성을 나열함을 볼 수 있는 추천검색어

⇒ Global CSS Property Usage

Cascading ⇒ 폭포란 뜻

1순위 id, 2순위 class(리액트에선 className), 3순위  엘레멘트(Tag)

```css
li{color:red;}
#idsel{color:blue;}
#idsel{color:yellow;}
.classsel{color:green;}

h1, a{
	// 이렇게도 동시에 선택자 사용 가능
}

1순위 : #idsel{color:yellow;}
2순위 : #idsel{color:blue;}
3순위 : .classsel{color:green;}
4순위 : li{color:red;}
```

# 레이아웃(Layout)

## 인라인 VS 블럭레벨

a태그처럼 자신과 자신을 둘러싸고있는 텍스트와 함께 나열되는 즉, 줄바꿈이 되지 않는 태그를 **인라인엘리먼트.**

인라인엘리먼트가 좋을 수도 있고, 블럭레벨엘리먼트가 좋을 수도 있다. 상황에 따라 쓰임이 다르다.

```css
h1{display:inline;}
a{display:block;}

/* 이렇듯 얼마든지 바꿔줄 수 있음*/
```

## 박스모델(Box Model)

⇒ 엘리먼트와 엘리먼트 사이의 간격을 결정함

박스모델은 각각이 태그들이 웹페이지에 표현될때 부피감을 표현함

여백, 위치 크기, etc...

<p>는 파라그래프(단락)의 약자

```css
p {
border: width styled color;
padding: px;
margin: px;
}
```

## 마진겹침 현상(margin-collapsing)

### 부모자식간의 마진겹침 현상

부모태그가 아무런 시각적으로 효과가 없는 태그인데 마진이 있는 경우 자식태그와 마진겹침 현상이 난다.

```css
#parent {
	/* border: 1px solid tomato; */
	margin-top: 100px;
}
#child{
	background-color: powderblue;
	margin-top: 50px;
}
```

만약 #child의 margin-top이 100이 넘어가는 순간 마진겹침을 넘어서 그제야 움직이게 될 것이다.

마진겹침 현상 : 부모엘리먼트의 마진이 자식엘리먼트의 마진으로 사용되어지는 것

### 마진겹침현상2

마진값을 가지고있는 태그의 시각적인 요소가 없는 경우 마진값이 가장 높은 마진값이 그 태그의 마진값이 된다.

```html
<!doctype html>
<html>
<head>
    <style>
        #empty{
            margin-top:50px;
            margin-bottom: 100px;
/*            border:1px solid tomato;*/
        }
        #normal{
            background-color: powderblue;
            margin-top:100px;
        }
    </style>
</head>
<body>
    <div id="empty"></div>
    <div id="normal">normal</div>
</body>
</html>
/* From 생활코딩 */
```

## 포지션(postion) (중요) 🔥

⇒ 각각의 엘리먼트들의 위치를 결정함

엘리먼트의 위치를 지정하는 4가지 방법이 있다.

- static
- relative
- absolute
- fixed

### static(정적인) VS relative(상대적인)

relative는 부모태그에 대해서 상대적으로 위치를 지정할 수 있다.

```css
div {
	/* css의 position속성의 기본값 => static, 정적이란 뜻임
		 다른 말로 위치와 관련된 설정을 하지 않은 상태
	*/
	position:
	/* offset */
	left:  
	top:

	/*
		(left와 right, top과 bottom이 같이 있을 경우)
		left와 right중 left가 먼저
		top과 bottom중 top이 먼저
		position이란 속성을 주지않으면 offset이 안 먹을 것임
	*/
}
```

### absolute (절대 포지션)

position을 absolute를 적용하면 다른태그들의 영향을 받지않고 절대적인 위치로 웹페이지에서 위치된다. ex) 고정된 상단 header

position을 absolute로 지정을 하고 offset을 지정하지 않으면, 부모태그 바로 아래, 즉 자신이 원래 위치해야할 위치, position속성을 쓰지 않은 환경 (static)일때의 위치로 위치됌.

또한 position을 absolute를 적용하면 부모태그와 관련이 없게된다.

static이 아닌 부모태그가 나타나기전까지 무시하다가 static이 아닌 부모태그가 나타나면 그 부모의 위치를 기준으로 offset위치를 지정한다.
