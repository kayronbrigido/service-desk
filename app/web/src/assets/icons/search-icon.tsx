import { IconProps } from ".";

export const SearchIcon = ({width = 24, height = 24, fill = '#fff'}: IconProps) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="search"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
  >
    <line
      id="secondary"
      x1={21}
      y1={21}
      x2={15}
      y2={15}
      style={{
        fill: "none",
        stroke: fill,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <circle
      id="primary"
      cx={10}
      cy={10}
      r={7}
      style={{
        fill: "none",
        stroke: fill,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
