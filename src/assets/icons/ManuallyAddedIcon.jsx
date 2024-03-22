export const ManuallyAddedIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      {...props}
    >
      <g fill="#e7fff7" stroke="#2ca87f" strokeWidth="1">
        <circle cx="15" cy="15" r="15" stroke="none" />
        <circle cx="15" cy="15" r="14.5" fill="none" />
      </g>
      <text
        transform="translate(10 20)"
        fill="#433a3a"
        fontSize="12"
        fontFamily="OpenSans, Open Sans"
      >
        <tspan x="0" y="0">
          M
        </tspan>
      </text>
    </svg>
  );
};
