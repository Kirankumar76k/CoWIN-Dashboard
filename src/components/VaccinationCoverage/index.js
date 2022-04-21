// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverage} = props
  console.log(vaccinationCoverage)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="card-container">
      <h1 className="card-head">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={9000}
          height={400}
          data={vaccinationCoverage}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            radius={[10, 10, 0, 0]}
            barSize="20%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
