import React, { useState } from "react";
import styled from "styled-components";

export default function ToggleSwitch ({ onClick }) {
  const [switchState, setSwitchState] = useState(true);

  const handleOnChange = () => {
    setSwitchState(!switchState);
    onClick();
  }

  return (
    <StyledLabel htmlFor="checkbox" $checked={switchState}> 
      <input 
        id="checkbox" 
        type="checkbox" 
        checked={switchState}
        onChange={handleOnChange} />    
    </StyledLabel>
  );
}


const StyledLabel = styled.label`  
  cursor: pointer;  
  text-indent: -9999px;  
  width: 4.1rem;  
  height: 3rem;  
  background: ${({ theme, $checked }) => ($checked ? theme.colors.border :  theme.colors.buttonBackground)};  
  display: block;  
  border-radius: 1.5rem;  
  position: relative;
  transition: .12s;
  &:after {    
    content: "";    
    position: absolute;    
    left: ${({ $checked }) => ($checked ? "2px" : "calc(55% - 7px)")};    
    top: 50%; 
    transform: translateY(-50%);   
    width: 2.5rem;    
    height: 2.5rem;    
    background: ${({ theme, $checked }) => ($checked ? theme.colors.black : theme.colors.white)};
    border-radius: 90px;    
    transition: 0.3s;  
  }
`;