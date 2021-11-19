domain - 서버와 요청의 도메인이 일치하는 경우 쿠키 전송
path - 서버의 요청의 세부경로가 일치하는 경우 쿠키 전송
maxage/expires - 쿠키의 유효기간 설정
httpOnly - 스크립트의 쿠키 접근 가능 여부 설정
secure - HTTPS 에서만 쿠키 전송 여부 설정
sameSite - 같은 사이트에서만 쿠키를 사용할 수 있게 하는 설정


cross site request forgery, 즉 사용자가 보내는 요청을 다른 사이트(오리진이 아님)에서 위조하는 것 이다. 쿠키 방식의 인증을 사용하는 곳에서 사용이 가능하며 sameSite 옵션을 none이 아닌 것으로 사용하면, 서버는 클라이언트에 따라 신뢰할 수 있는 요청인지 아닌지를 판단할 수 있으므로, CSRF 공격을 방지할 수 있다.

해커는 GET에서 parameter를 바꾸어 변조된 요청을 보내게 할 수 있으며, POST의 경우도 쿼리 문자열 (x- www-form-urlencoded)변조가 가능하므로 공격할 수 있다. Cross origin의 경우 CORS 설정은 CSRF를 막는데 도움을 줄 수 있다.
