import React, { useState } from "react";

import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryBrushContainer,
  createContainer,
} from "victory";
import { data } from "../constants/data";
import { PriceObject } from "../types";
import { BouncePurple, BounceTheme } from "../constants/customVictoryTheme";
import { CustomTooltip } from "./CustomTooltip";
// ZoomContainer is the top graph
// BrushContainer is the bottom graph
const VictoryZoomVoronoiContainer: any = createContainer("zoom", "voronoi");
type chartTypeConfig = {
  min: boolean;
  max: boolean;
  avg: boolean;
};
function Chart({
  config,
}: {
  config: {
    primary: chartTypeConfig;
    secondary: chartTypeConfig;
  };
}) {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [zoomDomain, setZoomDomain] = useState(null);
  const {
    primary: {
      min: primaryMinEnabled,
      max: primaryMaxEnabled,
      avg: primaryAvgEnabled,
    },
    secondary: {
      min: secondaryMinEnabled,
      max: secondaryMaxEnabled,
      avg: secondaryAvgEnabled,
    },
  } = config;
  const chartCount = [
    primaryMinEnabled,
    primaryMaxEnabled,
    primaryAvgEnabled,
    secondaryMinEnabled,
    secondaryMaxEnabled,
    secondaryAvgEnabled,
  ].filter(Boolean).length;
  // Triggered by onZoomDomainChange and
  // alters VictoryBrushContainer brushDomain prop
  function handleZoom(domain: any) {
    console.log({ domain });
    setSelectedDomain(domain);
  }

  // Triggered by onBrushDomainChange and
  // alters VictoryZoomContainer zoomDomain prop
  function handleBrush(domain: any) {
    setZoomDomain(domain);
  }

  function getTooltipText(ev: {
    datum: {
      secondary: PriceObject;
      primary: PriceObject;
    };
  }) {
    const { secondary, primary } = ev.datum;
    return `${
      !!config.primary.min ? `primary.min: ${primary?.min.toFixed(2)}` : ""
    }${
      !!config.primary.avg ? `\nprimary.avg: ${primary?.avg.toFixed(2)}` : ""
    }${
      !!config.primary.max ? `\nsecondary.max: ${primary?.max.toFixed(2)}` : ""
    }${
      !!config.secondary.min
        ? `\nsecondary.min: ${secondary?.min.toFixed(2)}`
        : ""
    }${
      !!config.secondary.avg
        ? `\nsecondary.avg: ${secondary?.avg.toFixed(2)}`
        : ""
    }${
      !!config.secondary.max
        ? `\nsecondary.max: ${secondary?.max.toFixed(2)}`
        : ""
    }`;
  }

  return (
    <div>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            id="chartGradientFill1"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(85,105,245,0)" opacity={0.5} />
          </linearGradient>
          <linearGradient
            id="chartGradientFill2"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(0,105,1,0)" opacity={0.5} />
          </linearGradient>
          <linearGradient
            id="chartGradientFill3"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(85,105,0,0)" opacity={0.5} />
          </linearGradient>
          <linearGradient
            id="chartGradientFill4"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(85,0,245,0)" opacity={0.5} />
          </linearGradient>
          <linearGradient
            id="chartGradientFill4"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(245,0,100,0)" opacity={0.5} />
          </linearGradient>
          <linearGradient
            id="chartGradientFill4"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="4c59cb" opacity={0.5} />
            <stop offset="95%" stopColor="rgba(245,0,80,0)" opacity={0.5} />
          </linearGradient>
        </defs>
      </svg>

      <VictoryChart
        width={1000}
        height={500}
        scale={{ x: "time" }}
        theme={BounceTheme}
        containerComponent={
          <VictoryZoomVoronoiContainer
            voronoiDimension="x"
            labels={getTooltipText}
            labelComponent={<CustomTooltip chartCount={chartCount} />}
            responsive={false}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            allowZoom={true}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        {config.primary.avg && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill1)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.avg,
              ...rest,
            }))}
          />
        )}
        {config.primary.max && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill2)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.max,
              ...rest,
            }))}
          />
        )}
        {config.primary.min && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill3)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.min,
              ...rest,
            }))}
          />
        )}
        {config.secondary.min && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill4)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.min,
              ...rest,
            }))}
          />
        )}
        {config.secondary.avg && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill5)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.avg,
              ...rest,
            }))}
          />
        )}
        {config.secondary.max && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill6)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.max,
              ...rest,
            }))}
          />
        )}
      </VictoryChart>

      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={1000}
        height={100}
        scale={{ x: "time" }}
        theme={BounceTheme}
        containerComponent={
          <VictoryBrushContainer
            responsive={false}
            brushStyle={{
              fill: "white",
              fillOpacity: 0.2,
              stroke: "rgba(255,255,255,0.3)",
            }}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis
          tickValues={[]} //getTicks
          tickFormat={(x) => new Date(x).getFullYear()}
        />
        {config.primary.avg && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill1)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.avg,
              ...rest,
            }))}
          />
        )}
        {config.primary.max && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill2)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.max,
              ...rest,
            }))}
          />
        )}
        {config.primary.min && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill3)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.primary.min,
              ...rest,
            }))}
          />
        )}
        {config.secondary.min && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill4)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.min,
              ...rest,
            }))}
          />
        )}
        {config.secondary.avg && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill5)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.avg,
              ...rest,
            }))}
          />
        )}
        {config.secondary.max && (
          <VictoryArea
            style={{
              data: { stroke: BouncePurple, fill: "url(#chartGradientFill6)" },
            }}
            data={data.map(({ date: x, ...rest }) => ({
              x,
              y: rest.secondary.max,
              ...rest,
            }))}
          />
        )}
      </VictoryChart>
    </div>
  );
}

export default Chart;
