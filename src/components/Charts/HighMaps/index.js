import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  // Có thể di chuyển Map
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Dân số",
      joinBy: ["hc-key", "key"],
    },
  ],
};

export default function HighMap({ mapData }) {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));

      setOptions(() => ({
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [
          { ...initOptions.series[0], mapData: mapData, data: fakeData },
        ],
      }));
      if (!mapLoaded) setMapLoaded(true);
    }
  }, [mapData]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        // Key & Value giống nhau sẽ viết như này
        mapData,
      });
    }
  }, [options, mapData]);

  if (!mapLoaded) return null;

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={cloneDeep(options)}
        constructorType="mapChart"
        ref={chartRef}
      />
    </>
  );
}
