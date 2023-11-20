import './App.css';
import React, { useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API_KEY;
  
  const [progress, setProgress] = useState(0);
  return (
    <Router>
      <div>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route path="/business" element={<News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="business" category={"business"}/>}/>
          <Route path="/health" element={ <News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="health" category={"health"}/>}/>
          <Route path="/" element={<News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="general" category={"general"}/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="technology" category={"technology"}/>}/>
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="entertainment" category={"entertainment"}/>}/>
          <Route path="/science" element={<News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="science" category={"science"}/>}/>
          <Route path="/sports" element={  <News setProgress={setProgress} apikey={apiKey}    pageSize={pageSize} key="sports" category={"sports"}/>}/>
        </Routes>
      </div>
      </Router>
  )
}

