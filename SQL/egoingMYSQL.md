DATABASE 1

변수
: 프로그램이 끝나면 데이터가 휘발됌.

file I/O
:파일은 성능, 보안등의 한계가 있다. 그러한 한계를 보완하기 위해서 생겨난 것이 "datebase"

database
: mysql, oracle, mongoDB etc ....

*** 이강의를 듣는 목표는 Mysql로 CRUD다 !!!!


구조적으로 데이터를 저장했을때 데이터를 가공하는 것이 휠씬 쉽게 될 것이다. like SpreadSheet, Datebase

구조화된 데이터 관리의 장점 : 자동화 가능
*파일의 명시된 text는 구조적이지 않기때문에 데이터를 가공하는 것이 어려웠으나, spreadSheet나 database같은 가공화된 데이터를 사용하면 자동화도 편리하고 데이터를 가공하기도 편리해진다.


통계를 기반으로 데이터베이스를 공부할 것
추천검색할것 : DATABASE ENGIN 2021
Relational DBMS: Oracle(관공서, 기업 // 비쌈..신뢰성..금융..), MySQL(쌈..SNS)
Document store: MongoDB
그 외에도 여러 데이터베이스 종류가 있음
NoSQL : 관계형데이터베이스에 맞지않는 데이터베이스를 관리하기 수월..!




DATABASE 2

SELECT * FROM 테이블이름 WHERE 특성 = '';

SELECT * FROM 테이블이름 WHERE 특성 = '' ORDER BY 특성 DESC;
==>> 내림차순 ORDER 는 순서란 뜻임



1 ) MySQL 설치
HOMEBREW 로 간편하게 설치가능




2 ) MySQL 구조
표 ==>> table
표를 감싸고있는 schema(database)
그러한 schema들을 감싸고있는 database_server(mysql등..)

3) MySQL 서버 접속
mysql -u root -p

(여기서 궁금증.. mysql.server start와 stop 명령어는 왜 하는 거지 ?? )


4 ) Schema 의 사용

database가 즉 schema라고 얘기했다.
데이터베이스 생성
CREATE DATABASE 테이블(표) 이름;

데이터베이스 삭제
DROP DATABASE 테이블(표) 이름;


데이터베이스들(스키마들)을 조회
SHOW DATABASES 또는 SCHEMA;

해당 테이브을 사용하겠다는 의미임.
USE 테이블(표)이름;


5 ) SQL(Structured Query Language)
 : 정리정돈을 유식하게 구조화되었다 그걸 영어로 Structured이다.
   요청한다, 질의한다 ==>> Query
   
 
  테이블의 X축 row, record, 행 이라고 불름
  테이블의 Y축 column, 열 이라고 부름



6 ) MySQL 테이블의 생성
 CREATE TABLE 테이블이름(
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY(id)
 ) 

 INT 데이터타입뒤에 괄호는 얼마나 값을 노출시킬 것인가이다. 노출이 안   되면
 *로 가려진다.


  MySQL cheat sheet를 찾을 것
  심지어 node express cheat sheet도 찾아볼 것


  NOT NULL 은 값이 없는 것을 허용하지 않겠다.
  NULL은 값이 없는 것을 허용하겠다라는 뜻

  AUTO_INCREMENT는 중복되지 않은 식별자를 갖게하기 위함
  
  VARCHAR
  VAR 은 변한다의 약자
  CHAR은 문자열의 약자

   MySQL 데이터타입 정리
   https://blog.martinwork.co.kr/mysql/2020/01/17/mysql-data-type.html
 
  
PRIMARY KEY(id)
는 중복을 방지하는 기능을 해줌 PRIMARY는 주요한이란 의미


7 ) MySQL의 CRUD


8 ) SQL의 INSERT 구문
검색 mysql create row ==>> insert syntax

INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, valu3, ...);


SHOW DATABASES;
USE table_name;
SHOW TABLES;

==>>table의 column을 볼 수 있음
:: DESC table_name;

NOW()는 함수다. MySQL에서 사용할 수 있는 함수들이 있다, 지금 언급하는 NOW()처럼


How to read row in mysql

SELECT * FROM table_name;

show tables;
show columns;



9 ) SQL의 SELECT 구문
SELECT 필드이름(column이름) FROM 테이블이름;

projection? 이 무슨 뜻?

WHERE column이름(필드이름) = '';


모르면 직접 찾아봐라..
(영어로 꼭!)


SELECT FROM WHERE AND ORDER BY DESC LIMIT 

데이터베이스를 잘한다라는 핵심은 SELECT를 적재적소에서 잘 쓰나..



10 ) SQL의 UPDATE 구문
DESC 테이블이름
===>>> 테이블의 칼럼조회

UPDATE 테이블이름 SET 칼럼이름='바꾸고싶은 값', 칼럼이름='바꾸고 싶은 값' WHERE id=바꿀 아이디 값;

WHERE문을 빠뜨리면 절대절대안됌 왜? row가 다 바뀔 것이기
레코드가 다 바뀔 것이기 때문에....


DELETE FROM WHERE

WHERE 꼭 인지해라... WHERE WHERE WHERE


DELETE FROM 테이블이름 WHERE id=지울 아이디 값;




SELECT * FROM test_table1 WHERE title LIKE "하%";
























































