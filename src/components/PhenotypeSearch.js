import {
  Button,
  Slider,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

import AutocompleteSearch from "../components/AutocompleteSearch";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center",
  },
  formContainer: {
    marginTop: "3em",
  },
}));

export default function PhenotypeSearch(props) {
  const classes = useStyles();
  const [hpoTerm, setHpoTerm] = useState("");
  const [fuzz, setFuzz] = useState(0);
  const [limitation, setLimitation] = useState("");
  const [cutoff, setCutoff] = useState(0);
  const [associatedGenes, setAssociatedGenes] = useState(null);

  const changeHpoTerm = async (hpoTerm) => {
    if (hpoTerm !== null) {
      const geneList = await fetch(
        "https://hpo.jax.org/api/hpo/term/" +
          hpoTerm.split("-")[0].trim() +
          "/genes"
      )
        .then((res) => res.json())
        .catch((err) => alert("error when retrieving associated genes"));
      setHpoTerm(hpoTerm);
      setAssociatedGenes(geneList);
    }
  };

  const changeFuzz = (fuzz) => {
    setFuzz(fuzz);
  };

  const changeLimitation = (limitation) => {
    setLimitation(limitation);
  };

  const changeCutoff = (cutoff) => {
    if (cutoff < 0 && cutoff !== "") {
      cutoff = 0;
    }
    setCutoff(cutoff);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var stringify = require("qs-stringify");

    let query = stringify({
      hpoTerm: hpoTerm.split("-")[1],
      fuzz: fuzz,
      limitation: limitation ? limitation.split("-")[1] : "",
      cutoff: cutoff,
    });

    props.loading();

    try {
      const patientsRequest = await fetch(
        `${process.env.REACT_APP_BACKEND}/hpo_search?` + query,
        {
          headers: {
            Authorization: `Bearer ${props.accessToken}`,
          },
        }
      );
      const graphRequest = await fetch(
        `${process.env.REACT_APP_BACKEND}/graph/with?` + query,
        {
          headers: {
            Authorization: `Bearer ${props.accessToken}`,
          },
        }
      );

      const patientData = await patientsRequest.json();
      const graphData = await graphRequest.json();
      patientData["associatedGenes"] = associatedGenes.genes;
      patientData["hpoTerm"] = hpoTerm;

      props.callback(patientData, graphData);
    } catch {
      alert("error in query");
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <Typography>Search Term</Typography>
          <AutocompleteSearch
            api_type="hpo"
            hpo
            updateVal={(values) => changeHpoTerm(values)}
          />
        </div>
        <div className={classes.inputContainer}>
          <Typography>Fuzzy Match</Typography>
          <Slider
            value={fuzz}
            onChange={(event, value) => changeFuzz(value)}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: "Exact",
              },
              {
                value: 5,
                label: "5 Hops",
              },
            ]}
            step={1}
            min={0}
            max={5}
          />
        </div>
        <div className={classes.inputContainer}>
          <Typography>Limit to patients with</Typography>
          <AutocompleteSearch
            api_type="hpo"
            updateVal={(values) => changeLimitation(values)}
          />
        </div>
        <div className={classes.inputContainer}>
          <Typography>Cut-off</Typography>
          <TextField
            type="number"
            value={cutoff}
            onChange={(event) => changeCutoff(event.target.value)}
            fullWidth
          />
        </div>
        <div className={classes.inputContainer}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!hpoTerm}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
