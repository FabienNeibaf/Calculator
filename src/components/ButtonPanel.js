import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPanel = ({ clickHandler }) => {
  const handleClick = buttonName => clickHandler(buttonName);

  return (
    <section id="ButtonPanel">
      <div className="group">
        <Button name="AC" color="#fafafa" clickHandler={handleClick} />
        <Button name="+/-" color="#fafafa" clickHandler={handleClick} />
        <Button name={`\u0025`} color="#fafafa" clickHandler={handleClick} />
        <Button name={`\u00f7`} clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="7" color="#fafafa" clickHandler={handleClick} />
        <Button name="8" color="#fafafa" clickHandler={handleClick} />
        <Button name="9" color="#fafafa" clickHandler={handleClick} />
        <Button name="x" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="4" color="#fafafa" clickHandler={handleClick} />
        <Button name="5" color="#fafafa" clickHandler={handleClick} />
        <Button name="6" color="#fafafa" clickHandler={handleClick} />
        <Button name="-" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="1" color="#fafafa" clickHandler={handleClick} />
        <Button name="2" color="#fafafa" clickHandler={handleClick} />
        <Button name="3" color="#fafafa" clickHandler={handleClick} />
        <Button name="+" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button
          name="0"
          color="#fafafa"
          wide={true}
          clickHandler={handleClick}
        />
        <Button name="." color="#fafafa" clickHandler={handleClick} />
        <Button name="=" clickHandler={handleClick} />
      </div>
    </section>
  );
};

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func,
};

export default ButtonPanel;
