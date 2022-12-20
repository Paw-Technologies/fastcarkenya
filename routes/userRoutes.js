const express = require('express');
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const productRouter =require('./productRoutes')

const router = express.Router();
const users = require('../models/userModel')


router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

// Since middlewares work sequentially, another option is use (router.use(authController.protect))

// Protect all routes after this middleware
// router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword)

// router.get('/me', userController.getMe, userController.getUser)

router.get('/me', async(req, res)=>{
    let user = await users.findById(req.headers.id)
    if(user === null){
        res.json({
            message: "Account not found",
            err: true
        })
        return
    }
    res.json({
        data: user
    })
})

router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use('/:userId/products', productRouter)

// router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);



router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);



module.exports = router;