import { Router } from "express";
// import { AddData,getData } from "./reqhandler.js";
import * as rh from './reqhandler.js'
import auth from './middleware/auth.js'

const router = Router()

router.route('/addData').post(auth,rh.AddData)
router.route('/get').get(rh.getData)
router.route('/get/:id').get(rh.getSingledata)
router.route('/update/:id').put(auth,rh.updateData)
router.route('/delete/:id').delete(rh.deleteData)

router.route('/addUser').post(rh.AddUser)
router.route('/login').post(rh.Login)
router.route('/update').put(auth,rh.updateUser)

export default router