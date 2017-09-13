import React, {PropTypes} from 'react';

const ButtonInput = ({className, id, text, name, onPress}) => {

  return (
        <button
          type="button"
          id={name}
          name={name}
          className="btn btn-info"
          onPress={onPress}>
          {text}
        </button>
  );
};


ButtonInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default ButtonInput;
