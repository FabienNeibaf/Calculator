import React from 'react';
import Button from './Button';

const ButtonPanel = () => {
  return (
    <section id="ButtonPanel">
      <div className="group">
        <Button name="AC" />
        <Button name="+/-" />
        <Button name={`\u0025`} />
        <Button name={`\u00f7`} />
      </div>
      <div className="group">
        <Button name="7" />
        <Button name="8" />
        <Button name="9" />
        <Button name="X" />
      </div>
      <div className="group">
        <Button name="4" />
        <Button name="5" />
        <Button name="6" />
        <Button name="-" />
      </div>
      <div className="group">
        <Button name="1" />
        <Button name="2" />
        <Button name="3" />
        <Button name="+" />
      </div>
      <div className="group">
        <Button name="0" />
        <Button name="." />
        <Button name="=" />
      </div>
    </section>
  );
};

export default ButtonPanel;
