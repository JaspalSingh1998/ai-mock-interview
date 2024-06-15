import { ResponsiveBar } from "@nivo/bar";

function BarChart(result) {
  const data = [];
  result.result &&
    result?.result.map((res, i) => {
      data.push({
        question: i + 1,
        rating: res.rating,
      });
    });
  return (
    <div className="h-72 mt-5 w-full">
      <ResponsiveBar
        data={data}
        keys={["rating"]}
        indexBy="question"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

export default BarChart;
