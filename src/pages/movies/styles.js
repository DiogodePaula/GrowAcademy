import styled from 'styled-components';

export const Div = styled.div`
  background: linear-gradient(to right, #2b385b, #045fb4, #045fb4, #2b385b);
  height: 90px;
`;

export const Article = styled.article`
  background-color: #2b385b;
  color: #ffffff;
  border: solid 2px #ffffff;
  border-radius: 20px;
  width: 40%;
  margin: auto;
  padding: 30px;
  margin-top: 1em;
  font-weight: 700;
  font-size: 1em;

  @media (max-width: 580px) {
    width: 100%;
    margin: 20px;
  }
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const Img = styled.img`
  /* display: flex; */
  justify-items: center;
`;

export const Button = styled.button`
  background: #ffffff;
  border: solid 2px #2b385b;
  border-radius: 5px;
  color: #2b385b;
  padding: 5px;
  font-weight: 700;
  width: 100px;
  &:hover {
    background-color: #2b385b;
    color: #ffffff;
    border: solid 1px #ffffff;
  }
`;

export const Table = styled.table`
  color: black;
`;
