import styled from "styled-components";

interface PopupContainerProps {
  isVisible: Boolean;
}
export const LiveSerchBackground = styled.div<PopupContainerProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${(prop) =>
    prop.isVisible ? `rgba(0, 0, 0, 0.5)` : `transparent`};
  transition: 0.5s ease-out all;
  z-index: 15;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
  background-color: white;
  border-radius: 15px;
  width: 80%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(prop: any) => (prop.isVisible ? 1 : 0)};
  transform: ${(prop) =>
    prop.isVisible ? `translateY(0)` : `translateY(-900px)`};
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(1, 0, 0, 1);
  max-height: 100vh;
  overflow: auto;
`;
