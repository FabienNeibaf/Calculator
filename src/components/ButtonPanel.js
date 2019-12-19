import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPanel = ({ clickHandler }) => {
  const handleClick = buttonName => clickHandler(buttonName);

  return (
    <section id="ButtonPanel">
      <div className="group">
        <Button name="AC" clickHandler={handleClick} type="control" />
        <Button name={'\u232b'} clickHandler={handleClick} type="control" />
        <Button type="control" />
        <Button name="mod" clickHandler={handleClick} type="control" />
      </div>
      <div className="group">
        <Button name={'%'} clickHandler={handleClick} type="control" />
        <Button name="(" clickHandler={handleClick} type="control" />
        <Button name=")" clickHandler={handleClick} type="control" />
        <Button name={'\u00f7'} clickHandler={handleClick} type="control" />
      </div>
      <div className="group">
        <Button name="7" clickHandler={handleClick} type="numpad" />
        <Button name="8" clickHandler={handleClick} type="numpad" />
        <Button name="9" clickHandler={handleClick} type="numpad" />
        <Button name="x" clickHandler={handleClick} type="control" />
      </div>
      <div className="group">
        <Button name="4" clickHandler={handleClick} type="numpad" />
        <Button name="5" clickHandler={handleClick} type="numpad" />
        <Button name="6" clickHandler={handleClick} type="numpad" />
        <Button name="-" clickHandler={handleClick} type="control" />
      </div>
      <div className="group">
        <Button name="1" clickHandler={handleClick} type="numpad" />
        <Button name="2" clickHandler={handleClick} type="numpad" />
        <Button name="3" clickHandler={handleClick} type="numpad" />
        <Button name="+" clickHandler={handleClick} type="control" />
      </div>
      <div className="group">
        <Button name="+/-" clickHandler={handleClick} type="numpad" />
        <Button name="0" clickHandler={handleClick} type="numpad" />
        <Button name="." clickHandler={handleClick} type="numpad" />
        <Button name="=" clickHandler={handleClick} type="equal" />
      </div>
    </section>
  );
};

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func,
};

export default ButtonPanel;
