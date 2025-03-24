import React, { useState } from 'react';
import Header from '../components/Header';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  CHART_PD_2017, CHART_PD_2018, CHART_PD_2019,
  CHART_FATAL_2017, CHART_FATAL_2018, CHART_FATAL_2019,
  CHART_INJURY_2017, CHART_INJURY_2018, CHART_INJURY_2019
} from '../query_and_mutations/charts_mutation';

// Register Chart.js components to enable different chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  // State to manage the current chart type (bar, pie, area)
  const [chartType, setChartType] = useState('bar');

    /*
   * NOTE: The GraphQL queries used below are imported from 
   * '/query_and_mutation/charts_mutation'. If you need to modify the 
   * queries or adapt them to a different API, you can edit them in that file.
   * 
   * The API endpoint for GraphQL requests is configured in the .env file.
   * Ensure that the correct endpoint is set there to match your backend.
   */

  // Fetching data for different years and incident types using GraphQL queries
  const { loading: loadingPD_2017, data: PD_2017 } = useQuery(CHART_PD_2017);
  const { loading: loadingPD_2018, data: PD_2018 } = useQuery(CHART_PD_2018);
  const { loading: loadingPD_2019, data: PD_2019 } = useQuery(CHART_PD_2019);

  const { loading: loadingFatal_2017, data: Fatal_2017 } = useQuery(CHART_FATAL_2017);
  const { loading: loadingFatal_2018, data: Fatal_2018 } = useQuery(CHART_FATAL_2018);
  const { loading: loadingFatal_2019, data: Fatal_2019 } = useQuery(CHART_FATAL_2019);

  const { loading: loadingInjury_2017, data: Injury_2017 } = useQuery(CHART_INJURY_2017);
  const { loading: loadingInjury_2018, data: Injury_2018 } = useQuery(CHART_INJURY_2018);
  const { loading: loadingInjury_2019, data: Injury_2019 } = useQuery(CHART_INJURY_2019);

  // Extract total counts from the fetched data (handling cases where data may be undefined)
  const pd_2017 = PD_2017?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const pd_2018 = PD_2018?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const pd_2019 = PD_2019?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;

  const fatal_2017 = Fatal_2017?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const fatal_2018 = Fatal_2018?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const fatal_2019 = Fatal_2019?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;

  const injury_2017 = Injury_2017?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const injury_2018 = Injury_2018?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;
  const injury_2019 = Injury_2019?.incident_findAllByFilterWithPagination.paginationDetails.totalCount || 0;

  // Prepare data arrays for chart representation
  const data2017 = [pd_2017, fatal_2017, injury_2017];
  const data2018 = [pd_2018, fatal_2018, injury_2018];
  const data2019 = [pd_2019, fatal_2019, injury_2019];

  const labels = ['Property Damage', 'Fatal', 'Injury'];

  // Chart data configuration
  const allData = {
    labels: labels,
    datasets: [
      {
        label: '2017',
        data: data2017,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '2018',
        data: data2018,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: '2019',
        data: data2019,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Function to toggle between chart types (Bar, Pie, Area)
  const toggleChartType = () => {
    setChartType(prevType => (prevType === 'bar' ? 'pie' : prevType === 'pie' ? 'area' : 'bar'));
  };

  return (
    <div>
      <Header />
      <div style={{ width: '60%', margin: '0 auto' }}>
        <h1>Incident Data by Severity</h1>
        
        {/* Button to switch between different chart types */}
        <button onClick={toggleChartType} style={{ width: '200px', height: '30px', fontSize: '14px', marginBottom: '20px' }}>
          Switch to {chartType === 'bar' ? 'Pie Chart' : chartType === 'pie' ? 'Area Chart' : 'Bar Chart'}
        </button>

        {/* Chart container */}
        <div style={{ width: '60%', height: '40%' }}>
          {chartType === 'bar' && <Bar data={allData} />}
          {chartType === 'pie' && <Pie data={allData} />}
          {chartType === 'area' && <Line data={allData} options={{ elements: { line: { fill: true } } }} />}
        </div>
      </div>
    </div>
  );
};

export default Charts;
