const ErrorIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      {...props}
    >
      <g fill="#fff6f6" stroke="#fe3a3a" strokeWidth="1">
        <circle cx="15" cy="15" r="15" stroke="none" />
        <circle cx="15" cy="15" r="14.5" fill="none" />
      </g>
      <path
        d="M8.237,18.551H11.5v3.267H8.237Zm0-11.435H11.5v8.168H8.237Z"
        transform="translate(4.763 0.885)"
        fill="#fe3a3a"
      />
    </svg>
  );
};

export default ErrorIcon;
