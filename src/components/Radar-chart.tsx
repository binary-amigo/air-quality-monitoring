import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ExampleProps {
  data: Array<{ subject: string; A: number; B: number; fullMark: number }>;
}

const adata = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
]

const Example: React.FC<ExampleProps> = ({ data }) => {
  console.log(data);
  data = [
    {
      subject: '08/11',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: '09/11',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: '10/11',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: '11/11',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: '12/11',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: '13/11',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Air Quality"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Humidity"
          dataKey="B"
          // stroke="#8884d8"
          // fill="#8884d8"
          stroke="#82ca9d" fill="#82ca9d"
          fillOpacity={0.6}
        />
      <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Example;
