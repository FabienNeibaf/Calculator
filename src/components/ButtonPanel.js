import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPanel = ({ clickHandler }) => {
  const handleClick = buttonName => clickHandler(buttonName);

  return (
    <section id="ButtonPanel">
      <div className="group">
        <Button name="AC" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="+/-" color="#f2f2f2" clickHandler={handleClick} />
        <Button name={`\u0025`} color="#f2f2f2" clickHandler={handleClick} />
        <Button name={`\u00f7`} clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="7" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="8" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="9" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="x" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="4" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="5" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="6" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="-" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button name="1" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="2" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="3" color="#f2f2f2" clickHandler={handleClick} />
        <Button name="+" clickHandler={handleClick} />
      </div>
      <div className="group">
        <Button
          name="0"
          color="#f2f2f2"
          wide={true}
          clickHandler={handleClick}
        />
        <Button name="." color="#f2f2f2" clickHandler={handleClick} />
        <Button name="=" clickHandler={handleClick} />
      </div>
    </section>
  );
};

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func,
};

export default ButtonPanel;
