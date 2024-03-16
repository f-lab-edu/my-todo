import styled from "styled-components";
import { ISaveInfo } from "./ListForm";
import { useAtom } from "jotai";
import { todoAtom } from "@atom/atom";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  &:hover {
    background-color: #f2f8fc;
  }

  button {
    padding: 3px;
  }
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &.is-success {
    color: #a7a7a7;
    text-decoration: line-through;
  }
`;

const Checkbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #c8c8c8;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &.is-success {
    background-image: url("./src/assets/check.png");
    background-color: #4acea3;
    border-color: #38bb90;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const MyListItem = ({ item }: { item: ISaveInfo }) => {
  const [todoList, setTodoList] = useAtom<ISaveInfo[]>(todoAtom);
  const Checkitem = () => {
    const updatedTodoList = todoList.map((v) => {
      if (v.id === item.id) {
        if (v.state === "active") {
          v.state = "done";
        } else {
          v.state = "active";
        }
      }
      return v;
    });
    setTodoList([...updatedTodoList]);
    window.localStorage.setItem("todo", JSON.stringify([...todoList]));
  };

  const deleteItem = () => {
    const filteredList = todoList.filter((v) => v.id !== item.id);
    setTodoList([...filteredList]);
    window.localStorage.setItem("todo", JSON.stringify([...filteredList]));
  };

  return (
    <ListItem>
      <ListWrap className={item.state === "done" ? "is-success" : ""}>
        <Checkbox
          className={item.state === "done" ? "is-success" : ""}
          onClick={Checkitem}
        ></Checkbox>
        {item.todo}
      </ListWrap>
      <button onClick={deleteItem}>X</button>
    </ListItem>
  );
};

export default MyListItem;
