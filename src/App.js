import React, { Component } from 'react'
import {Cards,Charts,CountryPicker} from "./components"
import styles from './App.module.css';
import {fetchData} from './api/index'
import coronaImg from './images/image.png';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data:{},
       country:''
    }
  }

  async componentDidMount(){
    const fetchedData= await fetchData();
    this.setState({
      data:fetchedData
    })
    
  }
  handleCountryChange= async (country)=>{
    const fetchedData= await fetchData(country);
    this.setState({data: fetchedData,country:country})
    console.log(fetchedData);
    console.log(country);
  }

  render() {
    const {data,country}=this.state;
    return (
      <div className={styles.container}>
      <img className={styles.image} src={coronaImg} alt="CORONA"/>
     <Cards data={data}/>
     <Charts data={data} country={country}/>
     <CountryPicker handleCountryChange={this.handleCountryChange}/>
      </div>
    )
  }
}

export default App