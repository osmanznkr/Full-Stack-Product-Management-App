module.exports = (router, app, products) => {
    router.get("/products", products.getProducts);
    router.get('/products/:product_id', products.getProductById )
    router.post('/products/create',app.oauth.authorise(), products.addProduct)
    router.put('/products/update/:product_id',  products.updateProduct)
    router.delete('/products/delete/:product_id',app.oauth.authorise(), products.deleteProductById)
    
    return router;
};