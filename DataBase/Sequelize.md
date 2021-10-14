## Sequelize
: Sequelize는 sql문법없이도 데이터베이스를 사용가능하게 해주는 ORM이다.
(ORM는 sql문법없이도 데이터베이스를 사용가능하게 해준다.)
ORM ==>> Object Relational Mapping, 객체-관계 매핑의 줄임말.

# Sequelize를 배우기 전
``npm install mysql``을 통해 mysql 모듈을 사용해서 JavaScript와 연결하여야했다.


```js
1. db/index.js는 데이터베이스와 연결하는 작업을 한다.
2. models/index.js은 SQL 문법을 활용하여 데이터베이스와의 CRUD을 담당한다.
3. controllers/index.js는 models/index.js을 불러와 models을 사용해서 웹서버가 요청 및
응답을 하기위해 필요한 함수에 연결하여 사용하면서 웹서버와 데이터베이스간의 연결을 도와준다.

이렇게 디렉토리별로, 파일별로 역활을 나눠서 하는 소프트웨어기법을 MVC라고 한다.

MVC(Model View Controller)

쉽게 식당에 비유하자면,

Model은 재료창고
Controller는 재료창고에서 음식을 꺼내 요리를 하는 곳
View는 요리된 음식을

```

![](https://images.velog.io/images/juho00ng/post/d3aa7e9e-47d8-4171-84d0-d04b99484c61/web%20example.png)

![](https://images.velog.io/images/juho00ng/post/7de96470-d9cc-4955-b666-28dc2afd3a0b/mvc%20%E1%84%89%E1%85%AE%E1%84%83%E1%85%A9%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3.png)


```js
// db/index.js
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.패스워드가 저장된 환경변수이름,
    database: '데이터베이스이름'
  });

moduel.exports = con;
```

```js
// models/index.js
const db = require("../db");

moduel.exports = {
    get: (callback) => {
    		const queryString = `SELECT * FROM 테이블이름`;
      		db.query(queryString, (error, result) => {
        	callback(error, result);
        }
    },
    post: (value1, value2,callback) => {
    	const queryString = `
		INSERT INTO 테이블이름(column1, column2) VALUSE(?, ?)
		`;
        const params = [value1, value2];

        db.queryString(queryString, [params], (error, result) => {
        	callback(error, result);
        })
    }
}

```

```js
controllers/index.js
const models = require('../models');

moduel.exports = {
   get: (req, res) =>{
    	models.get((error, result)=>{
            if(error){
            	return res.send(200).json(result);
            }
        })
    },
   post: (req, res) => {
   	models.post(req,query.value1,
                    req,query.value2,
                    (error, result)=>{
      			if(error) return res.sendStatus(500);
   	   		return res.send(201).json(result);
   	})
   }
}
```
<br><br><br>

# Sequelize를 배우고 난 후
: sql문법을 사용하지 않아도 된다.

**1. npm install --save sequelize**

**2. npm install --save-dev sequelize-cli**

**3. ORM설정
: sequelize-cli을 통해 ORM을 잘 사용할 수 있도록 bootstraping(프로젝트 초기 단계를 자동으로 설정할 수 있도록 도와주는 일)을 해줘야한다. **

``npx sequelize-cli init``

**bootstraping을 하고나면 다음과 같은 폴더, 파일들이 생성됌**

```js
config/config.json
models/
migrations/
seeders/
```

<br>


**4. 모델생성**

모델은 엔티티를 객체로 표현한 형태로, 데이터 구조를 기술하고, 데이터에 수행할 수 있는 명령의 모음을 의미한다.

엔티티란 고유한 id값을 가지고 있어서 다른 속성이 바뀌어도 구별이 가능한 객체를 말한다.

그렇다면 엔티티가 아닌 객체가 다른 속성이 바뀌면 그 객체는 그전의 객체랑 같은지 다른지 구분할 수가 없다.

어쨌든..

``npx sequelize-cli model:generate --name 모델이름적는란 --attributes 칼럼이름:sequelize데이터타입에 맞게 작성,lastName:string,email:string``


**그리고 데이터베이스를 sequelize가 사용할 수 있도록 migration(이주)해야한다.**

``npx sequelize-cli db:migrate``

<br>

**5. 다음과 같은 모델 생성을 하고나면 migratoins폴더와 models폴더 안에는 다음과 같은 파일들이 생성되게 된다.**

```js
models/모델이름.js
migrations/20201026082504-create-모델이름.js
```

`models/모델이름.js`은 models/index.js에서 최종 moduel.exports할때 객체로 내보내게되는 데, 그때 사용하기 위해 모델을 만들어놓는 곳이다.



### 모델을 잘 생성했다면, MVC에 따라 디렉토리를 나누고 작업을 할 것이다.


```js
Models <<== npx sequelize-cli init 명령어를 사용하면 자동생성됌
View <<== View는 express로 routing하는 것을 말함
Controllers <<== express로 routing을 할때 필요한 미들웨어 함수들을 구현
		 해 놓는 곳으로 Models에서 Sequelize의 인스턴스를 불러와
         	 데이터베이스와 연결하여 사용한다.

```

<br><br>


## Controller 작성법
**models/index.js가 moduel.exports하는 것을 콘솔로 찍어보면 다음과 같다.**

![](https://images.velog.io/images/juho00ng/post/570d57dd-dd23-43e1-9749-0c8da07b9b86/%E3%85%87%E3%85%88%E3%85%82%E3%85%87%E3%85%88.png)

url과 user는 나 본인이 모델을 생성한 모델 이름이다.
맨처음 나오는 키 url의 속성값 url은 sequelize 함수를 사용할 수 있다

```js
sequelize 함수
findAll()
findOne()
findOrCreate()
etc ...
```

그래서 controller는 앞서 말했듯이 model이 데이터베이스에서 데이터를 꺼내오면 controller에서  View, 웹서버가 뿌릴 수 있도록 함수 구현을 이쁘게 하면된다.

그렇다면 controller는 models에서 이렇게 저 객체를 가져오면 된다.

```js
	// 구조분해
	const { url: URLModel } = require('../models');
	// require문법중 폴더명만 적게되면 그 해당 index.js나 index.node를
	// 찾고 없을시 오류를 낸다.

	moduel.exports = {
post: (req, res) => {
    const { url } = req.body;

    if (!utils.isValidUrl(url)) {
      return res.sendStatus(400);
    }

    utils.getUrlTitle(url, (err, title) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }

      URLModel
        .findOrCreate({
          where: {
            url: url
          },
          defaults: {
            title: title
          }
        })
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json(result); // find
          }
          res.status(201).json(result); // Created
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
    });
  },
  redirect: (req, res) => {
    URLModel
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if (result) {
          return result.update({
            visits: result.visits + 1
          });
        } else {
          res.sendStatus(204);
        }
      })
      .then(result => {
        res.redirect(result.url);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  }
```


<br>

**데이터베이스를 배우기 전에는 데이터를 보존하지 못했는데, 데이터를 보존하면서 개발을 할 생각을 하니 설렌다.. 열심히 복습하고 공부해서 개발할때 유용하게 써먹어야겠다!**
