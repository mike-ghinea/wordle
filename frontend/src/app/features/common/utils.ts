import { Store } from "react-notifications-component";
import words from "./words.json";
import { useAppDispatch } from "../../hooks";
import { checkWord } from "../word/thunks";

export const handleEnter = (
  currentWord: string,
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  if (currentWord.length < 5)
    Store.addNotification({
      message: "Not enough letters",
      type: "info",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  else if (words.includes(currentWord)) dispatch(checkWord(currentWord));
  else
    Store.addNotification({
      message: "Your word is not in the word list",
      type: "info",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
};
