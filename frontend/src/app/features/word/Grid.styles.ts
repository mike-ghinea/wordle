import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  height: 19rem;
  width: 16rem;
  gap: 0.3rem;
  padding-bottom: 1rem;

  @media (min-width: 645px) {
    height: 39rem;
    width: 32.4rem;
    gap: 0.6rem;
    padding-bottom: 2rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 100%;
  gap: 0.3rem;
  @media (min-width: 645px) {
    gap: 0.6rem;
  }
`;

const getBgColor = (state: string) => {
  switch (state) {
    case "g":
      return "green";
    case "y":
      return "#b59f3b";
    case "r":
      return "grey";
    default:
      return "transparent";
  }
};

const Cell = styled.div<{ $letter: string; $state: string }>`
  width: 100%;
  height: 100%;
  border: 2px solid ${(props) => (props.$letter === " " ? "grey" : "lightgrey")};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${(props) => getBgColor(props.$state)};
  font-size: 1rem;
  @media (min-width: 645px) {
    font-size: 3rem;
  }
`;

export default { Grid, Row, Cell };
