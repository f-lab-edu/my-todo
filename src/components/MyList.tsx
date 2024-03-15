import styled from "styled-components";
import MyListItem from "./MyListItem";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MyList = () => {
  return (
    <Wrapper>
      {[
        "공부",
        "게임",
        "청소",
        "식사",
        "운동",
        "운동",
        "운동",
        "운동",
        "운동",
        "운동",
        "운동",
      ].map((item, i) => (
        <MyListItem key={i} desc={item} />
      ))}
    </Wrapper>
  );
};

export default MyList;
