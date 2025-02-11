import styled from "styled-components";

export const StyledTree = styled.div`
  
  border-radius: 7px;
li{
  font-size: 15px;
  
}
 ul,  li {
  position: relative;
}

 ul {
  list-style: none;
  padding-left: 20px;/*moved whole element right/left*/
  margin-top: 0px;/*moved whole element up/down*/

}
 li{
  display: flex;
  justify-content: space-between;
 }
 li::before,  li::after {
  content: "";
  position: absolute;
  left: -12px;/*moves tree left or right*/
}

 li::before {
  border-top: 2.5px solid rgb(148, 146, 146);
  top: 9px;
  /*increase - moves horizontal lines up or down*/
  width: 8px;
  height: 0;
  border-bottom-left-radius: 15px;
}

 li::after {
  border-left: 2.5px solid rgb(148, 146, 146);
  height: 130%;/*connects vertical lines to form one main line*/
  width: 0px;
  top: -5px;
  /*increase - decrease horizontal line length*/
}

 ul>li:last-child::after {
  height: 15px;
}


 li:not(:last-child) {
  margin-bottom:5px;
  /*increase - decrease distance between li items 13*/

}

`;
