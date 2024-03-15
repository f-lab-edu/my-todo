import { useRef } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  top: 0;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  gap: 0 10px;
  input {
    flex: 0.8;
    padding: 10px 2px;
    border: none;
    border-bottom: 1px solid #c8c8c8;
    font-size: 18px;
  }
  button {
    flex: 0.2;
    background-color: rgba(34, 202, 90, 0.2);
    border-radius: 4px;
    transition: background-color 0.25s ease-in-out;
    outline: none;
    &:hover,
    &:focus {
      background-color: rgba(34, 202, 90, 0.35);
    }
  }
`;

// 비제어 컴포넌트로 만든 후 전역으로 저장 / localstorage
const ListForm = () => {
  const todoRef = useRef<HTMLInputElement>(null);
  const submitTodo = () => {
    if (todoRef.current && todoRef.current.value !== "") {
      console.log(todoRef.current.value);
      todoRef.current.value = "";
    } else {
      alert("할 일을 입력 해 주세요.");
    }
  };
  return (
    <Wrapper>
      <Form>
        <input type="text" ref={todoRef} placeholder="어떤 일을 하시겠어요?" />
        <button type="button" onClick={submitTodo}>
          전송
        </button>
      </Form>
    </Wrapper>
  );
};

export default ListForm;
