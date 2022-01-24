<h1>mysql 모듈 사용하는 법 (With MVC)</h1>

=> mysql 모듈을 사용하면 nodejs로 서버를 구축할때 인메모리형태로 데이터를 저장하지 않고 mysql 데이터베이스를 사용할 수 있다.

<h1> 1. mysql에 접속해 sql문법으로 데이터베이스를 생성한다.</h1>

이때 프로젝트폴더에 .sql 즉, 스키마파일(sql문법으로 구성된)을 배치모드로 실행시켜서 똑같은 작업을 간단히 할 수 도 있다.

배치모드

ex) mysql -u root -p < server/schema.sql -Dcmarket

`mysql -u root -p < server/seed.sql -Dcmarket`

만약 sql을 잘못작성한 경우 잘못 생성된 데이터베이스를 삭제하고 다시 생성할 수 있다.

DROP DATABASE IF EXISTS [다시 생성하려는 데이터베이스] CREATE DATABASE [다시 생성하려는 데이터베이스]

<h1> 2. 서버 </h1>

npm install로 package.json에 기록된 필요한 모듈들을 다운받음,

<h2> 1) 환경변수 </h2>

이때 mysql도 포함될 것인데, mysql의 비밀번호를 .env에 기록하고 dotenv모듈을 통해 환경변수로 사용할 것. 이때

.gitinore 에 .env을 추가하여 깃에서 노출되지 않도록 해야한다.

<h2> 2) MVC(Model View Controllers) </h2>

MVC 소프트웨어 구조 패턴으로써, MVC을 사용하면 가독성, 코드 짤때는 물론이고, 같이 일할때 굉장히 편할 것이다.

Model : 데이터베이스와 연결되는 곳으로 sequelize를 쓰지않고 mysql모듈을 사용하는 Model은 sql문법을 사용할 것이다. (데이터베이스 쿼리는 비동기요청이다.)

View : 사용자에게 데이터를 보여주는 곳

Controllers : 예를들어 express를 쓸때 router함수를 사용하면 두번째 인자로 함수를 써줘서 사용자에게 response를 보내줘야하는 데, 그 함수들을 작성해서 모아두는 곳이다.

app.js : 보통 express의 설정을 담당하는 파일.

router(폴더) : mvc 패턴과 같이 router도 따로 나누어서 생각해보자

router는 웹개발에 있어서 컨트롤러로 진입할 수 있게 도와주는 endpoint이다. endpoint에 맞게 적절한 라우터를 작성해야하고, 해당 라우터에 컨트롤러를 연결해야 한다. 예를 들어 /items URL로 get요청을 보낼경우 items컨트롤러의 메소드가 실행될 수 있도록 만들 수 있다. (이렇게 endpoint에 따라 분리하여 파일 구 성을 할 수도 있다)

예를들어 express를 사용한다면

```jsx
const express = require('express');

const app = express();

const indexRouter = require('./routes/index');

const linksRouter = require('./routes/links');

app.use('/', indexRouter);

app.use('/links', linksRouter
```

이런식으로 app.use로 path를 크게 나눠준다 / 와 /links 처럼 그리고 이제 router로 가서 다음과 같이 세부적으로 나눠주는 것이다.

```jsx
// router

const express = require('express');

const router = express.Router();

const controller = require('../controllers');

router.get('/', controller.basic)

router.get('/:id', controller.id)

router.post('/', controller.post)
```

<h1> mysql moduel 사용법 </h1>

공식문서

