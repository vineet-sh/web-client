import axios from "axios";

const url = "http://demo7107578.mockable.io/";
export interface covidData {
  lastFetched: number;
  name: string;
  active: number;
  cured: number;
  deaths: number;
  new_active: number;
  new_cured: number;
  new_death: number;
}

export const fetchCovidData = async (): Promise<[string[], covidData[]]> => {
  const nameList = ["India"];
  const dataList: covidData[] = [];
  try {
  const { data } = await axios.get(url);
  // Adding country's data
  const countryData = data["countryData"];
  dataList.push({
    lastFetched: countryData["lastFetched"]*60*1000,
    name: "India",
    active: parseInt(countryData.data['active']),
    cured: parseInt(countryData.data['cured']),
    deaths: parseInt(countryData.data['deaths']),
    new_active: parseInt(countryData.data['new_active']),
    new_cured: parseInt(countryData.data['new_cured']),
    new_death: parseInt(countryData.data['new_death']),
  });

  // Adding state's data
  const stateData = data["stateData"];
  stateData?.data.forEach((e) => {
    nameList.push(e["state_name"]);
    dataList.push({
      lastFetched: stateData["lastFetched"]*60*1000,
      name: e["state_name"],
      active: parseInt(e["active"]),
      cured: parseInt(e["cured"]),
      deaths: parseInt(e["death"]),
      new_active: parseInt(e["new_active"]),
      new_cured: parseInt(e["new_cured"]),
      new_death: parseInt(e["new_death"]),
    });
  });
  } catch(e){
    console.log(`Error while fetching data from server: ${e}`)
  }
  return [nameList, dataList];
};
