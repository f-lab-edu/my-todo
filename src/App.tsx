import TodoForm from "@components/TodoForm";
import MyList from "@components/MyList";
import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    102.7deg,
    rgba(253, 218, 255, 1) 8.2%,
    rgba(223, 173, 252, 1) 19.6%,
    rgba(173, 205, 252, 1) 36.8%,
    rgba(173, 252, 244, 1) 73.2%,
    rgba(202, 248, 208, 1) 90.9%
  );
  background-attachment: fixed;
`;
const Content = styled.div`
  width: 450px;
  height: 450px;
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DateTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const week: Record<string, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};
const today = new Date();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const dayStr = new Date().toString().toLocaleLowerCase().slice(0, 3);
function App() {
  return (
    <Wrapper>
      <Content>
        <DateTitle>
          {month}월 {day}일 {week[dayStr]}요일
        </DateTitle>
        <TodoForm />
        <MyList />
      </Content>
    </Wrapper>
  );
}

export default App;