생활코딩 ⇒ [https://opentutorials.org/course/3347/21175](https://opentutorials.org/course/3347/21175)

<h3> 1. db/index.js </h3>

db디렉토리에 index.js파일을 만들어서 거기서 mysql모듈과 mysql를 connect시켜야한다.

connection 한 후에 JavaScript에서 mysql을 사용할 수 있는 mysql모듈에서 제공하는 객체가 return 되므로

그 객체를 export하면 model/index.js에서 사용하면 된다. (with sql문법과 함께)

```jsx
const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection(
		{
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'cmarket'
		}
)

con.connect((error) => {
	if(error) throw error;
})

module.exports = con;
```

<h3> 2. (참고) config는 구성이란 뜻이다. </h3>

보통 MVC패턴과 비슷하게 config라는 폴더를 만들어서 다음과 같은 코드를 구현한다. 이는 mysql모듈에서 createConnection을 사용할때 필요한 객체에 대한 정보가 있다.

```jsx
const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_SPRINT_PASSWORD,
    database: '데이터베이스이름'
  },
  test: {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_SPRINT_PASSWORD,
    database: '데이터베이스이름2'
  }
};

module.exports = config;
```

<h3> 3. db/index.js에서 return 한 객체를 models/index.js에서 사용함 </h3>

이런식으로 sql문법과 사용자가 request하면서 서버에 보내는 정보들을 적절히 사용해서 mysql을 사용한다.

이제 이 객체에 담긴 함수들을 controllers에서 express를 사용하면서 사용자에게 응답을 해주게 된다.

```jsx
const db = require("../db");
/* 만약 require할때 폴더명만 있다면 폴더에 index라는 파일이름을 찾아 그 파일의 export를 사용한다 */

moduel.export = {
	path1: {
		get: (callback)=>{
			/* sql 문법 */
			const queryString = `SELECT * FROM 테이블이름`;
			db.query(queryString, (err, result) => {
				callback(err, result);
			})
		},
		getForId: (id, callback) => {
			const queryString = `SELECT * FROM 테이블이름 WHERE id = ?`;
			/* bulk insert라고 부름 이렇게 배열로 감싸주는게 컨벤션임*/
			const params = [id];
			db.query(queryString, params, (err, result) => {
				callback(err, result)
			})
		}
	},
	path2: {
		postUserInfo: (name, age, callback) => {
			const queryString = `INSERT INTO 테이블이름(필드이름, 필드이름2) VALUES ?`;
			const params = [name, age];
			db.query(queryString, [params], (err, result) => {
				callback(err, result)
			})
		}
	}
}
```

<h3> 4. controllers/index.js </h3>

models/index.js에서 mysql모듈에서 나온 객체로 mysql과 연결하는 작업을 거친것은 다음과 같은 코드에서 보여질 controllers에서 그 함수들을 사용하기 위함이다..!

```jsx
const models = require('../models');

moduel.export = {
	get: (req, res) => {
		models.path1.get((err, result) => {
			if(err){
				res.statusSend(404);
			}

			res.status(200).json(result);
		})
	},
	getForId: (req, res) => {

		if(req.params.id){
			return res.status(400).send('Id가 없어요옹');
		}

		models.path1.getForId(Number(id), (err, result) => {
			if(err){
				res.statusSend(404);
			}
			res.status(200).json(result);
		})
	},
	postUserInfo: (req, res)=>{
	const { name, age } = req.body;

	if(name === undefined || age === undefined){
		return res.status(400).send('body에 뭐가 안담겨 왔어요..');
	}

	models.path2.postUserInfo(name, age, (err, result) => {
		if(err){
			return res.statusSend(400);
		}
		res.status(200).send('유저정보가 정상 추가되었습니다..');
	})
	}
}
```

<h3> 5.  이제 express를 설정해주는 app.js와 express의 router를 사용하는 routers 디렉토리에서 controllers를 사용해보자 </h3>

```jsx
// app.js

const express = require('express');
const indexRouter = require('./routes');
// Cross-Origin Resource Sharing을 위함
const cors = require('cors');
// morgan은 현재 호출된 라우터가 어떤상태이고 어떤 결과값인지 잘 정리해서 보여주는 모듈임.
const morgan = require('morgan');
const app = express();
const port = 4000;

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms')
);
app.use(cors());
// extended란 옵션을 true로 둔다면 객체안에 객체를 파싱할 수 있게된다. (중첩된 객체허용)
// false면 중첩된 객체를 허용하지 않는 다는 뜻이다.
app.use(express.urlencoded({ extended: true }));
// express.json()전에는 body-parser라는 nodejs모듈을 사용했다..
app.use(express.json());
// indexRouter로 가보자 !
app.use('/', indexRouter);

module.exports = app.listen(port, () => {
  console.log(`      🚀 Server is starting on ${port}`);
});
```

```jsx
//routes/index.js

const express = require('express');
const router = express.Router();
const getRouter = require('./get');
const postRouter = require('./post');

router.use('/get', itemsRouter);
router.use('/post', usersRouter);

module.exports = router;
```

```jsx
// routes/get.js

const router = require('express').Router();
const controller = require('./../controllers');

router.get('/', controller.path1.get);
router.get('/:id', controller.path1.getForId);
```

```jsx
// routes/post.js

const router = require('express').Router();
const controller = require('./../controllers');

router.post('/', controller.path2.postUserInfo);

```

<h3> 개인적으로 궁금한거 정리.. </h3>

만약 mysql에서 관계형테이블을 볼려면 일일히 sql문법으로 확인해야하나 ? 바로 관계형으로 뜰 수는 없나.. ?

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);

