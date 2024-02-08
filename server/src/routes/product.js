const {Router}= require('express')
const { getProducts, getProductById, addProduct, updateProduct, deleteProductById } = require('../controllers/product.js')
const router = Router()

router.get('/products', getProducts )
router.get('/products/:product_id', getProductById )
router.post('/products/create',addProduct)
router.put('/products/update/:product_id', updateProduct)
router.delete('/products/delete/:product_id', deleteProductById)


module.exports = router