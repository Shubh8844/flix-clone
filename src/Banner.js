import React, { useState, useEffect } from "react"
import axios from "./axios"
import requests from "./request"
import "./banner.css"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

export default  function Banner(){
const [movie,setMovie]=useState([]);
const [trailerUrl,setTrailerUrl]=useState("");

useEffect(()=>{
  async function fetchData(){
    const request=await axios.get(requests.fetchNetflixOriginals);
    setMovie(request.data.results[
      Math.floor(Math.random() * request.data.results.length-1)
    ])
  }
  fetchData();

  
},[])


const opts={
  height:"390",
  width:"100%",
  playerVars:{
    autoplay:1,
}
};
//console.log(movie)
//additonal button handle
const handleClick =(movie)=>{
      if (trailerUrl){
        setTrailerUrl("");
      }
      else{
          //movieTrailer give movie url from youtube and movie?.name || ""
          //-----> this is edge case "" return promise
          movieTrailer(movie?.name || movie?.title||"")
          .then(url =>{
            //Note if website url is :-https://www.googl.com/watch?v=Xtmbc&banana=5
            //here the movie id is in v=Xtmbt and note banana is different parameter
            //new URL(url).serach gives URL and we habvve to search id will give data after so wrap 
            //in UrlSearchParams to get v
            const urlParams=new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));

          }).catch(error => console.log(error));
      }
}
//truncate if the discription is too long
function truncate(str,n){
return str?.length>n ? str.substr(0,n-1) + "...":str;
}
return(
  <div className="banner"
  style={{
      backgroundSize:"cover",
      backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      backgroundPosition:"center center"
  }}
  >
    <div className="banner__content">
      <h1 className="banner__title">
        {/* / is optional chaing is movie exist then look for title object projecrty movie.original_n */}
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <div className="banner__buttons">
        <button className="banner__button" onClick={()=> handleClick(movie)}>Play</button>
        <button className="banner__button" onClick={()=> handleClick(movie)}>Continue</button>
      </div>
<h1 className="banner__description">{truncate(movie?.overview,150)}</h1>

    </div> 
    <div className="banner__video">{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}</div>
    <div className="banner__fadeBottom" />
    
    
    
  </div>
)
}
