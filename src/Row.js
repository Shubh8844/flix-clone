import React, { useState, useEffect } from "react";
import axios from "./axios" //note here axios is not dependency this is file and axios is instance
import "./Row.css"
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

const baseUrl="https://image.tmdb.org/t/p/original/"
export default function Row({title,fetchUrl,isLargeRow}){
  const [movies,setMovies]=useState([]);
  const [trailerUrl,setTrailerUrl]=useState("");
// a snipper of code which runs on specific condition
//componentdid mount if we specify value in second argument like 
//[movies] will will run when movie change each time like componentdidupdate

useEffect(()=>{

  //await is used as it will wait for all data to come
   // note when we pull data inside UseEffect we have to mention that in [] as its dependendt
// fetchUrl is added as it is from outside and its value keen on changing 
//hence fetchurl changes we need to render the changes
  async function fetchData(){
    const request= await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }
  fetchData();
 

},[fetchUrl])
console.log(movies)
const opts={
  height:"390",
  width:"100%",
  playerVars:{
    autoplay:1,
}
};
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

//console.log(movies);// this can not be inside useEffect() note will give error


return (
<div className="row">
  <h2>{title}</h2>
  <div className="row__posters">
    {
      movies.map(movie =>(
        //baseUrl to be added if we use {then we have to return}
        /* note classname if islargeRow then row__posterLarge is applied */
        <img
        key={movie.id}
        onClick={()=> handleClick(movie)} 
        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
        //src={`${baseUrl}${movie.poster_path}`} 
        src={`${baseUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
        alt={movie.poster_path} 
        />
        
    ))
    }
  </div>
  <div className="banner__video">
  {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
  </div>
</div>
);
}