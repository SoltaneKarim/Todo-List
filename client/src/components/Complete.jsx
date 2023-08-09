import React, { useState } from 'react';

const Complete = ({ done, onToggleDone }) => {
  const [isDone, setIsDone] = useState(done);

  const handleLabelClick = () => {
    const newDoneValue = !isDone;
    setIsDone(newDoneValue);
    onToggleDone(newDoneValue);
  };

  return (
    <div className="checkbox-wrapper-10">
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleLabelClick}
        className="tgl tgl-flip"
      />
      <label
        onClick={handleLabelClick}
        data-tg-on="Yeah!"
        data-tg-off="Nope"
        className={`tgl-btn ${isDone ? 'tgl-on' : 'tgl-off'}`}
      ></label>
    </div>
  );
};

export default Complete;
