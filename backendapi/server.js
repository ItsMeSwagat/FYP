const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Clothing store server is working at ${PORT}`)
})