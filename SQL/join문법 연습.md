<h1>JOIN 문법 연습, 관계형 데이터베이스 연습</h1>
1. 우선 게시판을 만들고 그 게시판의 글쓴이를 테이블을 따로 만들어서 스키마를 구현할 예정임.

mysql> CREATE TABLE text(
    -> id INT(11) NOT NULL AUTO_INCREMENT,
    -> title VARCHAR(255) NOT NULL,
    -> desc TEXT NOT NULL,
    -> author_id INT(11) NOT NULL,
    -> PRIMARY KEY (id)
    -> );

mysql> DESCRIBE text;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255) | NO   |     | NULL    |                |
| description | text         | YES  |     | NULL    |                |
| author_id   | int          | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

mysql> DESCRIBE author;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | NO   |     | NULL    |                |
| job   | varchar(255) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+

mysql> INSERT INTO text(title, description, author_id) VALUES ('mysql', 'mysql is..', 1);
mysql> INSERT INTO author(name, job) VALUES ('chearin', 'gf');

mysql> SELECT text.id AS text_id, title, description, author.name AS author_name, job FROM text LEFT JOIN author ON text.author_id = author.id;
+---------+-------+-------------+-------------+------+
| text_id | title | description | author_name | job  |
+---------+-------+-------------+-------------+------+
|       1 | mysql | mysql is..  | chearin     | gf   |
+---------+-------+-------------+-------------+------+
