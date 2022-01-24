<h1>EC2 사용법</h1>

<h2>1. EC2에서 인스턴스 생성</h2>

<h2>2. ssh 통신에 필요한 .pem파일 생성</h2>

<h2>3. ssh 접속 명령어로 인스턴스에 접속</h2>

<h2>4. git clone으로 서버코드 다운</h2>

<h2>5. pm2로 서버 실행</h2>

### PW2 설치방법

1) npm install pm2 -g

2)

pm2를 설치한 후에 pm2 start app.js 라는 명령어를 사용하면 에러가 나온다 이는

서버를 실행시킬 경우 관리자 권한으로 pm2가 프로세스를 실행해야하는 데, 그러질 못하는 것이다.

pm2에 관리자 권환을 부여하기 위해서는 'authbind'라는 패키지를 추가 설치해야한다.

```jsx
터미널에서 아래 명령어를 차례대로 입력하여 authbind를 설치합니다.

sudo apt-get update

sudo apt-get install authbind

sudo touch /etc/authbind/byport/80

sudo chown ubuntu /etc/authbind/byport/80

sudo chmod 755 /etc/authbind/byport/80

authbind --deep pm2 update

authbind의 설치를 완료한 뒤, 먼저 'pm2 ls' 명령어를 통해 어떤 프로그램이 PM2의 프로세스 리스트에 등록되어 있는지 확인합니다.

'app' 프로세스가 리스트에 있다면 'pm2 delete app.js' 명령어를 통해 프로세스를 삭제합니다. authbind 설치 전에 실행되고 있던 프로세스에는 관리자 권한을 부여하지 못하기 때문입니다.

PM2에 관리자 권한을 부여하기 위해서는 'authbind --deep' 명령어를 앞에 추가해야 합니다.

 'authbind --deep pm2 start app.js' 명령어를 통해 서버를 다시 실행하면 이번에는 문제없이 작동할 것입니다.
```

3 ) 사용방법

```jsx
"pm2 stop" 프로세스 중지
"pm2 restart"  프로세스 재시작
"pm2 ls"   프로세스 목록 보기
"pm2 log" 프로세스 로그 보기
```

