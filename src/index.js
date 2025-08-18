const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const connection = require("./config/database");

const packageRoute = require("./route/package.route");
const packageFeatureRoute = require("./route/package.feature.route");
const uploadRoute = require("./route/upload.route");
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/package", packageRoute);
app.use("/api/package-feature", packageFeatureRoute);
app.use("/api/upload", uploadRoute);

const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await connection();
        server.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
})();