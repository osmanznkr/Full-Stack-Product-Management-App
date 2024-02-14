const {Router}= require('express')
const { getUsers, getUserById, addUser, updateUser, deleteUserById, getUserByUsername } = require('../controllers/user')

const router = Router()

router.get('/users', getUsers )
router.get('/users/:id', getUserById )
router.get('/user/:username', getUserByUsername);
router.post('/users/create',addUser)
router.put('/users/update/:id', updateUser)
router.delete('/users/delete/:id', deleteUserById)


module.exports = router