import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

/**
 * @typedef {Object} patient
 * @property {string} patient.cohort
 * @property {string} patient.patientId
 * @property {string} patient.cohort
 * @property {string} patient.sex
 * @property {patient[]} patients.similarPatients
 * @property {Object[]} patient.phenotypes
 *
 * @param {Object} props
 * @param {patient} props.patient
 */
export default function PatientTable(props) {
  const [phenoOpen, setPhenoOpen] = useState(true);
  const [simOpen, setSimOpen] = useState(false);

  return (
    <Card style={{ borderRadius: 16, width: "50%" }}>
      <CardContent>
        <Typography
          variant="h5"
          style={{ textAlign: "center", paddingBottom: 50 }}
        >
          {props.patient.patientId}
        </Typography>
        <TableContainer style={{ maxHeight: "50vh" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>Cohort:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{props.patient.cohort}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Sex:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{props.patient.sex}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Phenoypes:</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setPhenoOpen(!phenoOpen)}
                  >
                    {phenoOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={phenoOpen} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>Phenotype ID</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>Phenotype Name</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {props.patient.phenotypes.map((phenotype) => {
                                return (
                                  <Typography key={phenotype.id}>
                                    {phenotype.name}
                                  </Typography>
                                );
                              })}
                            </TableCell>
                            <TableCell>
                              {props.patient.phenotypes.map((phenotype) => {
                                return (
                                  <Typography key={phenotype.id}>
                                    {phenotype.label}
                                  </Typography>
                                );
                              })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Similar Patients</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setSimOpen(!simOpen)}
                  >
                    {simOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  colSpan={6}
                >
                  <Collapse in={simOpen} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>Patient ID</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.patient.similarPatients.map(
                            (similarPatient) => {
                              if (
                                similarPatient.patientId ===
                                props.patient.patientId
                              ) {
                                return null;
                              }
                              return (
                                <TableRow key={similarPatient.patientId}>
                                  <a
                                    href={`/patientInfo?id=${similarPatient.patientId}`}
                                  >
                                    {similarPatient.patientId}
                                  </a>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
