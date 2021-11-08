import { ResponsiveBar } from "@nivo/bar";

export const BarChart = ({ data, keys }) => (
  <ResponsiveBar
    data={data}
    indexBy="id"
    keys={keys}
    margin={{ top: 50, bottom: 50, left: 200, right: 50 }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "category10" }}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    enableGridY={false}
    enableLabel={true}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Number of Patients",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    label={(d) => `${d.value}`}
    labelTextColor="#ffffff"
    animate={true}
  />
);
