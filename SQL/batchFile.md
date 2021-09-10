<h1>Batch File</h1>
: 중복되는 코드를 줄이기위해 함수나 객체 지향 프로그래밍이 생겨났듯, batch file을 사용하는 이유도 마찬가지로 mysql에서 .sql파일안에 sql문법
으로 구성된 코드들을 적어놓고 필요할때마다 mysql monitor에 일일이 명령어를 치는 것이 아닌, .sql파일을 실행시킴으로 중복되는 일들을 줄여준다.

.sql안에는 sql문법으로 구성된 코드가 있으며 대부분은 테이블을 만들고, 그 테이블에 INSERT INTO로 값을 넣거나, ALTER TABLE같은 것으로
관계형데이터베이스를 구현하는 역활을 하는 것 같다.

batch file을 사용하는 방법 ==>> mysql -uroot -p < ./경로/파일이름.sql

