export const Button = ({ children, disabled, onClick: clickHandler, type }) => {
    let buttonClass = "";
    switch (type) {
      case "primary":
        buttonClass = "btn btn-primary"
        break;
      case "cancel": 
        buttonClass = "btn btn-cancel"
        break;
      case "confirm":
        buttonClass = "btn btn-confirm"
        break;
      default:
        break;
    }
    return (
      <button
        onClick={() => {
          clickHandler && clickHandler();
        }}
        className={buttonClass}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  