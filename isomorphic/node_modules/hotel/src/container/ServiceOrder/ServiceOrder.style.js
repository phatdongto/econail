import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Component = styled.div`
  padding: 0px 10px;
  padding-bottom: 15px;
  background-color: white;
  margin-top: 10px;

  input,
  .chooseSalon {
    width: 100%;
    padding: 12px 20px;

    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;
const ServiceOrderWrapper = styled.div`
  background-color: rgb(252, 252, 252);
  position: fixed;
  padding: 0px 10px;
  top: 40%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 500px;
  box-shadow: 5px 10px 18px #888888;
  button {
    width: 100%;
    padding: 12px 20px;
    right: 10;
    left: 20;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;
export const Title = styled.div`
  font-size: 22px;
  font-family: Oswald;
  text-align: center;

  font-weight: 900;
  padding: 15px 0px;
`;
export const SubTitle = styled.div`
  padding: 10px 15px 10px 0px;
  font-size: 20px;
  font-family: Oswald;
  font-weight: 900;
  text-transform: uppercase;
`;
export default ServiceOrderWrapper;
