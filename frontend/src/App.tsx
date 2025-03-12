import "./App.css";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import { Keyboard } from "./app/features/keyboard/Keyboard";
import { Grid } from "./app/features/word/Grid";

import s from "./App.styles";

const App = () => {
  return (
    <>
      <ReactNotifications />
      <s.Wrapper>
        <Grid />
        <Keyboard />
      </s.Wrapper>
    </>
  );
};

export default App;
