import { Card, CardContent, Typography } from "@material-ui/core";

import Graph from "react-graph-vis";
// react functional component that renders a Neo4j graph using D3
import React from "react";

export default function NeoGraph(props) {
  console.log(props.data);
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
          Relation Graph
        </Typography>
        <div style={{ height: "75vh", width: "100%" }}>
          <Graph
            graph={props.data}
            shape="custom"
            options={{
              nodes: {
                shape: "dot",
              },
              interaction: {
                zoomView: true,
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
