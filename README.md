# XState로 우아한 퍼널 만들기

유어슈 **'ROAD TO PRO : Discover 2025'** 에서 발표한 **XState로 우아한 퍼널 만들기**의 데모 코드입니다.

## 브랜치 구성

각 브랜치에는 서로 다른 방식으로 구현된 퍼널(Funnel) 코드가 포함되어 있습니다.

- **global-state-funnel**: 페이지 4개와 전역 상태를 활용하여 구현한 퍼널
- **local-state-funnel**: 한 페이지 내에서 지역 상태를 활용하여 구현한 퍼널
- **xstate-funnel**: XState를 활용하여 구현한 퍼널

## 실행 방법

```bash
# 레포지토리 클론
git clone https://github.com/2wndrhs/xstate-funnel-demo.git
cd xstate-funnel-demo

# 원하는 브랜치로 이동
git checkout xstate-funnel

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 블로그 글

[XState로 우아한 퍼널 만들기](https://www.joonggon.me/posts/xstate-funnel)

## 세미나 발표 영상

[발표 영상 보러 가기](https://youtu.be/c9Ub-tDxzcw?si=d_0kWVv9GMvZ7hzM)
