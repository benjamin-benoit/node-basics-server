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

api.put("/update/:id", async (req, res, next) => {
  const project = await Project.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  )
    .then(response => {
      res.status(200).json({ msg: "Project successfully updated." });
    })
    .catch(err => {
      res.status(400).json({ error: err.original.detail });
    });
});

api.delete("/:id", async (req, res) => {
  const project = await Project.destroy({ where: { id: req.params.id } })
    .then(response => {
      res.status(200).json({ msg: "Project successfully deleted." });
    })
    .catch(err => {
      res.status(400).json({ error: err.original.detail });
    });
});

export default api;
