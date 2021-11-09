import * as React from 'react';
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
  const [isImage, setIsImage] = React.useState(false);
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
  } else {
    return <p>Bad Link</p>;
  }
}
