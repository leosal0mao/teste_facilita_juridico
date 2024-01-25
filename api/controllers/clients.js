import { db } from "../db.js"

export const getClients = (_, res) => {
    const query = "SELECT * FROM clients";

    db.query(query, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addClient = (req, res) => {
    const q =
      "INSERT INTO clients('name', 'email', 'phone', 'X', 'Y') VALUES(?)";
  
    const values = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.X,
      req.body.Y,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente criado com sucesso.");
    });
  };
  
  export const updateClient = (req, res) => {
    const q =
      "UPDATE clients SET 'name' = ?, 'email' = ?, 'phone' = ?, 'X' = ?, 'Y' = ?, WHERE `id` = ?";
  
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.X,
        req.body.Y,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente atualizado com sucesso.");
    });
  };
  
  export const deleteClient = (req, res) => {
    const q = "DELETE FROM clients WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente deletado com sucesso.");
    });
  };