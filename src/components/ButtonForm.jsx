import React from 'react';
import Loader from 'react-loader-spinner';
import Button from './Button';

export default function FormButton({ isLoading = false, children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props}>
      {isLoading === true ? (
        <Loader type="ThreeDots" color="#FFF" height={10} width={50} />
      ) : (
        children
      )}
    </Button>
  );
}
