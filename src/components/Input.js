import React, { useState } from 'react';

function Input( { onSubmit } ) {
  const [text, setText] = React.useState('');

  const handleChange = e => setText(e.target.value);

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit(e);
      setText('');
    }
  };

  return (
    <div className="panel-block">
      <input
        class="input"
        type="text"
        placeholder="Todoを入力してください"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Input;
