import { useAtom } from "jotai";
import styled from "styled-components";
import { tabStateAtom } from "@atom/atom";
const Wrapper = styled.div`
  top: 0;
  margin-top: 20px;
`;

const Tab = styled.ul`
  display: flex;
  align-items: center;
  li {
    flex: 1;
    text-align: center;
    cursor: pointer;

    button {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #c8c8c8;
    }

    &.on button {
      color: #4acea3;
      border-bottom: 1px solid #4acea3;
    }
  }
`;

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

export default SelectTab;
