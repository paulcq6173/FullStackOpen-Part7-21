import PropTypes from 'prop-types';
import { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (!visible) {
    return (
      <div>
        <button className="btn-normal" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="togglableContent">
        {props.children}
        <button className="btn-normal" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

// Defines required string type property
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
