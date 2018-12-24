import { Router } from "express";
import jwt from "jsonwebtoken";
import Project from "../models/project";
import User from "../models/user";
import passport from "passport";

const api = Router();

api.get("/", async (req, res) => {
  Project.findAll()
    .then(response => {
      res.status(200).json({ data: response });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

api.post("/add", async (req, res) => {
  const { name } = req.body;

  try {
    const project = new Project({
      name
    });

    await project.save().then(response => {
      res.status(200).json({ msg: "Project successfully created." });
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

export default api;
