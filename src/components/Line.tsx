import { LineChart } from "@mui/x-charts/LineChart";

interface MarkOptimizationProps {
  // dates: number[];
  values: number[];
}

export default function MarkOptimization({
  // dates,
  values,
}: MarkOptimizationProps) {
  // console.log(dates);
  console.log(values);
  const getLast10Dates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 9; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = Number(String(date.getDate()).padStart(2, "0"));
      dates.push(formattedDate);
    }

    return dates;
  };

  const dates = getLast10Dates();
  console.log(dates);

  return (
    <LineChart
      xAxis={[
        {
          data: dates.splice(0, 10), // Use the passed `dates` prop
        },
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
