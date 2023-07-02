import { OrientationTypes, VictoryTooltip } from "victory";

import { BouncePurple } from "../constants/customVictoryTheme";

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
}) {
  const textToUse = props.text?.slice(0, props.chartCount) || [];
  /// when you add more charts the tooltip moves down, need to move the Y up to accomodate for it dependant on the amount of charts
  const yToUse = operateOnY(props.chartCount, props.y || 0);
  function handleOrientation(ev: { _voronoiX: number; datum: any }) {
    console.log({ ev });
    if (ev.datum.x) {
      console.log({
        ev,
        props,
        voronoiX: ev._voronoiX,
        x: ev.datum.x.getTime(),
        textToUse,
        chartCount: props.chartCount,
        y: props.y,
      });
      //// if X >= maxX - relativetooltipwidthNumber = left
      //// else = right
    }
    return "right" as OrientationTypes;
  }
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
            <rect
              width={16}
              height={16}
              fill={
                ["purple", "blue", "green", "yellow", "tan", "red", "orange"][
                  index
                ]
              }
              x={(props.x || 0) + 15} // 15 right space
              y={yToUse - 20 + index * 20} // 20 up + spacing (index * spaceSize )
            />
            <text
              x={(props.x || 0) + 15 + 16 + 5} // right space + size of icon + spacing from icon
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
        x1={(props.x || 0) + 15}
        y1={yToUse + textToUse.length * 20 - 15}
        x2={(props.x || 0) + 220}
        y2={yToUse + textToUse.length * 20 - 15}
        stroke={BouncePurple}
        stroke-width="2"
        stroke-dasharray="5,5"
      />
      <text
        x={(props.x || 0) + 15} // right space
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
      <VictoryTooltip
        {...props}
        cornerRadius={0}
        constrainToVisibleArea
        orientation={handleOrientation}
      />
    </g>
  );
}
