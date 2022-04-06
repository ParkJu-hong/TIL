## Nestjs+Graphql+TypeORM.md workflow

#### nestjs + graphql + typeorm 을 같이 쓰는 경우 플로우는 이러하다.
- 서버로부터 graphql문으로 요청이 들어옴
- 그 요청을 서버의 graphql이 받고 resolver 로직을 돌림
- resolver로직중에 db와 연결(비동기처리)등을 위해 service를 사용 service에서 준 리턴값을 resolver의 리턴값으로 사용
- resolver의 리턴으로 최종 응답


biz란 폴더에 네스트 모듈을 담아둔다. 네스트 모듈폴더안에는 다음과 같이 정리되어 있다.

### dto
보통 '모듈이름.arg.ts'라고 파일을 짓는다. 유효성검사를 할 수 있으며, 타입을 미리 정의해서 다른 클래스나 함수에서 리턴값이나 인자를 받을때
타입스크립트 문법에 따라 타입을 정의해주기위해 구현한다.

### entity
엔티티는 얼핏보면 dto와 별다를 것없이 타입을 정의해주는 구나라고 생각할 수 있지만 @Entity() 데코레이터가 있고, 
엔티티는 DB 테이블의 스키마를 정의해주는 것이라 생각하면 될 듯하다.

### factory
seed에서 mock데이터를 만들기위해 필요한 로직들이 있다.

### graphql
서버쪽에서 구현한 graphql문이 있는 곳이다. 해당 폴더에서 graphql 문법을 사용하여 resolver에서 query, mutation의 resolver들을 선언한다.

### resolver
Resolver는 GraphQL의 여러 가지 타입 중 Query, Mutation, Subscription과 같은 타입이 실제로 일을 하는 부분이라고 생각하면 된다.

### seed
실제로 DB에 목데이터를 초기화하고 재생성하는 로직을 구현하는 곳으로, factory를 사용한다.
npm run seed:run 시드모듈이름 
으로 목데이터를 생성가능하다.

### service
graphql로 서버로부터 요청이 들어오면, 해당 graphql문에 따라 실제 일을 하는 resolver에서 서비스로직을 사용한다.
seed에서 목데이터를 만드는데 필요한 로직을 factory에 모듈화해놓듯 분업을 해놓은 것으로 생각하면 될 듯 하다. 

### type
graphql의 resolver에서의 type과 service에서 리턴하는 타입이 같도록하기위해서 타입을 graphql과 맞도록 미리 정의 해 놓은 것이다.

### 모듈이름.module.ts