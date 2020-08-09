import axios from "axios"

/* Here the axios have smae starting URL so create */

// if we write instance.get("/foo-bar")
// will go to url https://api.themoviedb.org/3/foo-bar

const instance=axios.create({
baseURL:"https://api.themoviedb.org/3"
})

export default instance;