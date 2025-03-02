---
title: "낙관적 업데이트와 React useOptimistic 훅"
description: 낙관적 업데이트와 React 19에 새롭게 추가된 useOptimistic 훅에 대해서 알아봅니다.
date: 2025-01-31 23:30:00
toc: true
tags:
  - react
  - optimistic updates
---

항해를 마친 후 새로운 기술 스터디를 시작했습니다.<br />
평소 회사에서는 vue를 사용하기 때문에 리액트의 새로운 기능에 대해서 알아보고 싶었고, 이를 통해서 여러 인사이트를 얻기 위해서 공식문서를 통해 새롭게 나온 기술에 대해서 학습해보는 시간을 가졌습니다.<br />
여러 훅이 새로 추가됐지만 그 중에서도 `useOptimistic`에 대해서 자세하게 알아봤습니다.

## 낙관적 업데이트(Optimistic Updates)란?

낙관적 업데이트란 서버에 요청을 보내기 전에 UI를 먼저 업데이트하는 것을 말한다.
요청이 항상 성공한다고 가정하고, 사용자의 액션에 따른 결과를 즉시 보여주기 때문에 사용자 경험을 향상할 수 있다.
물론 모든 요청이 항상 성공하는 것은 아니기 때문에 요청이 실패했을 때 이전 상태로 되돌리고 사용자에게 적절한 피드백을 제공하는 로직이 필요하다.

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

### useState로 낙관적 업데이트를 구현하는 방법

`useState`만 사용해도 낙관적 업데이트를 구현할 수 있다.
현재 좋아요 상태와 개수를 보여주고, 사용자가 버튼을 클릭하면 좋아요 추가/제거 api를 요청하는 `LikeButton` 컴포넌트를 구현했다.

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

- 요청을 보내기 전 현재 상태를 저장하기 위해 `currentState` 변수를 선언한다.
- `setState`를 호출해서 요청을 보내기 전에 기대되는 결과로 UI를 먼저 업데이트한다.
  - 좋아요 상태가 아닐 경우, 좋아요 상태로 변경하고 개수를 1 증가
  - 좋아요 상태일 경우, 좋아요를 해제하고 개수를 1 감소
- 요청이 성공했을 경우 서버의 응답으로 UI를 다시 업데이트한다.
- 요청이 실패했을 경우에는 `currentState`를 이용해서 다시 이전 상태를 복원한다.

---

## React19 useOptimistic

React 19에서 낙관적 업데이트를 쉽게 구현할 수 있는 `useOptimistic` 훅이 추가되었다.
훅 내부에서 초기 상태를 관리하기 때문에 실패 응답이 왔을 경우 자동으로 이전 상태로 복원하는 로직을 별도로 구현할 필요가 없다.

---

### useOptimistic 훅을 이용한 방법

