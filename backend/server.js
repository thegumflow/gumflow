const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const bodyParser = require("body-parser");
const { dbConnect } = require("./config/dbConnect");

dbConnect();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin/adminUser.routes"));
app.use("/api/admin/auth", require("./routes/admin/adminAuth.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.listen(port, () => console.log(`Server is Listing to port ${port}`));
