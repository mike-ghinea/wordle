import styled from "styled-components";

const KeyboardWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  height: 8rem;
  width: 90vw;

  @media (min-width: 645px) {
    height: 10rem;
    width: 40rem;
  }
`;

const KeyboardRowWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const KeyboardCell = styled.button<{
  $disabled: boolean;
  $correct: boolean;
  $wrongLocation: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
  font-size: 0.5rem;

  @media (min-width: 645px) {
    margin: 0.2rem;
    font-size: unset;
    min-width: 3.5rem;
    height: 2.5rem;
  }

  ${(props) => props.$disabled && "background-color: grey;"}
  ${(props) => props.$wrongLocation && "background-color: #b59f3b;"}
  ${(props) => props.$correct && "background-color: green;"}
`;

export default { KeyboardWrapper, KeyboardRowWrapper, KeyboardCell };
