import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ToggleThemeProvider";

export default function ToggleSwitch() {
  const { toggleTheme, switchState } = useTheme();

  const handleOnChange = () => {
    toggleTheme();
  };

  return (
    <SwitchWrapper onClick={handleOnChange}>
      <HiddenCheckbox 
        type="checkbox" 
        checked={switchState}
        readOnly // Prevents input from being modified directly
      />
      <StyledLabel $checked={switchState}>
        <Slider $checked={switchState} />
      </StyledLabel>
    </SwitchWrapper>
  );
}

const SwitchWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledLabel = styled.label`  
  cursor: pointer;  
  width: 4.1rem;  
  height: 3rem;  
  background: ${({ theme, $checked }) => ($checked ? theme.colors.elementBackground : theme.colors.buttonBackground)};  
  display: block;  
  border-radius: 1.5rem;  
  position: relative;
  transition: background 0.3s;
`;

const Slider = styled.span`
  position: absolute;
  height: 2.5rem;
  width: 2.5rem;
  left: ${({ $checked }) => ($checked ? "0.3rem" : "1.6rem")};    
  bottom: 0.25rem;
  background-color: ${({ theme, $checked }) => ($checked ? theme.colors.textParagraph : theme.colors.white)};
  transition: left 0.3s, background-color 0.3s;
  border-radius: 50%;
`;
