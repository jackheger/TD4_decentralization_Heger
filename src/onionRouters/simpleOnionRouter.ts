import bodyParser from "body-parser";
import express from "express";
import { BASE_ONION_ROUTER_PORT } from "../config";

export async function simpleOnionRouter(nodeId: number) {
  const onionRouter = express();
  onionRouter.use(express.json());
  onionRouter.use(bodyParser.json());

  // Status route to indicate the server is live
  onionRouter.get("/status", (req, res) => {
    res.send('live');
  });

  // GET route for last received encrypted message
  // This should return { result: null } before any message is received
  onionRouter.get("/getLastReceivedEncryptedMessage", (req, res) => {
    // Implement logic to retrieve the last received encrypted message
    // Placeholder response
    res.json({ result: null });
  });

  // GET route for last received decrypted message
  // This should return { result: null } before any message is received
  onionRouter.get("/getLastReceivedDecryptedMessage", (req, res) => {
    // Implement logic to retrieve the last received decrypted message
    // Placeholder response
    res.json({ result: null });
  });

  // GET route for last message destination
  // This should return { result: null } before any message is received
  onionRouter.get("/getLastMessageDestination", (req, res) => {
    // Implement logic to retrieve the last message destination
    // Placeholder response
    res.json({ result: null });
  });

  // Starting the server on the assigned port
  const server = onionRouter.listen(BASE_ONION_ROUTER_PORT + nodeId, () => {
    console.log(`Onion router ${nodeId} is listening on port ${BASE_ONION_ROUTER_PORT + nodeId}`);
  });

  return server;
}
