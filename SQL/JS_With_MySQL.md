<h1>자바스크립트와 MySQL 연동방법</h1>
<br/>
<h2>nodejs mysql moduel</h2> node.js 에서 mysql에 접속해서 쿼리하고, 결과를 처리할 수 있나요?

1. 
환경변수를 .env에다 저장하고 .env을 .gitignore 에 저장함
.env에는 코드에 노출되어선 안되는 것들을 적어놓는데, 이번에는 mysql root 비밀번호를 적도록 하겠다.

```js
// .env
MYSQL_PW=''
```

2. 
`` npm install mysql ``을 하여 nodejs에서 사용할 수 있는 mysql moduel을 다운받는다.

MVC(Model-View-Controller) design patten에 따라 개발할 것이기 때문에 server 디렉토리 안에 다음과 같은 디렉토리들을 구비해 놓는다.

`` config, controllers, db, models``

<h4>config</h4>
config는 구성이란 뜻으로 mysql moduel을 사용할때 처음으로 mysql과 접속을 만드는 함수가 있다. 그러한 함수에서 특정한 값이
지정되어있는 객체를 넘겨주어야하는데, 그 객체의 예시는 다음과 같이, host, user, password, database 즉 mysql에 접속할 수 있는 
정보들을 객체로 전달해주어야한다.

```js
    const dotenv = require('dotenv');
    dotenv.config();

    {
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PW,
        database: 'database_name'
    }

```

```js
    const mysql = require('mysql');
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PW,
        database: 'database_name'
    });

    // 이것은 express의 listen과도 같다. 서버에 정상접속하면 'Connected successfully'가 출력되도록
    // 접속이 안됐을 시 에러가 뜨도록 하는 코드이다.
    con.connect((err) => {
        if(err) throw err;
        console.log('Connected successfully');
    })

```

이때에 process.env.NODE_ENV에 따라 데이터베이스가 다르게 접속되도록 하기 위해선 config 디렉토리에 config.js를 만들어서 구현해
보도록 하겠다.

process.env는 자바스크립트 내장객체이고, 전역 변수이므로 별도의 import없이 사용가능하다. 

<strong>process.env.NODE_ENV을 사용할 것인데, process.env.NODE_ENV는 무엇일까?</strong>
process.env.NODE_ENV은 두 가지 기본 값이 있는 데, 하나는 production(배포)이고, 하나는 development(개발)이다.
배포 모드일때와 개발 모드일때는 코드를 다르게 번들링하고 실행시키는 것은 좋은 기능이다. 하지만 이를 쓰진 않고 그저 확인용으로만 사용할 것이다.

<h4>db/index.js<h4>

```js
    const mysql = require('mysql');
    const dotenv = require('dotenv');
    const config = require('../config/config');
    dotenv.config();

    const con = mysql.createConnection(
        config[process.env.NODE_ENV || 'development'];
    )

    con.connect((err) => {
        if(err) throw err;
        console.log('Connected successfully');
    })

    module.exports = con;
```

위와 같이 config를 쓰는 이유는 process.env.NODE_ENV가 'development'일때와 'production'일때를 나눠서 데이터베이스를 쓰기
위함이다. 그렇다면 다시 config를 구현해보겠다.

<h4>config/config.js</h4>

```js
    const dotenv = require('dotenv');
    dotenv.config();

    const config = {
        development: {
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_SPRINT_PASSWORD,
        database: 'cmarket'
    },
    test: {
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_SPRINT_PASSWORD,
        database: 'cmarket_test'
        }
    }
module.exports = config;
```

이렇게 process.env.NODE_ENV에 따라 데이터베이스를 다르게 쓸 수 있게끔 구현했다. config, db를 구현했으니 다음은 models를 구현
해보도록 하겠다.

<h4>models/index.js</h4>
여기에는 sql문법으로 연결된 데이터베이스와 CRUD를 할 수 있도록 함수가 구현되어있는 곳이다. 간단히 예시를 위해 Create와 Read만 
구현해보았다.

```js
    const db = require('../db');

    module.exports = {
        get: (id, callback) => {
            const queryString = `SELECT * FROM person WHERE (table_name = ?)`;

            const params = [Number(id)];

            db.query(queryString, params, (err, result) => {
                callback(err, result);
            })
        },
        post: (name, callback) => {
            const queryString = `INSERT INTO person(name) VALEUS (?)`;

            const params = [name];

            db.query(queryString, params, (err, result) => {
                callback(err, result);
            })
        }
    }
```

이제 이 함수들을 controllers/index.js가 사용하게 될 것이다.

<h4>controllers/index.js</h4>
controllers/index.js는 

















require과 import의 차이는?




