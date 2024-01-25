import express from "express";
import { addClient, deleteClient, getClients, updateClient } from "../controllers/clients.js";

const router = express.Router();

router.get("/", getClients);

router.post("/", addClient)

router.put("/:id", updateClient)

router.delete("/:id", deleteClient)

export default router;