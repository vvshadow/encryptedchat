import React from 'react';
import styled from 'styled-components';

const Buttonfld = () => {
  return (
    <StyledWrapper>
      <button className="open-file">
        <span className="file-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 71 67">
            <path strokeWidth={5} stroke="black" d="M41.7322 11.7678L42.4645 12.5H43.5H68.5V64.5H2.5V2.5H32.4645L41.7322 11.7678Z" />
          </svg>
          <span className="file-front" />
        </span>
        Open file
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .open-file {
    background-color: rgb(255, 255, 255);
    width: 140px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border: 1px solid rgb(217, 217, 217);
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 10px;
  }
  .file-wrapper {
    width: 15px;
    height: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
  }
  .file-wrapper svg {
    width: 100%;
  }
  .file-front {
    position: absolute;
    width: 100%;
    height: 70%;
    border: 2px solid rgb(0, 0, 0);
    border-bottom: 1px solid black;
    transform: skewX(-40deg);
    transform-origin: bottom right;
    background-color: white;
    transition: all 0.5s;
    bottom: 0;
  }
  .open-file:hover .file-front {
    height: 50%;
    transform-origin: bottom right;
    transform: skewX(-55deg);
  }
  .open-file:hover {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.048);
  }`;

export default Buttonfld;
