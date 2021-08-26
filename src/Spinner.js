import styled from "styled-components";

const SpinnningWheel = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid orange;
  /*   border-bottom-color:transparent; */
  border-left-color: transparent;
  border-right-color: transparent;
  transition: transform 0.4s ease;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => <SpinnningWheel />;

export default Spinner;
