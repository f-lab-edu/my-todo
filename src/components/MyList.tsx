import styled from "styled-components";
import MyListItem from "./MyListItem";
import { useAtomValue } from "jotai";
import { todoAtom } from "@atom/atom";
import { ISaveInfo } from "./ListForm";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const MyList = () => {
  const todoList = useAtomValue<ISaveInfo[]>(todoAtom);
  return (
    <Wrapper>
      {todoList.map((item) => (
        <MyListItem key={item.id} item={item} />
      ))}
    </Wrapper>
  );
};

export default MyList;
