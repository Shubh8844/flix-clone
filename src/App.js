import React from "react";
import "./styles.css";
import Row from "./Row"
import Banner from"./Banner"
import requests from "./request"
import Navbar from "./Navbar"

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <Row 
      title="Netflix Originals" 
      fetchUrl={requests.fetchNetflixOriginals} 
      isLargeRow/>
      {/* Note isLargeRow is property and by defaukt is true as this row netflix one needs to be large */}
      <Row title="Trending Now" fetchUrl={requests.fetchtrending}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fecthComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fecthHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fecthRomanceMovies} />
      
    </div>
  );
}
