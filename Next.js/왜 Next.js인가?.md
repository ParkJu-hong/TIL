# Next.js를 사용하는 이유
SEO(Search Engine Optimiztion, 검색 엔진 최적화)에 많이 쓰이는 SSR를 React에서
사용하기위해 사용한다.


### 정리하면, 일석이조인 Next.js ?!

Next.js는 React를 기반으로 한 Framework이며, SSR를 구현하고 SEO에 유리하기 때문에
사용한다. Next.js는 Server에서 받은 사용자의 접속 요청을 초기에 SSR방식으로 렌더링될
HTML을 보내고, 브라우저에서 JavaScript를 다운로드하고 React를 실행하기 때문에 SEO가
가능하다. 또한 다른 페이지로 이동할 경우 CSR방식으로 Server가 아닌 브라우저에서
처리함으로써 SPA장점도 유지할 수 있다.

## 정리
- Next.js를 사용하는 주된 이유는 SSR을 구현하기 위함이다.

- 초기에 SSR로 렌더링항 HTML을 보내기에 SEO에 유리해지고, 페이지를 변경할 때마다 CSR방식으로 처리하기 때문에 SPA장점도 유지할 수 있다.

- 코드 분할을 통해 초기 구동 속도를 빠르게 할 수 있다.

- Webpack 기반 환경을 통해 HMR을 적용하여 실시간 reload를 적용하는 등, 작업 환경을 커스터마이징하여 개발할 수 있다

출처 : https://ivorycode.tistory.com/19
