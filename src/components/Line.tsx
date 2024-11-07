import { LineChart } from "@mui/x-charts/LineChart";

interface MarkOptimizationProps {
  dates: number[];
  values: number[];
}

export default function MarkOptimization({
  dates,
  values,
}: MarkOptimizationProps) {
  console.log(dates);
  console.log(values);
  return (
    <LineChart
      xAxis={[
        { 
          data: dates,
        }
      ]} // Use the passed `dates` prop
      series={[
        {
          data: values, // Use the passed `values` prop (humidity in this case)
          showMark: ({ index }) => index % 2 === 0, // Optional: Show marks on even-indexed points
        },
      ]}
      width={700}
      height={300}
    />
  );
}
