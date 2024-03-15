import { useState } from "react";
import styled from "styled-components";

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

const MyListItem = ({ desc }: { desc: string }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <ListItem>
      <ListWrap>
        <Checkbox
          className={isSuccess ? "is-success" : ""}
          onClick={() => setIsSuccess((prev) => !prev)}
        ></Checkbox>
        {desc}
      </ListWrap>
      <button>X</button>
    </ListItem>
  );
};

export default MyListItem;
