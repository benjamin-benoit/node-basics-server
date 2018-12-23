import { Router } from "express";
import jwt from "jsonwebtoken";
import Project from "../models/project";
import passport from "passport";

const api = Router();

api.post("/add", async (req, res) => {
  const { name } = req.body;

  try {
    const project = new Project({
      name
    });

    await project.save();

    res.status(201).json({ data: { project }});
  } catch (err) {
    console.log(err.message);
    res.json({ err: err.message });
  }
});

export default api;
