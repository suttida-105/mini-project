const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cors());

const out = `
<html>
<body style:"">
  <h2>SUTTIDA 5835512105</h2>
 <h4>RUNING ON PM2 ON PORT 3000  </h4>
 <h4>USING REVERSE PROXY MOVE PORT TO 80 </h4>
</body>
</html> 
`;

router
  .route("/")
  .get((req, res) => {
    res.send(out);
  })
app.use('/', router);
app.listen(3000, () => console.log("Server is ready! : PORT 3000"));
