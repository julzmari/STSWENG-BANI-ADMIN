const { app, PORT } = require("./src/server");

app.listen(PORT, () => {
  console.log(`Server is currently running on port ${PORT}`);
});