```tsx
// LikeButton.tsx
interface State {
	isLike: boolean
	count: number
}

type Value = State['isLike']

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

컴포넌트의 동작을 자세히 살펴보면 다음과 같다.

먼저 `useOptimistic` 훅을 선언한다.
- `useState`가 반환한 state를 `useOptimistic`의 초기 값으로 전달한다.
- `setState`가 호출되어 컴포넌트가 리렌더링 될 때 마다 `useOptimistic`이 새로운 초기 상태와 함께 호출된다.

```tsx
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
```

`useOptimistic` 훅의 매개변수
- state
  - 훅의 초기 상태로 사용될 값
- updateFn
  - `optimisticState`(낙관적인 상태)를 계산하여 반환하는 함수이다.
  - 첫 번째 매개변수는 현재 상태, 두 번째 매개변수는 `toggleOptimisticIsLike` 함수의 인자로 전달된 값이다.
  - `toggleOptimisticIsLike` 함수가 호출되면 새로운 상태를 계산하여 반환한다.

`useOptimistic` 훅의 리턴 값
- optimisticState
  - 비동기 작업이 진행 중인 동안에 사용자에게 보여줄 낙관적인 상태이다.
  - 비동기 작업이 진행 중일 경우 `updateFn` 함수가 반환한 값과 동일한 값을 가진다.
  - 비동기 작업이 진행 중이지 않을 경우 초기 `state`와 동일한 값(state가 객체일 경우 동일한 참조)을 가진다.
- toggleOptimisticIsLike
  - `toggleOptimisticIsLike` 함수를 호출하면 `updateFn`이 호출되어 `optimisticState`가 업데이트된다.
  - 호출 시 전달 받은 인자가 `updateFn`의 두 번째 인자로 전달된다.

```tsx
const handleClick = () => {
  startTransition(async () => {
    const nextIsLike = !optimisticState.isLike

    // 💡 낙관적 업데이트
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
```

- `startTransition` 함수의 콜백 함수 내부에서 `toggleOptimisticIsLike` 함수를 호출한다.
- `toggleOptimisticIsLike`가 호출되면 `updateFn`이 실행되어 `optimisticState`가 업데이트된다.
- `optimisticState`가 변경되면, UI가 낙관적인 상태로 업데이트된다.
- `addLike`, `removeLike` 함수를 호출하여 api를 요청한다.
- 요청에 성공할 경우
	- 서버의 응답으로 `setState`를 호출하고, 컴포넌트가 리렌더링 된다.
  - `useOptimistic`이 새로운 초기 상태(state)와 함께 호출되어 낙관적인 상태로 업데이트된 화면이 유지된다.
- 요청에 실패할 경우
  - `setError`가 호출되어 컴포넌트가 리렌더링된다.
  - `useOptimistic`의 초기 상태가 변경되지 않았기 때문에 `optimisticState`가 다시 초기 상태로 되돌아가고, 사용자 액션 이전 화면으로 돌아간다.

```tsx title="updateFn의 동작 방식"
// 1. 기존 상태가 { isLike: false, count: 3 } 일 때
toggleOptimisticIsLike(true)

const newState = updateFn({ isLike: false, count: 3 }, true)
// => { isLike: true, count: 4 } 반환

// 2. 기존 상태가 { isLike: true, count: 4 } 일 때
toggleOptimisticIsLike(false)

const newState = updateFn({ isLike: true, count: 4 }, false)
// => { isLike: false, count: 3 } 반환
```

-> 사용자의 화면에는 아래 이미지처럼 보여진다.

![](/posts/react-use-optimistic/example-2.gif)*API 요청에 성공했을 경우*

![](/posts/react-use-optimistic/example-3.gif)*API 요청에 실패했을 경우*

---

## 요약

- 낙관적 업데이트란 비동기 작업이 완료될 때까지 기다리지 않고, 기대되는 결과를 먼저 사용자에게 보여주는 방식입니다.
- React 19에 추가된 useOptimistic 훅은 낙관적 업데이트를 쉽게 구현할 수 있도록 도와줍니다. 훅 내부에서 이전 상태를 관리하고, api 요청이 실패하면 자동으로 이전 상태로 복원되기 때문에 추가적인 상태 관리 로직을 줄일 수 있습니다.
- useOptimistic은 React form action 또는 transition과 함께 사용해야 합니다.

---

전체 코드는 [저장소](https://github.com/kyh196201/react-useOptimistic-example/blob/main/app/LikeButton.tsx)에서 확인할 수 있습니다.

잘못된 내용이 있을 수 있습니다. 피드백은 언제나 환영입니다! 🙂

---

## 참고

- https://medium.com/@kyledeguzmanx/what-are-optimistic-updates-483662c3e171
- [https://velog.io/@kimkanu/React-훅-useOptimistic](https://velog.io/@kimkanu/React-%ED%9B%85-useOptimistic)
- [https://velog.io/@jhjung3/Optimistic-Updates-구현하기-with-리액트-쿼리](https://velog.io/@jhjung3/Optimistic-Updates-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-with-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BF%BC%EB%A6%AC)