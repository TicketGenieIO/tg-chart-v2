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
/**
 * Represents a chart component.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.config - The configuration object for the chart.
 * @param {Object} props.config.primary - The configuration for the primary chart.
 * @param {boolean} props.config.primary.min - Determines if the primary min chart is enabled.
 * @param {boolean} props.config.primary.max - Determines if the primary max chart is enabled.
 * @param {boolean} props.config.primary.avg - Determines if the primary avg chart is enabled.
 * @param {Object} props.config.secondary - The configuration for the secondary chart.
 * @param {boolean} props.config.secondary.min - Determines if the secondary min chart is enabled.
 * @param {boolean} props.config.secondary.max - Determines if the secondary max chart is enabled.
 * @param {boolean} props.config.secondary.avg - Determines if the secondary avg chart is enabled.
 * @returns {JSX.Element} The rendered chart component.
 */
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
  /**
   * Handles the zoom event and updates the selected domain.
   * @param {Object} domain - The zoom domain.
   */
  function handleZoom(domain: any) {
    console.log({ domain });
    setSelectedDomain(domain);
  }

  // Triggered by onBrushDomainChange and
  // alters VictoryZoomContainer zoomDomain prop
  function handleBrush(domain: any) {
    setZoomDomain(domain);
  }
  /**
   * Generates the tooltip text based on the chart point data.
   * @param {Object} ev - The event object.
   * @param {Object} ev.datum - The data object associated with the event.
   * @param {Object} ev.datum.secondary - The secondary price object.
   * @param {Object} ev.datum.primary - The primary price object.
   * @returns {string} The tooltip text.
   */
  function getTooltipText(ev: {
    datum: {
      secondary: PriceObject;
      primary: PriceObject;
    };
  }) {
    const { secondary, primary } = ev.datum;
    return `${
      !!config.primary.min ? `Primary min: ${primary?.min.toFixed(2)}` : ""
    }${
      !!config.primary.avg ? `\nPrimary avg: ${primary?.avg.toFixed(2)}` : ""
    }${
      !!config.primary.max ? `\nPrimary max: ${primary?.max.toFixed(2)}` : ""
    }${
      !!config.secondary.min
        ? `\nSecondary min: ${secondary?.min.toFixed(2)}`
        : ""
    }${
      !!config.secondary.avg
        ? `\nSecondary avg: ${secondary?.avg.toFixed(2)}`
        : ""
    }${
      !!config.secondary.max
        ? `\nSecondary max: ${secondary?.max.toFixed(2)}`
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
        width={800}
        height={500}
        scale={{ x: "time" }}
        theme={BounceTheme}
        containerComponent={
          <VictoryZoomVoronoiContainer
            voronoiDimension="x"
            labels={getTooltipText}
            labelComponent={<CustomTooltip chartCount={chartCount} />}
            responsive={true}
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
            responsive={true}
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
          // tickValues={[]} //getTicks
          tickFormat={(x) => {
            const date = new Date(x);
            return `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;
          }}
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
