import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import LineChart from "../Charts/LineChart";
import HighMap from "../Charts/HighMaps";

function Summary({ report, selectedCountryId }) {
  console.log("selectedCountryId:", selectedCountryId);
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then((res) => setMapData(res));
    }
  }, [selectedCountryId]);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </>
  );
}

export default Summary;
