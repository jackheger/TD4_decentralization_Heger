import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

export type Node = {
  nodeId: number;
  pubKey: string;
};

export type RegisterNodeBody = {
  nodeId: number;
  pubKey: string;
};

export type GetNodeRegistryBody = {
  nodes: Node[];
};

// This would be your in-memory storage of registered nodes, to be replaced or expanded
// according to your storage and retrieval logic
const nodeRegistry: Node[] = [];

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  // Status route to indicate the registry is live
  _registry.get("/status", (req, res) => {
    res.send('live');
  });

  // Route to return all registered nodes
  _registry.get("/nodes", (req, res) => {
    // Logic to return all nodes could be more complex in a real application
    res.json({ nodes: nodeRegistry });
  });

  // Route to return a single node's public key by nodeId
  _registry.get("/node/:nodeId", (req, res) => {
    const nodeId = parseInt(req.params.nodeId, 10);
    const node = nodeRegistry.find(n => n.nodeId === nodeId);
    if (node) {
      res.json(node);
    } else {
      res.status(404).send('Node not found');
    }
  });

  // Start listening for requests on the designated port
  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`Registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}
