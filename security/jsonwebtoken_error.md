SELECT `id`, `userId`, `password`, `email`, `createdAt`, `updatedAt` FROM `Users` AS `Users` WHERE `Users`.`userId` = 'kimcoding' AND `Users`.`password` = '1234' LIMIT 1;

(node:4502) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate

- * Expected "payload" to be a plain object.

verification.https://rat2.tistory.com/24

- * secretOrPrivateKey must have a value

비밀 키는 server.js의 인증 객체 안에 있어야 합니다.???? <<== 무슨 뜻이지 ?

- * SSL Error: Unable to verify the first certificate

https://velog.io/@flobeeee/postman-https-%EC%9D%91%EB%8B%B5%ED%99%95%EC%9D%B8

- * Cannot set headers after they are sent to the client

헤더를 클라이언트에 보낸 후 설정할 수 없습니다.

- * Bad "options.expiresIn" option the payload already has an "exp" property.

토큰의 기한이 아직남아서 다시 하면 발생하는 에러임.. 이럴땐

sign에서 , { expiresIn: "30d" } 와 같은 옵션을 지워주면 됌
