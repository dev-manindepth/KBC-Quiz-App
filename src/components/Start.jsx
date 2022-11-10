import { useRef } from "react";

const Start = ({ setUsername }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  return (
    <div className="welcome">
      <div className="game-heading">
        <h1 className="game-title">KAUN BANEGA CROREPATI </h1>
      </div>
      <div className="start">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your name"
          className="startInput"
        />
        <button className="startBtn" onClick={handleClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;
