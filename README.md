# React + Typescript를 이용해 만든 Todo-list

React와 Typescript 환경에서의 작업을 다시한번 상기시키며 공부해보고자 TodoList를 만들었습니다.

이 프로젝트에서는 소규모로 전역상태 관리를 하기 위해 상대적으로 가벼운 jotai를 사용했습니다.
## 목차
1. [실행 방법](#실행-방법)
2. [페이지 미리보기](#페이지-미리보기)
3. [주요 파일 및 코드](#주요-파일-및-코드)
4. [알게된 점](#알게된-점)


### 실행 방법

```
npm install
```

```
npm run dev
```

---

### 페이지 미리보기
![chrome_UsueUOcEK2](https://github.com/f-lab-edu/my-todo/assets/73930706/36590440-a82a-42d4-8955-0a4c56b2718f)



---

### 주요 파일 및 코드 

#### atom.ts
```typescript
import { atom } from "jotai";

export const todoAtom = atom(
  window.localStorage.getItem("todo")
    ? JSON.parse(window.localStorage.getItem("todo") as string)
    : []
);

export const tabStateAtom = atom("all");
```
전역적으로 관리 할 값인 atom을 저장하는 파일입니다.

todoAtom은 리스트의 값이며 localStorage에 localStorage에 "todo"가 없으면 빈 배열을, 그렇지 않다면 "todo"배열의 값을 넣어주어 초기화 했습니다.

제가 만든 TodoList는 각각 All, Active, Done 이 세 상태값으로 구분해서 보여 줍니다.

tabStateAtom은  이 상태값을 관리하는 atom입니다.


#### TodoForm.tsx
```typescript

import { useAtom } from "jotai";
import { useRef } from "react";
import { todoAtom } from "@atom/atom";

type SaveInfoStateType = "all" | "active" | "done";

export interface ISaveInfo {
  id: number;
  todo: string;
  state: SaveInfoStateType;
}

const TodoForm = () => {
  const todoRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useAtom(todoAtom);
  const todoList: ISaveInfo[] = todo;

  const submitTodo = () => {
    if (todoRef.current && todoRef.current.value !== "") {
      // atom값 변경 후 localStorage변경
      todoList.push({
        id: Date.now(),
        todo: todoRef.current.value,
        state: "active",
      });
      setTodo([...todoList]);
      window.localStorage.setItem("todo", JSON.stringify(todoList));
      todoRef.current.value = "";
    } else {
      alert("할 일을 입력 해 주세요.");
    }
  };
  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submitTodo();
        }}
      >
        <input type="text" ref={todoRef} placeholder="어떤 일을 하시겠어요?" />
        <button type="button" onClick={submitTodo}>
          전송
        </button>
      </Form>
    </Wrapper>
  );
};

```
TodoForm에서 실질적으로 TodoList에 들어갈 데이터를 저장합니다.

비제어 컴포넌트로써 submit, click 이벤트로 ref의 value를 기존 todoAtom에 저장되어있는 값 todo에서 추가된 값을 push 후 얕은 복사 후 setTodo로 값을 변경해주며, localStorage에도 값을 수정합니다.

#### SelectTab.tsx
```typescript
import { useAtom } from "jotai";
import { tabStateAtom } from "@atom/atom";

const SelectTab = () => {
  const [tabState, setTabState] = useAtom(tabStateAtom);
  const selectTab = (tab: string) => {
    setTabState(tab);
  };
  return (
    <Wrapper>
      <Tab>
        <li className={tabState === "all" ? "on" : ""}>
          <button onClick={() => selectTab("all")}>All</button>
        </li>
        <li className={tabState === "active" ? "on" : ""}>
          <button onClick={() => selectTab("active")}>Active</button>
        </li>
        <li className={tabState === "done" ? "on" : ""}>
          <button onClick={() => selectTab("done")}>Done</button>
        </li>
      </Tab>
    </Wrapper>
  );
};
```

SelectTab에서 현재 사용자가 보고싶어 하는 tab의 상태를 업데이트 하게됩니다.
이 stateAtom값을 클릭한 tab 내 list의 파라미터값으로 변경합니다.

#### MyList.tsx
```typescript
import MyListItem from "./MyListItem";
import { useAtomValue } from "jotai";
import { tabStateAtom, todoAtom } from "@atom/atom";
import { ISaveInfo } from "./TodoForm";

const MyList = () => {
  const todoList = useAtomValue<ISaveInfo[]>(todoAtom);
  const tabState = useAtomValue(tabStateAtom);
  const tabTodoList =
    tabState === "all"
      ? todoList
      : todoList.filter((v) => v.state === tabState);

  return (
    <>
      {tabTodoList.length > 0 ? (
        <Wrapper>
          {tabTodoList.map((item) => (
            <MyListItem key={item.id} item={item} />
          ))}
        </Wrapper>
      ) : (
        <ListNotice>
          {tabState === "done" ? (
            <>
              조금만 더
              <br /> 힘내 보아요!
            </>
          ) : (
            <>
              할일을
              <br /> 작성해주세요!
            </>
          )}
        </ListNotice>
      )}
    </>
  );
};
```
todoAtom에 저장되어있는 list의 값들을 불러와 View로 보여주는 부분입니다.

tabTodoList의 값은 현재 tab에서 선택된 state값에 해당하는 list입니다.

이를 통해 각각 state에 맞는 list를 노출하게 됩니다.

해당 state에 item이 없다면 응원의 메세지를 노출시킵니다.

---

### 알게된 점
어떤것을 import를할 때 path를 보기좋게 하기위해 path alias를 설정하려고 생각했고 알고있던대로 tsconfig.json에 설정을 해 주었으나 작동이 되지 않았습니다.

그래서 검색을 하던 중 이번 프로젝트는 Vite를 사용 한다는 점이 떠올라서 해당 키워드를 검색했더니 역시 이 문제였습니다.

Vite에서는 vite.config.ts에서 따로 설정을 해 주어야 한다는것을 알게 되었습니다.

따라서 vite.config.ts의 defineConfig에
```typescript
resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") }
    ],
  },
```
와 같은 형식으로 넣은 후 확인 해보니 잘 작동이 되었지만 모듈을 찾을 수 없다는 Compile error가 떠, tsconfig.json에도 path alias를 적용시켜주어 해당 오류까지 제거 할 수 있었습니다.


<div align="right">
  
[목차로 돌아가기](#목차)

</div>
