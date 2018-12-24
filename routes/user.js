import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import passport from "passport";
import { pick } from "lodash";

const api = Router();

api.delete(
  "/:uuid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { uuid } = req.params;

      await User.destroy({ where: { uuid: req.params.uuid } })
        .then(response => {
          res.status(200).json({ msg: "User successfully deleted." });
        })
        .catch(err => {
          res.status(400).json({ error: err.original.detail });
        });
    } catch (err) {
      res.status(400).json({ err });
    }
  }
);

api.put(
  "/:uuid",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { uuid } = req.params;

      if (user.uuid !== uuid) {
        res.status(403).json({ err: "Permission denied" });
      }

      User.update(
        {
          nickname: req.body.nickname,
          email: req.body.email,
          password: "password",
          password_confirmation: "password"
        },
        { where: { uuid: req.params.uuid }, returning: true, plain: true }
      )
        .then(response => {
          res.status(200).json({ msg: "User successfully updated." });
        })
        .catch(err => {
          res.status(400).json({ error: err.original.detail });
        });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
);

export default api;
