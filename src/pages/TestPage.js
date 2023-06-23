import React, { useState } from "react";

function MyComponent() {
  const [isDivVisible, setDivVisible] = useState(true);

  const handleInputFocus = () => {
    if (isDivVisible) {
      setDivVisible(false); // Hide the div when input is focused and it's currently visible
    }
  };
  const handleBlur = () => {
    if (!isDivVisible) {
      setDivVisible(true); // show the div when input is focused and it's currently visible
    }
  };

  return (
    <div>
      <input
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        placeholder="Type something..."
      />
      {isDivVisible && (
        <div>
          This div will disappear when you click on the input field without
          typing anything.
        </div>
      )}
    </div>
  );
}

export default MyComponent;
