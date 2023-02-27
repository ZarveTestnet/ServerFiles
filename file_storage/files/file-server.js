const express = require('express');
const path = require('path');
const app = express();
const port = 333; // Revers proxy to 3333
const cors = require('cors');


app.use(cors())
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`File Storage Server started on port: ${port}`);
})