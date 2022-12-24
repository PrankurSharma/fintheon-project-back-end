const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
var cacheService = require("express-api-cache"); //library used for caching
var cache = cacheService.cache;
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//data cached in the server for 2 hours and then refreshed to get new data from api

app.use(cache('120 minutes'));

app.post('/api/fetch', (request, res) => {
    let url = request.body.url;
    const result = axios.get(url).then((response) => {
        if(response.data.status === 'error'){
            res.send({message: "Record doesn't exist."});
        }
        else {
            res.send(response.data);
        }
    })
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});