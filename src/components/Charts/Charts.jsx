import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import styles from './Charts.module.css';
import {Line,Bar} from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
 ChartJS.register(...registerables);




const Charts=({data:{confirmed,deaths,recovered},country})=>{
  let [dailyData,setDailyData]=useState([]);

  useEffect(()=>{
    let fetchAPI=async()=>{
      const initialDailyData=await fetchDailyData();
      setDailyData(initialDailyData)
    };
    // console.log(dailyData);
    fetchAPI();
  },[]);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );


  const lineChart=(
    dailyData[0] ?
    (<Line
    data={{
      labels:dailyData.map(({date})=>new Date(date).toLocaleString()),
      datasets:[{
        data:dailyData.map((data)=>data.confirmed),
        label:"Infected",
        borderColor:"#3333ff",
        fill:true,
      },{
        data:dailyData.map((data)=>data.deaths),
        label:"Deaths",
        borderColor:"red",
        backgroundColor:"rgba(255,0,0,0.5)",
        fill:true,
      },],
    }}
    />):null
  )
  return (
    
      <div className={styles.container}>
      {country?barChart:lineChart}
    </div>
    
  )
}

export default Charts