import { BouncePurple } from "../constants/customVictoryTheme";
import TicketIcon from "../assets/icons/greyticket.png";
function operateOnY(X: number, Y: number) {
  const minY = 176; // Minimum Y value
  const maxY = 900; // Maximum Y value
  const minOutput = 200; // Desired minimum output value
  const maxOutput = 230; // Desired maximum output value

  const inputRange = maxY - minY;
  const outputRange = maxOutput - minOutput;
  const scalingFactor = outputRange / inputRange;

  const output = minOutput + (Y - minY) * scalingFactor;

  return output;
}
/**
 * Represents a custom tooltip component for the chart.
 * @param {Object} props - The component props.
 * @param {string[]} props.text - The array of tooltip text lines.
 * @param {number} props.chartCount - The number of charts displayed.
 * @param {number} props.x - The x-coordinate of the tooltip in relation to the width/height of the chart.
 * @param {number} props.y - The y-coordinate of the tooltip in relation to the width/height of the chart.
 * @param {Object} props.datum - The data object associated with the tooltip.
 * @param {Object} props.activePoints - The active points in the chart.
 * @param {number} props.index - The index of the tooltip.
 * @param {Object} props.style - The style object for the tooltip.
 * @param {boolean} props.horizontal - Determines if the tooltip is horizontal.
 * @param {number} props.width - The width of the chart the tooltip is inside of.
 * @returns {JSX.Element} The rendered tooltip component.
 */
export function CustomTooltip(props: {
  text?: string[];
  chartCount: number;
  x?: number;
  y?: number;
  datum?: any;
  activePoints?: any;
  index?: number;
  style?: any;
  horizontal?: boolean;
  width?: number;
}) {
  const textToUse = props.text?.slice(0, props.chartCount) || [];
  /// when you add more charts the tooltip moves down, need to move the Y up to accomodate for it dependant on the amount of charts
  const yToUse = operateOnY(props.chartCount, props.y || 0);

  // calculate initial X to set orientation on left or right depending on if we are on the last X points on the chart and the data would overflow
  const initialXToUse =
    props.x && props.x > (props.width || 1000) * 0.75 ? props.x - 220 : props.x;
  return (
    <g>
      {/* point glyph */}
      <circle
        cx={props.x}
        cy={yToUse}
        r="3"
        stroke="#8e8e8e"
        stroke-width="1"
        fill={BouncePurple}
      />
      {textToUse.map((line, index) => {
        return (
          <g>
            <image
              href={TicketIcon}
              width={16}
              height={16}
              fill={
                ["purple", "blue", "green", "yellow", "tan", "red", "orange"][
                  index
                ]
              }
              x={(initialXToUse || 0) + 15} // 15 right space
              y={yToUse - 20 + index * 20} // 20 up + spacing (index * spaceSize )
            />
            {/* <rect
              width={16}
              height={16}
              fill={
                ["purple", "blue", "green", "yellow", "tan", "red", "orange"][
                  index
                ]
              }
              x={(initialXToUse || 0) + 15} // 15 right space
              y={yToUse - 20 + index * 20} // 20 up + spacing (index * spaceSize )
            /> */}
            <text
              x={(initialXToUse || 0) + 15 + 16 + 5} // right space + size of icon + spacing from icon
              y={yToUse - 7 + index * 20} // 7 up (try to have it in the middle of the icon ) + spacing (index * spaceSize )
              style={{
                fontFamily: `"Gill Sans", "Gill Sans MT", "Seravek", "Trebuchet MS", sans-serif`,
                fontSize: 14,
                letterSpacing: "normal",
                padding: 5,
                fill: "rgb(142,142,142)",
                stroke: "transparent",
                pointerEvents: "none",
                textAnchor: "start",
              }}
            >
              {line}
            </text>
          </g>
        );
      })}
      <line
        x1={(initialXToUse || 0) + 15}
        y1={yToUse + textToUse.length * 20 - 15}
        x2={(initialXToUse || 0) + 220}
        y2={yToUse + textToUse.length * 20 - 15}
        stroke={BouncePurple}
        stroke-width="2"
        stroke-dasharray="5,5"
      />
      <text
        x={(initialXToUse || 0) + 15} // right space
        y={yToUse + textToUse.length * 20} // 7 up (try to have it in the middle of the icon ) + spacing (index * spaceSize )
        style={{
          fontFamily: `"Gill Sans", "Gill Sans MT", "Seravek", "Trebuchet MS", sans-serif`,
          fontSize: 14,
          letterSpacing: "normal",
          padding: 5,
          fill: "rgb(142,142,142)",
          stroke: "transparent",
          pointerEvents: "none",
          textAnchor: "start",
        }}
      >
        {`Date:${props.datum.x.toISOString()}`}
      </text>
    </g>
  );
}
