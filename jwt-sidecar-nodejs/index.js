const { CognitoJwtVerifier } = require("aws-jwt-verify");
const express = require("express");
const app = express();

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_WhDYfO4gN",
  tokenUse: "access",
  clientId: "7jca2p61lu0d46fmf425hoe9sd",
});

app.get("/auth/*", async (req, res) => {
  try {
    console.log(req.header("authorization").split(" ")[1]);
    await jwtVerifier.verify(req.header("authorization").split(" ")[1]);
  } catch (err) {
    console.error(err);
    return res.status(403).json({ statusCode: 403, message: "Forbidden" });
  }
});

app.get("/", async (req, res, next) => {
  console.log("Working")
});

jwtVerifier
  .hydrate()
  .catch((err) => {
    console.error(`Failed to hydrate JWT verifier: ${err}`);
    process.exit(1);
  })
  .then(() =>
    app.listen(3001, () => {
      console.log(`JWT Sidecar running`);
    })
  );

module.exports = app;