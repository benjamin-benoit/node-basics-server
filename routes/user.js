import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import passport from "passport";
import { pick } from 'lodash'

const api = Router();

// api.delete('/:id', async (req, res) => {
//   try {
//     const { uuid } = req.user
//     const { id } = req.params
//
//     const bucket = await Bucket.findByPk(id)
//     await bucket.destroy()
//
//     await destroyBucket(uuid, bucket.name)
//
//     res.status(204).end()
//   } catch (err) {
//     res.status(400).json({ err: err.message })
//   }
// })

api.delete('/:uuid', passport.authenticate("jwt", { session: false }), async (req, res) => {
  console.log("delete route");
  try {
    const { user } = req
    const { uuid } = req.params

    console.log(user);

    await User.destroy({where:{uuid: req.params.uuid}})
            .then( response => {
              res.status(200).json({msg: "User deleted successfully." }) })
            .catch( err => {
              res.status(400).json({ error: err.original.detail })
    });

    res.status(200).json({
      message: "User successfully deleted"
    })
  } catch (err) {
    res.status(400).json({ err })
  }
})

api.put('/:uuid', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { user } = req
    const { uuid } = req.params

    if (user.uuid !== uuid) {
      res.status(403).json({ err: 'Permission denied' })
    }


    // const fields = pick(req.body, ['nickname', 'email', 'password', 'password_confirmation'])


    //
    // await user.update(JSON.parse(JSON.stringify(user)))
    //
    // res.status(200).json

    console.log(req.body);
    console.log(user);
    // await user.update(req.body)
    User.update(
      { nickname: req.body.nickname,
        email: req.body.email,
        password: "password",
        password_confirmation: "password"
      }, { where : {uuid:req.params.uuid},
      returning: true, plain: true })

      res.status(200).json
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  })

  export default api;
