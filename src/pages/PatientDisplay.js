// React functional component for the Patient Display page
// Takes a patient id as a query parameter and displays a list of the patient's phenotypes

import {
  Card,
  CardContent,
  LinearProgress,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import NeoGraph from "../components/NeoGraph";
import PatientTable from "../components/PatientTable";
import { ResultsTable } from "../components/ResultsTable";
import UnAuth from "../components/UnAuth";
import { VariantSearchBar } from "../components/VariantSearchBar";
import queryStringify from "qs-stringify";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const mappings = {
  AAATW: "DEMO0000217",
  AAAAA: "AC0071",
  A: "MITO0021",
  B: "MITO0022",
  C: "MITO0023",
  D: "MITO0024",
  E: "MITO0025",
  F: "MITO0026",
  G: "MITO0027",
  H: "MITO0028",
  I: "MITO0029",
  J: "MITO0030",
};

const LoadingState = {
  WAITING: "WAITING",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

let variantsCol = [
  {
    field: "col1",
    title: "Chromosome",
  },
  {
    field: "col2",
    title: "Start Position",
  },
  {
    field: "col3",
    title: "Type",
  },
  {
    field: "col4",
    title: "Alternate Allele",
    cellStyle: {
      width: 20,
      maxWidth: 20,
      overflow: "auto",
    },
    headerStyle: {
      width: 20,
      maxWidth: 20,
      overflow: "auto",
    },
  },
  {
    field: "col5",
    title: "Reference Allele",
    cellStyle: {
      width: 20,
      maxWidth: 20,
    },
    headerStyle: {
      width: 20,
      maxWidth: 20,
    },
  },
  {
    field: "col6",
    title: "Allele Count",
  },
  {
    field: "col7",
    title: "Allele Frequency",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    "min-height": "calc(100vh - 50px)",
    padding: theme.spacing(3),
  },
  formContainer: {
    marginTop: "3em",
  },
}));

export default function PatientDisplay() {
  const classes = useStyles();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [variantLoading, setVariantLoading] = useState(LoadingState.WAITING);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [variantsRow, setVariantsRow] = useState([]);
  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const getUserMetadata = async () => {
      if (isAuthenticated) {
        try {
          const idToken = await getIdTokenClaims({});

          setToken(idToken.__raw);
        } catch (e) {
          console.log(e.message);
        }
      }
    };
    getUserMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && token) {
      setLoading(true);

      // @ts-ignore
      let query = queryStringify({
        id: mappings[params.get("id")] || params.get("id") || "",
        fuzz: 2,
      });

      fetch(`${process.env.REACT_APP_BACKEND}/patient?` + query, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          setPatient(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });

      fetch(`${process.env.REACT_APP_BACKEND}/graph/like?` + query, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          setGraphData(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  const setVariantResults = (value) => {
    if (value === LoadingState.LOADING) {
      setVariantLoading(LoadingState.LOADING);
    } else if (value === LoadingState.FAILURE) {
      setVariantLoading(LoadingState.FAILURE);
    } else {
      let variantsRow = [];
      value.v.forEach((variant, idx) => {
        variantsRow.push({
          id: idx,
          col1: variant.c,
          col2: variant.s,
          col3: variant.t,
          col4: variant.a,
          col5: variant.r,
          col6: variant.ac,
          col7: variant.af,
        });
      });
      setVariantLoading(LoadingState.SUCCESS);
      setVariantsRow(variantsRow);
    }
  };

  if (!isAuthenticated) {
    return <UnAuth />;
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Toolbar />
        {(() => {
          if (loading) {
            return (
              <div className={classes.formContainer}>
                <div className="alert alert-info">Loading...</div>
                <LinearProgress />
              </div>
            );
          } else if (patient) {
            return (
              <div className={classes.formContainer}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PatientTable patient={patient} />
                </div>

                <div
                  style={{
                    paddingTop: 50,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <NeoGraph data={graphData} />
                </div>

                <div style={{ paddingTop: 50 }}>
                  <Card style={{ borderRadius: 16 }}>
                    <CardContent>
                      <Typography
                        style={{ textAlign: "center", paddingBottom: 50 }}
                      >
                        Common Variant Search (in similar patients)
                      </Typography>
                      <VariantSearchBar
                        cutoff={false}
                        patients={[patient, ...patient.similarPatients]}
                        panel_display
                        type={"commonVariant"}
                        setResults={(values) => setVariantResults(values)}
                        multiple={false}
                        token={token}
                      />
                      {(() => {
                        switch (variantLoading) {
                          case LoadingState.SUCCESS:
                            return (
                              <ResultsTable
                                column={variantsCol}
                                row={variantsRow}
                                title="Common variants found"
                              />
                            );
                          case LoadingState.LOADING:
                            return <LinearProgress />;

                          case LoadingState.FAILURE:
                            return (
                              <div>
                                <Typography>
                                  Error: Could not load results.
                                </Typography>
                              </div>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          } else if (error) {
            return (
              <div className={classes.formContainer}>
                <Card>
                  <CardContent>
                    <Typography>Error: Could not load patient.</Typography>
                  </CardContent>
                </Card>
              </div>
            );
          }
        })()}
      </main>
    </div>
  );
}
