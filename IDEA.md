# 블로그 글 조회수

1. upstash 데이터 베이스 생성
2. upstash redis 패키지 설치
3. api 요청을 받을 수 있도록 api 라우트 설정
	3.1 redis.incr() 요청을 보내서 조회수 증가
	3.2 같은 사용자가 방문했을 때 중복으로 조회수를 늘리지 않도록 deduplicate 처리
4. 조회수 증가 요청을 보내는 컴포넌트 구현
5. 조회수를 보여주는 컴포넌트 구현

---

## 추가로 구현할 것

- 게시글 좋아요 개수
- 전체 사이트 방문자 수
	
---

## 궁금한 점

- Eviction을 꼭 활성화해야 하나?
	- https://upstash.com/docs/redis/features/eviction
- 조회수를 보여줄 때 revalidate를 해야하는 이유는?

## 참고

- https://witch.work/ko/posts/blog-new-view-counter
- https://upstash.com/blog/nextjs13-approuter-view-counter
- https://ansubkhan.com/blogs/view-counter
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- https://github.com/chronark/chronark.com/
