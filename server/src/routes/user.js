const {Router}= require('express')
const { getUsers, getUserById, addUser, updateUser, deleteUserById } = require('../controllers/user')

const router = Router()

router.get('/users', getUsers )
router.get('/users/:id', getUserById )
router.post('/users/create',addUser)
router.put('/users/update/:product_id', updateUser)
router.delete('/users/delete/:product_id', deleteUserById)


module.exports = router