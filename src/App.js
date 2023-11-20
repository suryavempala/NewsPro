import './App.css';
import React, { Component} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default class App extends Component {
  pageSize=6;
  apiKey=process.env.REACT_APP_NEWS_API_KEY;
  state={progress:0}
  setProgress=(progres)=>
  {
    this.setState({progress:progres});
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={5}
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="business" category={"business"}/>}/>
          <Route path="/health" element={ <News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="health" category={"health"}/>}/>
          <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="general" category={"general"}/>}/>
          <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="technology" category={"technology"}/>}/>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="entertainment" category={"entertainment"}/>}/>
          <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="science" category={"science"}/>}/>
          <Route path="/sports" element={  <News setProgress={this.setProgress} apikey={this.apiKey}    pageSize={this.pageSize} key="sports" category={"sports"}/>}/>
        </Routes>
      </div>
      </Router>
    )
  }
}
