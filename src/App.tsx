import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { covidData, fetchCovidData } from './api';
import { Cards, Graph, StateSelector } from "./components";
import coronaImage from "./images/covid.png";

function App() {
  const [covidData, setCovidData ] = useState<covidData[]>([]);
  const [nameList, setNameList] = useState<string[]>([]);
  const [displayData, setDisplayData] = useState<covidData>();

  useEffect(() => {
    async function fetchData(){
      let [nameList, dataList] = await fetchCovidData();
      setCovidData(dataList);
      setNameList(nameList);
      setDisplayData(dataList[0]);
    }
    fetchData();
  }, [setCovidData, setNameList, setDisplayData]);

  const handleNameChange = async (name: string) => {
    if(name == 'India')
      setDisplayData(covidData[0]);
    const data = covidData.find( data => data.name === name);
    setDisplayData(data);
  };

  return (
    <div className={styles.container}>
        <img className="image" src={coronaImage} alt="COVID-19" />
        <br />
        <text>
          <b>Country and State Wise Cases of Corona Virus</b>
        </text>
        <br />
        <text>
          <i>(For a particular State select from below)</i>
        </text>
        <br />
        <br />
        <Cards data={displayData} />
        <StateSelector handleNameChange={handleNameChange} nameList={nameList} />
        <Graph data={displayData} />
      </div>
  );
}

export default App;