이렇게 관계형테이블만드는 sql문법이 좀 약한 것 같다, 연습해야 할 듯..

bulk insert를 잘 생각해서 구현해야함

```jsx
// models/index.js

const db = require('../db');

module.exports = {
  items: {
    get: (callback) => {
      // TODO: Cmarket의 모든 상품을 가져오는 함수를 작성하세요
      const queryString = `SELECT * FROM items`;

      db.query(queryString, (error, result) => {
        callback(error, result);
      });
    },
  },
  orders: {
    get: (userId, callback) => {
      // TODO: 해당 유저가 작성한 모든 주문을 가져오는 함수를 작성하세요
      const queryString = `
        SELECT * FROM users AS u
        JOIN orders AS o
        ON u.id = o.user_id
        JOIN order_items AS oi
        ON oi.order_id = o.id
        JOIN items AS i
        ON oi.item_id = i.id
        WHERE u.id = ?
      `;

      const params = [userId]

      db.query(queryString, [params], (err, result)=>{
        callback(err, result);
      })
    },
    post: (userId, orders, totalPrice, callback) => {
      const queryString = `
        INSERT INTO orders (user_id, total_price) VALUES (?, ?)
      `
      const params = [userId, totalPrice];
      db.query(queryString, params, (error, result) => {
        if(result){
          const queryString = `
            INSERT INTO order_items (order_id, item_id, order_quantity) VALUES ?;
          `;
          const params = orders.map((el) => [
            result.insertId,
            orders.itemId,
            orders.quantity
          ]);
          db.query(queryString, [params], (error, result) => {
            callback(error, result);
          })
        }
      })
    }
  },
};

/*
  post 고친 것
  sql문법 띄어쓰기 INSERT INTO 테이블이름(필드이름) VALUES(데이터값)
  => INSERT INTO 테이블이름 (필드이름) VALUES (데이터값)

  bulk insert할때 db.query쓸때 const params = []을 db.query(,[params],)이렇게 써줬다가
  db.query(,params,) 이렇게 써줌 (상관없을거 같은데 무작정 다 고쳐보자..)

  order.itemId 인데 order.itemsId로 써서 아마 안됐던것 같다 ㅎㅎ (컴퓨터 부실까)
*/
```

<h1> 결론 </h1>

mysql모듈을 직접적으로 사용해도 되지만 더 편리한 Sequelize가 있다. 다음 블로깅은 Sequelize을 더 공부하고 써봐야겠다.. 인메모리형태로 휘발성으로 항상 메모리가 날아가는 프로그램을 만들었었는데, 이렇게 데이터베이스에 직접 저장해서 프로그램을 개발할 생각을 하니 설렌다 흐흐..
