import s from "./Keyboard.styles";
import { addLetter, removeLetter } from "../word/wordSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks";
import { handleEnter } from "../common/utils";

const getUppercase = (key: string) => {
  switch (key) {
    case "↵":
      return "ENTER";
    case "←":
      return "DELETE";
    default:
      return key.toUpperCase();
  }
};

const getAriaLabel = (key: string) => {
  switch (key) {
    case "↵":
      return "enter";
    case "←":
      return "backspace";
    default:
      return "add " + key;
  }
};

const getFunction = (
  word: string,
  key: string,
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  switch (key) {
    case "↵":
      return () => handleEnter(word, dispatch);
    case "←":
      return () => {
        if (word.length === 0) return;
        dispatch(removeLetter());
      };
    default:
      return () => {
        if (word.length > 4) return;
        dispatch(addLetter(key));
      };
  }
};

const KeyboardRow: React.FC<{ letters: string }> = ({ letters }) => {
  const word = useSelector((state: RootState) => state.word.grid);
  const row = useSelector((state: RootState) => state.word.row);
  const answerGrid = useSelector((state: RootState) => state.word.answerGrid);
  const disabledLetters = useSelector(
    (state: RootState) => state.word.disabledLetters,
  );
  const correctLetters = useSelector(
    (state: RootState) => state.word.correctLetters,
  );
  const wrongLocationLetters = useSelector(
    (state: RootState) => state.word.wrongLocationLetters,
  );
  const dispatch = useAppDispatch();

  const disableKeyboard = row > 5 || answerGrid[row - 1]?.join("") === "ggggg";

  return (
    <s.KeyboardRowWrapper>
      {letters.split("").map((letter) => (
        <s.KeyboardCell
          key={letter}
          data-key={letter}
          aria-label={getAriaLabel(letter)}
          onClick={
            disableKeyboard
              ? undefined
              : getFunction(word[row], letter, dispatch)
          }
          $disabled={disabledLetters.includes(letter)}
          $correct={correctLetters.includes(letter)}
          $wrongLocation={wrongLocationLetters.includes(letter)}
        >
          {getUppercase(letter)}
        </s.KeyboardCell>
      ))}
    </s.KeyboardRowWrapper>
  );
};

export const Keyboard = () => {
  return (
    <s.KeyboardWrapper>
      <KeyboardRow letters="qwertyuiop" />
      <KeyboardRow letters="asdfghjkl" />
      <KeyboardRow letters="↵zxcvbnm←" />
    </s.KeyboardWrapper>
  );
};
