const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const connection = require("./config/database");

const packageRoute = require("./route/package.route");
const packageFeatureRoute = require("./route/package.feature.route");
const uploadRoute = require("./route/upload.route");
const policyRoute = require("./route/policy.route");
const reviewRoute = require("./route/review.route");
const suggestQuestionRoute = require("./route/suggest.question.route");
const message = require("./route/message.route");


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:5173", // FE của bạn
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/package", packageRoute);
app.use("/api/v1/package-feature", packageFeatureRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/policy", policyRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/suggest-question", suggestQuestionRoute);
app.use("/api/v1/message", message);

const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await connection();
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
})();