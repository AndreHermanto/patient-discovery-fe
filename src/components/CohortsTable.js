import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { green, red } from "@material-ui/core/colors";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

function CohortRow(props) {
  const [open, setOpen] = useState(false);
  const [popover, setPopover] = useState(null);

  const handleClick = (event) => {
    setPopover(event.currentTarget);
  };

  const handleClose = () => {
    setPopover(null);
  };

  const popoverOpen = Boolean(popover);
  const id = popoverOpen ? "popover-cohort-table" : undefined;

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon style={{ color: green[500] }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: green[500] }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{props.cohort.cohort}</TableCell>
        <TableCell>{props.cohort.numPatients}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {props.cohort.cohort} Patients
              </Typography>
              <Table size="small">
                <TableHead>
                  {props.type !== "variant" ? (
                    <TableRow>
                      <TableCell>HPO Term</TableCell>
                      <TableCell>Patients matching HPO Term</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>Patients</TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {props.type !== "variant"
                    ? props.cohort.phenotypes.map((phenotype) => {
                        return (
                          <TableRow>
                            <TableCell>{phenotype.label}</TableCell>
                            <TableCell
                              style={{
                                maxWidth: "10vw",
                              }}
                            >
                              {phenotype.patients.map((patient) => {
                                if (
                                  patient.patientId === "DEMO0000217" ||
                                  patient.patientId === "DEMO0000218" ||
                                  patient.patientId === "DEMO0000219" ||
                                  patient.patientId === "AC0076" ||
                                  patient.patientId === "MITO0071"
                                ) {
                                  return (
                                    <div>
                                      <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={handleClick}
                                      >
                                        {patient.patientId}
                                      </Button>
                                      <Popover
                                        id={id}
                                        open={popoverOpen}
                                        anchorEl={popover}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                          vertical: "top",
                                          horizontal: "center",
                                        }}
                                        transformOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center",
                                        }}
                                      >
                                        <Button
                                          href="https://report-finder-325309.web.app//report?report=pharmcat&sample=AAATW"
                                          target="_blank"
                                          variant="outlined"
                                        >
                                          PharmCAT Report
                                        </Button>
                                      </Popover>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div>
                                      <Button disabled>
                                        {patient.patientId}
                                      </Button>
                                    </div>
                                  );
                                }
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : props.cohort.patients.map((patient) => {
                        if (
                          patient.patientId === "DEMO0000217" ||
                          patient.patientId === "DEMO0000218" ||
                          patient.patientId === "DEMO0000219" ||
                          patient.patientId === "AC0062" ||
                          patient.patientId === "MITO0047"
                        ) {
                          return (
                            <div>
                              <Button
                                color="primary"
                                variant="outlined"
                                onClick={handleClick}
                              >
                                {patient.patientId}
                              </Button>
                              <Popover
                                id={id}
                                open={popoverOpen}
                                anchorEl={popover}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                              >
                                <Button
                                  href="https://report-finder-325309.web.app//report?report=pharmcat&sample=AAATW"
                                  target="_blank"
                                  variant="outlined"
                                >
                                  PharmCAT Report
                                </Button>
                              </Popover>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <Button disabled>{patient.patientId}</Button>
                            </div>
                          );
                        }
                      })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

function CohortDeniedRow(props) {
  const [open, setOpen] = useState(false);
  const urlMapping = {
    "Acute Care": "https://variantatlas.org.au/aboutva",
    "Mitochondria": "https://variantatlas.org.au/aboutva",
    "CIRCA": ""
  }
  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon style={{ color: red[500] }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: red[500] }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.cohort}
        </TableCell>
        <TableCell>Access Denied</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component="div">
                Matching patients were found, but you do not have access to view{" "}
                {props.cohort} patients.{" "}
                <a href={urlMapping[props.cohort]}>
                  Click here
                </a>
                {" "}to request access.
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CohortsTable(props) {
  return (
    <Card elevation={1} style={{ borderRadius: 16 }}>
      <CardContent style={{ maxHeight: "75vh" }}>
        <Typography
          variant="h5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Matching Patients
        </Typography>
        <TableContainer style={{ maxHeight: "75vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Cohort</TableCell>
                <TableCell>Patients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.cohorts.map((dataset) => {
                if (dataset.numPatients !== 0) {
                  return (
                    <CohortRow
                      key={dataset.cohort}
                      cohort={dataset}
                      type={props.type}
                    />
                  );
                } else {
                  return <></>;
                }
              })}
              {props.cohortsDenied.map((denied) => (
                <CohortDeniedRow key={denied} cohort={denied} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
