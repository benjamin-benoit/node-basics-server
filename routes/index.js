import { Router } from "express";
import passport from "passport";
import auth from "./auth";
import user from "./user";
import project from "./project";
import secured from "./secured";

const api = Router();

api.get("/", (req, res) => {
  res.json({
    name: "sanji.Api",
    meta: {
      version: "1.0.0",
      status: "running"
    }
  });
});

api.use("/auth", auth);
api.use("/user", user);
api.use("/project", project);
api.use("/", passport.authenticate("jwt", { session: false }), secured);

export default api;
