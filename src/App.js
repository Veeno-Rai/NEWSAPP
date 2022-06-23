import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News2  from './components/News2';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize=6;
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setProgress= (progress)=>
  {
    this.setState({progress: progress});
  }
  render() {
    return (
      <div> 
      <Router>
      <Navbar/> 
      <LoadingBar
      height='5px'
      color='red'
      progress={this.state.progress}/>
      <Routes>
          <Route  exact path="/" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey}  key="general"  pageSize={this.pageSize} country="in" category="general" />}/>
          <Route  exact path="/general" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey} key="general"  pageSize={this.pageSize } country="in" category="general" />}/>
          <Route  exact path="/health" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey}  key="health" pageSize={this.pageSize} country="in" category="health" />}/>
          <Route  exact path="/business" element={<News2 setProgress={this.setProgress} apiKey={this.apiKey}  key="business"  pageSize={this.pageSize} country="in" category="business" />}/>
          <Route  exact path="/science" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey}  key="science" pageSize={this.pageSize} country="in" category="science" />}/>
          <Route  exact path="/sports" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey}  key="sports" pageSize={this.pageSize} country="in" category="sports" />}/>
          <Route  exact path="/technology" element={<News2 setProgress={this.setProgress}  apiKey={this.apiKey} key="technology"  pageSize={this.pageSize}  country="in" category="technology" />}/>
          
          
        </Routes>
     
     </Router>
     </div>
    )
  }
}
