import { Store } from "react-notifications-component";
import s from "./Grid.styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks";
import { handleEnter } from "../common/utils";
import { addLetter, removeLetter } from "./wordSlice";
import { getWord } from "./thunks";

export const Grid = () => {
  const wordGrid = useSelector((state: RootState) => state.word.grid);
  const row = useSelector((state: RootState) => state.word.row);
  const answerGrid = useSelector((state: RootState) => state.word.answerGrid);
  const word = useSelector((state: RootState) => state.word.word);
  const dispatch = useAppDispatch();

  const rows = wordGrid.map((line, row_index) => (
    <s.Row key={`${line} - ${row_index}`}>
      {line
        .padEnd(5, " ")
        .split("")
        .map((item, index) => {
          return (
            <s.Cell
              key={`${item}-${index}`}
              $letter={item.toUpperCase()}
              $state={answerGrid[row_index][index]}
            >
              {item.toUpperCase()}
            </s.Cell>
          );
        })}
    </s.Row>
  ));

  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      e.preventDefault();
      if (row > 5 || (row > 0 && answerGrid[row - 1].join("") === "ggggg"))
        return;

      if (e.key === "Enter") {
        handleEnter(wordGrid[row], dispatch);
      } else if (e.key === "Backspace") {
        if (wordGrid[row].length <= 0) return;
        dispatch(removeLetter());
      } else if (
        e.key.length === 1 &&
        e.key.toUpperCase() >= "A" &&
        e.key.toUpperCase() <= "Z"
      ) {
        if (wordGrid[row].length > 4) return;
        dispatch(addLetter(e.key));
      }
    };

    window.addEventListener("keydown", keypress);
    return () => window.removeEventListener("keydown", keypress);
  }, [wordGrid, row]);

  useEffect(() => {
    if (row < 1) return;
    if (answerGrid[row - 1].join("") === "ggggg") {
      let message = "";
      switch (row) {
        case 1:
          message = "Lucky!";
          break;
        case 2:
          message = "Incredible!";
          break;
        case 3:
          message = "Amazing!";
          break;
        case 4:
          message = "Great!";
          break;
        case 5:
          message = "Nice!";
          break;
        default:
          message = "In the nick of time!";
      }
      Store.addNotification({
        message: message,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      return;
    }
    if (row > 5) {
      dispatch(getWord());
      if (word)
        Store.addNotification({
          message: `Bummer! The word was ${word.toUpperCase()}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
    }
  }, [answerGrid, row, word]);
  return <s.Grid>{rows}</s.Grid>;
};
