import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 50%;
  height: 50%;
`;

const Div = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;

export default function PreImage(props) {
  const [isImage, setIsImage] = useState(false);
  const image = new Image();
  image.onload = function () {
    setIsImage(true);
  };
  image.onerror = function () {
    setIsImage(false);
  };
  image.src = props.image;
  if (isImage) {
    return (
      <Div>
        <Img src={props.image} alt="preimage" />
      </Div>
    );
  }
  if (props.image.length === 0) return <p></p>;
  return <p>Bad Link</p>;
}
