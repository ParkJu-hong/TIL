





<h1>jsonwebtoken 사용법</h1>

## 1. 인증서 발급

mkcert라는 프로그램을 이용하여 인증서를 발급받을 것

$ brew install mkcert

$ mkcert -install

$ mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1

## 2. npm install jsonwebtoken

## 3.  controllers/tokenFunctions/index.js

```jsx
const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

sign(data, 액세스시크릿키) => 액세스토큰
sign(data, 리프레시시크릿키) => 리프레시토큰
verify(액세스토큰, 액세스 시크릿키) => data // ex) 유저정보
verify(리프레시토큰, 리프레시 시크릿키) => data // ex) 유저정보

/*
	만약 verify에 유저정보말고 사용자 권한이 있는 사용자는 그에 맞는 정보를 넣어줄 수도 있는 것임
*/

moduel.exports = {
	generateAccessToken: (data) => {
		// 엑세스토큰 받는 함수 맨 처음 로그인시
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "15s" });
  },
  generateRefreshToken: (data) => {
		// 리프레쉬토큰 받는 함수 맨 처음 로그인시
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
	sendRefreshToken: (res, refreshToken) => {
		// refresh토큰 응답해주는 함수
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true;
		});
	},
	sendAccessToken: (res, accessToken) => {
		// accessToken 응답해주는 함수
		res.json({ data: { accessToken }, message: "ok"});
	},
	resendAccessToken: (res, accessToken, data) => {
		// accessToken 재응답해주는 함수
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  },
  isAuthorized: (req) => {
		// 클라이언트 rest 요청 header에 authorizatio 안에 access 토큰이 있는 지 확인해주는
		// 함수 만약 있다면 유저정보를 반환 => 로그인이 됨이 만약 확인된다면 사용자 권한을 줄 수 있는
		// 데이터를 줄 것
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
  checkRefreshToken: (refreshToken) => {
		// RefreshToken이 있음을, 또는 유효기간이 유효한지 전체적인 RefreshToken을 확인함
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  }
};
```
