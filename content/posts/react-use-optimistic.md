---
title: "낙관적 업데이트와 React useOptimistic 훅"
description: 낙관적 업데이트와 React 19에 새롭게 추가된 useOptimistic 훅에 대해서 알아봅니다.
date: 2025-03-02 18:00:00
toc: true
tags:
  - react
  - optimistic updates
---

## React19 스터디 (계기)

항해 3기 동기들과 함께 React 19에 새롭게 추가된 기능에 대해서 학습하는 스터디를 했습니다.
회사에서는 Vue를 사용하지만, React의 새로운 기능을 보면서 인사이트를 얻을 수 있었고, 평소 열심히 읽지 않던 공식 문서를 자세히 볼 수 있는 시간이었습니다. 😊

여러 기능이 추가되었지만 가장 제 관심을 끈 것은 `useOptimistic` 훅이었습니다.
`useOptimistic` 훅을 이용해서 간단한 좋아요 컴포넌트를 구현하고, 낙관적 업데이트에 대해서 알아봤습니다.

## Optimistic Updates(낙관적 업데이트)

낙관적 업데이트란 서버에 요청을 보내기 전에 UI를 먼저 업데이트하는 것을 말한다.
요청이 항상 성공한다고 가정하고, 사용자의 액션에 따른 결과를 즉시 보여주기 때문에 사용자 경험을 향상할 수 있다.
물론 모든 요청이 항상 성공하는 것은 아니기 때문에 요청이 실패했을 때 이전 상태로 되돌리고 사용자에게 적절한 피드백을 제공하는 로직이 필요하다.

- 참고
- https://www.linkedin.com/pulse/understanding-optimistic-pessimistic-updates-web-focus-salman-jabbari-oyjle

- 언제 사용하는지
인스타그램과 벨로그의 좋아요 버튼과 같은 UI에 많이 사용되지만 사용자의 액션이 있고, 빠른 응답을 제공하면 좋은 기능에 적용해볼 수 있을 것 같다.

이전에 쇼핑몰의 관심 브랜드를 추가하는 기능을 구현한 적이 있는데, 낙관적 업데이트에 대한 지식이 없었을 때라 아래와 같이 구현했다.

1. 사용자가 좋아요 버튼을 클릭
2. 현재 좋아요 여부에 따라서 관심 브랜드 추가/제거 api 요청
3. 서버의 응답이 도착하고, 응답에 따라 UI 업데이트

낙관적 업데이트를 적용하면 이렇게 바꿀 수 있다.

1. 사용자가 좋아요 버튼을 클릭
2. 현재 좋아요 여부에 따라서 UI를 먼저 업데이트
3. 관심 브랜드 추가/제거 api 요청
4. 성공 응답이 도착했을 경우 화면을 다시 업데이트
5. 실패 응답이 도착했을 경우 화면을 다시 이전으로 되돌리고, 사용자에게 실패했다는 피드백을 제공

## useOptimistic

### useOptimistic 훅이란?

React 19에서 낙관적 업데이트를 쉽게 구현할 수 있도록 추가된 훅이다.
훅 내부에서 초기 상태를 관리하기 때문에 실패 응답이 왔을 경우 자동으로 이전 상태로 복원하는 로직을 별도로 구현할 필요가 없다.

### useState로 낙관적 업데이트를 구현하는 방법

```tsx
import { startTransition } from 'react'
import { Heart } from "lucide-react"
import { addLike, removeLike } from "@/app/services"

interface State {
	isLike: boolean
	count: number
}

// LikeButton.tsx
function LikeButton() {
  const [state, setState] = useState<State>({ 
		isLike: false,
		count: 0
	})

  const handleClick = async () => {
		const currentState = state
		const nextState = {
			isLike: !currentState.isLike,
			count: currentState.isLike ? currentState.count - 1 : currentState.count + 1
		}

    // 낙관적 업데이트
		setState(nextState)

		try {
			const response = nextState.isLike ? await addLike() : await removeLike()
      // 서버 응답 결과로 UI를 업데이트
			setState(response)
			setError('')
		} catch (error) {
			if (error instanceof Error) {
        // 요청에 실패했을 경우 이전 상태로 복원
				setState(currentState)
				setError(error.message)
			}
		}
	}

  return (
    <button onClick={handleClick}>
			{state.isLike ? '❤️' : '🤍'}
			<span>{state.count}</span>
		</button>
  )
}
```

- `useState`의 현재 값을 저장하기 위해 `currentState` 변수를 선언한다.
- `setState`를 호출해서 요청을 보내기 전에 UI를 먼저 업데이트한다.
- 요청이 성공했을 경우 서버의 응답으로 UI를 업데이트하고,
- 요청이 실패했을 경우 `currentState`를 이용해서 다시 이전 상태를 복원한다.

### useOptimistic을 이용해 구현하는 방법

```tsx
interface State {
	isLike: boolean
	count: number
}

type Value = State['isLike']

// LikeButton.tsx
function LikeButton() {
  const [state, setState] = useState<State>({ 
		isLike: false,
		count: 0
	})

  const [optimisticState, toggleOptimisticIsLike] = useOptimistic<State, Value>(
  // useOptimistic 훅의 초기 상태
  state,
  // updateFn은 동일
  (currentState: State, optimisticValue: Value): State => {
    return {
      isLike: optimisticValue,
      count: optimisticValue ? currentState.count + 1 : currentState.count - 1
    }
  })

  const handleClick = () => {
		startTransition(async () => {
			const nextIsLike = !optimisticState.isLike

      // 낙관적 업데이트
			toggleOptimisticIsLike(nextIsLike)

			try {
				const response = nextIsLike ? await addLike() : await removeLike()

        // 서버 응답 결과로 UI를 업데이트
				setState(response)
				setError('')
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message)
				}
			}
		})
	}

  return (
    <button onClick={handleClick}>
			{
        optimisticState.isLike ? 
        <Heart color="#d04e4e" fill="#d04e4e" size={80} /> :
        <Heart color="#d04e4e" size={80} />
      }
			<span>{optimisticState.count}</span>
		</button>
  )
}
```

위 코드는 다음과 같이 동작한다.

먼저 `startTransition`와 콜백 함수가 실행된다.
`toggleOptimisticIsLike` 함수가 호출되고 `optimisticState`를 업데이트된다.
`useOptimistic` 훅의 두 번째 파라미터를 `updateFn`이라고 부르는데, `toggleOptimisticIsLike` 함수가 호출될 때 전달받은 인자와 현재 상태를 이용해서 다음 상태를 계산하여 반환한다.
`updateFn`이 다음 상태를 반환하면 사용자의 화면에 즉시 업데이트된다.



### props를 이용해 초기 상태 전달받기

- 코드에 대한 설명
- 주의할 점

## useOptimistic에 대한 나의 생각


