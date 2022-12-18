const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router({mergeParams:true});


// POST /users/hfg4345345df/products
// GET /users/hfg4345345df/products
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.setUserIds,productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
