import { VictoryTheme, VictoryThemeDefinition } from "victory";
export const TextGray = "#8e8e8e";
export const BouncePurple = "#4c59cb";
export const BounceTheme: VictoryThemeDefinition = {
  ...VictoryTheme.grayscale,
  area: {
    style: {
      ...VictoryTheme.grayscale?.area?.style,
      data: { stroke: BouncePurple, fill: "url(#chartGradientFill1)" },
    },
  },
  axis: {
    style: {
      axis: {
        ...VictoryTheme.grayscale?.axis?.style?.axis,
        stroke: TextGray,
        strokeWidth: 0.5,
      },
      ticks: {
        ...VictoryTheme.grayscale?.axis?.style?.ticks,
      },
      tickLabels: {
        ...VictoryTheme.grayscale?.axis?.style?.tickLabels,
        fill: TextGray,
        stroke: "transparent",
      } as any, // necessary for types to accept the fill prop
      grid: {
        ...VictoryTheme.grayscale?.axis?.style?.grid,
      },
    },
  },
  // dependentAxis: {},
  // independentAxis: {},
  // polarDependentAxis: {},
  // polarIndependentAxis: {},
  // bar: {},
  // candlestick: {},
  // chart: {},
  // errorbar: {},
  // histogram: {},
  // group: {},
  // legend: {},
  // line: {},
  // pie: {},
  // scatter: {},
  // stack: {},
  tooltip: {
    style: {
      ...VictoryTheme.grayscale?.tooltip?.style,
    },
    flyoutStyle: {
      // ...VictoryTheme.grayscale?.tooltip??.style?.flyoutStyle,
      fill: "#000000",
      stroke: "transparent",
      pointerEvents: "none",
    },
  },
  voronoi: {
    style: {
      ...VictoryTheme.grayscale?.voronoi?.style,
      labels: {
        ...VictoryTheme.grayscale?.voronoi?.style?.labels,
        fill: "transparent",
        textAnchor: "start",
      } as any, // we need this to set the fill as transparent so labels dont show and we can show our custom tooltip elements
      flyout: {
        ...VictoryTheme.grayscale?.voronoi?.style?.flyout,
        fill: "transparent",
        stroke: "transparent",
      },
    },
  },
};
