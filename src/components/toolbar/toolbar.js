// Toolbar.js
import React from 'react';

const Toolbar = ({ onFormat }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onFormat('bold')}><b>B</b></button>
      <button onClick={() => onFormat('italic')}><i>I</i></button>
      <button onClick={() => onFormat('underline')}><u>U</u></button>
    </div>
  );
};

export default Toolbar;