import styled from "styled-components";
import { deviceWidth } from 'lib/commonData'

export const Container = styled.div`
  display: flex;
  align-items; center;
  a {
    width: fit-content;
    color: #39C3E6 !important;
    border-radius: 4px !important;
    font-size: .75rem !important;
    padding: 0.125rem 0.625rem !important;
    text-transform: none;
    margin-right: 0.625rem;
    background: #143F54;
    white-space: nowrap;
  }

  a.disabled {
    border-color: transparent;
    cursor: pointer;
    opacity: 0.5;
  }

  a.disabled:hover {
    border: 1px solid #49BFE0;
    opacity: 0.8;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 100%;
  }
`;

export const NavigateButtonContainer = styled.div`
  display: flex;
  button {
    background: #143F54;
    border-radius: 4px;
    outline: none !important;
    border: none;
    height: 25px;
    width: 25px;
    margin: 0px 2px;
    &.left {
      svg {
        transform: rotate(90deg);
      }
    }

    &.right {
      svg {
        transform: rotate(-90deg);
      }
    }
  }
`

export const NavContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Graident = styled.div`
  display: block;
  position: absolute;
  right: 0;
  background: linear-gradient(270deg, #01273A 14.48%, rgba(1, 39, 58, 0) 100%);
  width: 4rem;
  height: 100%;
`