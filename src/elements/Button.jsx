const Button = ({buttonText, disabled, onClick: clickHandler}) => {
    return (
        <button onClick={()=>{clickHandler && clickHandler()}} className="border rounded p-2 bg-red-600 text-white disabled:opacity-50" disabled={disabled}>
            {buttonText}
        </button>
    )
}

export default Button;