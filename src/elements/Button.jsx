const Button = ({ buttonText, disabled, onClick: clickHandler, style }) => {
  return (
    <button
      onClick={() => {
        clickHandler && clickHandler();
      }}
      className={`rounded p-2 bg-red-600 text-white disabled:opacity-50 ${style}`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
