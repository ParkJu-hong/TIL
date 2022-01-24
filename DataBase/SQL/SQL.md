<h2>DATABASE를 사용하는 이유</h2>
: File l/o는 서버에서 클라이언트에게 보내는 것을 말한다. 그렇게되면 클라이언트에서 혹은 서버에서 항상
필터링을 해야되는 데, 서버의 부하가 심하기 때문에 데이터베이스라는 서버(?)를 따로 사용하는 것이 일반적이다.
SQL은 DATABASE에 Query(요청, 질의문)을 해서 응답을 받아올 수 있도록 하는 데이터베이스 언어이다.

<br><br>


<h4>데이터베이스 관련</h4>


```js
1. 데이터베이스 생성
CREATE DATABASE 데이터베이스_이름
2. 데이터베이스 사용 (npm init, git init 과 비슷)
USE 데이터베이스_이름
3. 생성한 데이터베이스에 테이블생성
CREATE TABLE 데이터베이스_이름(
  // 필드이름 필드 타입 그외의 속성 순으로 선언하게 된다
  id int PRIMARY KEY AUTO_INCREMENT, // PRIMARY KEY면서 자동 증가되도록 설정
  name varchar(255),
  email varchar(255) // 문자열을 255 씩 쓰겠다는 말이다.
)
4. 테이블 정보 확인
DESCRIBE 데이터베이스_이름
```

<br><br>


<h4>SQL</h4>
: SQL문법은 여기보다 잘 설명되어있는 곳이 많으니,, 내가 틀린 문장들을 적어보도록 하겠다.


1. SELECT * FROM Persons WHERE FirstName LIKE 'a%'
   : Persons테이블에 FirstName 특성에서 a로 시작하는 값을 가져오란 뜻이다.
     이때 SELECT는 데이터 셋에 포함될 특성을 특정한다. *은 모든 데이터타입을 의미하고
     'hello wolrd' <<== 문자열
     2 <<== 숫자
     15 + 3 <<== 간단한 연산


2. SELECT * FROM Persons WHERE FirstName = 'Peter' AND LastName = 'Jackson'
   : 모든 특성을 Persons 테이블로부터 FirstName특성이 Perter인경우만 그리고 LastName특성이 'Jackson'경우만
     가져오란 뜻이다.

     이때 WHERE은 = 뿐만아니고 <=, <, >=, > 도 가능하다.


3. SELECT * FROM Persons WHERE LastName BETWEEN 'Hansen' AND 'Pettersen'
   : 모든 특성을 Persons 테이블로부터 LastName인 특성에서 Hansen과 Pettersen사이에 있는 값들을 가져오라는 뜻


4. SELECT DISTINCT 특성
   ```js
   SELECT
    DISTINCT
      특성_1
      ,특성_2
      ,특성_3
   FROM 테이블_이름
   ```

5. ORDER BY 특성      // 오름차순
   ORDER BY 특성 DESC // 내림차순


6. INSERT INTO Persons VALUES('Jimmy', 'Jadson')
   INSERT INTO Persons (LastName) VALUES ('Olsen')
   : INSERT INTO VALUES을 사용하여 해당 테이블에 새로운 레코드 추가가능
     첫번째는 Persons테이블에 'Jimmy', 'Jadson'을 넣겠다는 뜻
     두번째는 Persons테이블의 LastName필드에 'Olsen'을 넣겠다는 뜻


7. UPDATE Persons SET LastName = 'Nilsen' WHERE LastName = 'Hansen'
   : Persons테이블의 LastName필드의 'Nilsen'을 'Hansen'로 바꾸겠다는 뜻


8. DELETE FROM Persons WHERE FirstName = 'Peter'


9. SELECT COUNT (*) FROM Persons


10. INNER JOIN


11. ORDER BY Country, City


12. UPDATE Customers
    SET City = 'Oslo'
    AND Country = 'Norway'


13.
    mysql> ALTER TABLE user
    -> ADD CONSTRAINT roleId
    -> FOREIGN KEY(roleId)
    -> REFERENCES content (userId);

    이렇게하니까 column의 key가 MUL이 되버림 멀티란 뜻일까?

14. PRIMARY KEY는 반드시 NOT NULL이여야함
