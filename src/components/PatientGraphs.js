import { Card, CardContent, Typography } from "@material-ui/core";
import {
  processGender,
  processPatientData,
  processPieChartData,
} from "../helpers.js";

import Grid from "@material-ui/core/Grid";
import { PieChart } from "../components/PieChart";
import React from "react";

export const PatientGraphs = (props) => {
  let [
    genderData,
    maternalEthnicityData,
    paternalEthnicityData,
    affectedRelativesData,
    consanguinityData,
  ] = processPatientData(props.patient_data);
  let genderPieData = processGender(genderData);
  let affectedRelativesPieData = processPieChartData(affectedRelativesData);
  let consanguinityPieData = processPieChartData(consanguinityData);
  let maternalEthnicityPieData = processPieChartData(maternalEthnicityData);
  let paternalEthnicityPieData = processPieChartData(paternalEthnicityData);

  return (
    <Card elevation={1} style={{ borderRadius: 16 }}>
      <CardContent style={{ maxHeight: "50vh" }}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <div style={{ height: "25vh", width: "100%" }}>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Gender Variation
              </Typography>
              <PieChart data={genderPieData} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ height: "25vh", width: "100%" }}>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Maternal Ethnicity Variation
              </Typography>
              <PieChart data={maternalEthnicityPieData} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ height: "25vh", width: "100%" }}>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Paternal Ethnicity Variation
              </Typography>
              <PieChart data={paternalEthnicityPieData} />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div style={{ height: "25vh", width: "100%" }}>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Affected Relatives
              </Typography>
              <PieChart data={affectedRelativesPieData} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ height: "25vh", width: "100%" }}>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Consanguinity
              </Typography>
              <PieChart data={consanguinityPieData} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
