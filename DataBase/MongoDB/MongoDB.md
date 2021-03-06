<h1>Mongo DB</h1>
: document database <<== 데이터를 테이블로 관리하는게 아닌
문서처럼 저장하는 데이터베이스, JSON과 유사, 필드-값 형태로 가지고 있고 컬렉션이라고 하는 그룹으로 묶어서 관리함

<h2>MongoDB가 사용되는 경우</h2>
1. 비구조적인 대용량의 데이터를 저장하는 경우
2. 클라우드 컴퓨팅 및 저장공간을 최대한 활용하는 경우
3. 빠르게 서비스를 구축하고 데이터 구조를 자주 업데이트 하는 경우


<br>
<br>
<br>

<strong>
mongoDB에선 json와 bson(binary json)을 사용한다.
bson은 이진법으로 표현이 되어있어서 json에 비해 가볍고 빠르다, 하지만 못 읽을 것이다..

그러해서 mongoDB에서 json형태로 클러스터를 import 하거나 export하는 것과
bson형태로 mongorestore나 mongodump하는 방법은 다음과 같다.
</strong>

<h2>JSON</h2>
: mongoimport, mongoexport

mongodump --uri "<Atals Cluster URL>"
Atals Cluster URL ==>> "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/database_name"

mongoimport --uri "<Atals Cluster URL>" --drop=<filename>.json


<h2>BSON</h2>
: mongorestore, mongodump

mongoexport --uri "<Atals Cluster URL>"  --collection<collection name> --out=<filename>.json

mongorestore --uri "<Atals Cluster URL>" --drop dump




<h1> MongoDB CRUD</h1>

<h2> 명령어 모음집..</h2>


  ```
show collections
show dbs
(터미널로 아틀라스 클러스터에 접속하는 명령어는 ? )
mongosh "mongodb+srv://cluster0.ccrfk.mongodb.net/myFirstDatabase" --username dbUser

use 데이터베이스이름
  ```



<h2>Create</h2>
1. 한 개 도큐먼트 추가방법
db.컬렉션이름.insert({
//_id없이 "필드-값" 형태로 적으면 _id을 알아서 생성해줌 (ObjectId타입 12byte, 24char)
})

/* 만약 한 컬렉션에 _id가 같은 도큐먼트가 있다면 duplicate key 에러가 날 것 이다.*/

2. 다수의 도큐먼트 삽입방법
db.컬렉션이름.insert([{}, {}, {}], {"ordered" : false});

/*
insert 명령어를 사용하면, 주어진 도큐먼트 배열의 인덱스 순서로 작업이 실행된다.
그러나 ordered를 추가하면, 순서에 상관없이 고유한  _id를 가진 도큐먼트는 모두 컬렉션에 삽입된다.
*/

3. 존재하지 않는 컬렉션에 insert명령어를 사용할 경우
: 사용자가 존재하지 않는 컬렉션에 도큐먼트를 넣는 경우, 그와 동시에 컬렉션이 만들어지게 된다.




<h2>Read</h2>

db.컬렉션이름.find({

}).pretty();

db.컬렉션이름.findOne({

})
// 주어진쿼리문에 부합하는 가장 첫번째 도큐먼트를 리턴함

db.컬렉션이름.find({

}).count();



<h2>Update</h2>

MQL(MongoDB Query Language) 연산자인 $inc을 사용함. ($inc는 increment의 약자일듯)
``$set 연산자는 주어진 필드에 지정된 값을 업데이트 해줌``
``$push 연산자는 배열로 이루어진 필드의 값에 요소를 추가하기 위한 연산자``

1. updateOne
주어진 기준에 맞는 다수의 도큐먼트 중 첫번째 도튜먼트 하나만 업데이트


2. updateMany
쿼리문과 일치하는 모든 도큐먼트를 업데이트

ex) db.컬렉션이름.updateMany(쿼리문, {"$inc": { "필드이름" :  값}})



3. 만약 업데이트시 필드이름을 잘못 기재한 경우
: Read시에 만약 컬렉션이름이 없다면 만들어 준 것처럼 업데이트시 필드이름을 쿼리문을 통해 찾지 못했다면 필드를 생성해준다.


4. $push
db.컬렉션이름.updateOne(업데이트할 도큐먼트를 결정하는 조건인 쿼리문,
{"$push": {서브도큐먼트를 삽입할 배열 타입의 값을 가지고 있는 필드: 추가할 서브 도큐먼트}})

ex) db.grades.updateOne({"student_id" : 250, "class_id": 339}, {"$push": {"scores": {"type": "extra credit", "score": 100}}})



<h2>Delete</h2>

deleteOne
주어진 기준에 맞는 다수의 도큐먼트 중 첫번째 도큐먼트 하나를 삭제

deleteMany
쿼리문과 일치하는 모든 도큐먼트를 삭제

db.컬렉션이름 .drop()
컬렉션 삭제
