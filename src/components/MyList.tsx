import styled from "styled-components";
import MyListItem from "./MyListItem";
import { useAtomValue } from "jotai";
import { tabStateAtom, todoAtom } from "@atom/atom";
import { ISaveInfo } from "./TodoForm";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ListNotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 130px);
  color: #8d8c8c;
  font-size: 24px;
  text-align: center;
  line-height: 1.5;
`;

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

export default MyList;
