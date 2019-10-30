import React from 'react';
import Button from './Button';

const ButtonPanel = () => {
  return (
    <section id="ButtonPanel">
      <div className="group">
        <Button name="AC" color="#eee" />
        <Button name="+/-" color="#eee" />
        <Button name={`\u0025`} color="#eee" />
        <Button name={`\u00f7`} />
      </div>
      <div className="group">
        <Button name="7" color="#eee" />
        <Button name="8" color="#eee" />
        <Button name="9" color="#eee" />
        <Button name="X" />
      </div>
      <div className="group">
        <Button name="4" color="#eee" />
        <Button name="5" color="#eee" />
        <Button name="6" color="#eee" />
        <Button name="-" />
      </div>
      <div className="group">
        <Button name="1" color="#eee" />
        <Button name="2" color="#eee" />
        <Button name="3" color="#eee" />
        <Button name="+" />
      </div>
      <div className="group">
        <Button name="0" color="#eee" wide={true} />
        <Button name="." color="#eee" />
        <Button name="=" />
      </div>
    </section>
  );
};

export default ButtonPanel;
