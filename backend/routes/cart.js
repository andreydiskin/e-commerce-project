const Cart = require("../models/Cart");

const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// router for cart if user cart exist add  product to cart else create new cart and add product to cart

router.put("/updateproductamount", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId, isCart: true });

    if (!cart) {
      return res.status(200).json("Cart is empty");
    }

    const product = cart.products.filter(
      (p) => p.productId === req.body.productId
    )[0];

    if (product) {
      let updatedCartProducts = cart.products;
      const index = updatedCartProducts.findIndex((p) => {
        return p.productId === req.body.productId;
      });

      updatedCartProducts[index].quantity = req.body.quantity;

      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.body.userId, isCart: true },
        {
          $set: { products: updatedCartProducts },
        },
        { safe: true, upsert: true, returnDocument: "after" }
      );

      const productIds = updatedCart.products.map((p) => p.productId);
      const products = await Product.find({ _id: { $in: productIds } });

      const cartProducts = products.map((product) => {
        const quantity = cart.products.find(
          (p) => p.productId == product._id
        ).quantity;
        return { ...product._doc, quantity: quantity };
      });

      return res.status(200).json(cartProducts);
    } else {
      return res.status(200).json("Product not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/addtocart", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.id, isCart: true });

    if (!cart) {
      const cartData = {
        userId: req.body.id,
        products: [req.body.product],
      };
      const newCart = new Cart(cartData);
      const savedCart = await newCart.save();
      return res.status(200).json(savedCart);
    }

    const product = cart.products.filter(
      (p) => p.productId === req.body.product.productId
    )[0];

    if (product) {
      let updatedCartProducts = cart.products;
      const index = updatedCartProducts.findIndex((p) => {
        return p.productId === req.body.product.productId;
      });

      updatedCartProducts[index].quantity =
        updatedCartProducts[index].quantity + req.body.product.quantity;

      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.body.id, isCart: true },
        {
          $set: { products: updatedCartProducts },
        },
        { safe: true, upsert: true, returnDocument: "after" }
      );
      return res.status(200).json(updatedCart);
    } else {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.body.id, isCart: true },
        {
          $addToSet: { products: req.body.product },
        },
        { safe: true, upsert: true, returnDocument: "after" }
      );
      return res.status(200).json(updatedCart);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// endpoint to remove item from cart via product id

router.post("/removefromcart", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId, isCart: true });

    if (!cart) {
      return res.status(200).json("Cart is empty");
    }

    const updatedCartProducts = cart.products.filter(
      (p) => p.productId !== req.body.productId
    );
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.body.userId, isCart: true },
      {
        $set: { products: updatedCartProducts },
      },
      { safe: true, upsert: true, returnDocument: "after" }
    );

    const productIds = updatedCart.products.map((p) => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartProducts = products.map((product) => {
      const quantity = cart.products.find(
        (p) => p.productId == product._id
      ).quantity;
      return { ...product._doc, quantity };
    });
    return res.status(200).json(cartProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id, isCart: true });

    if (!cart) {
      return res.status(200).json([]);
    }
    const productIds = cart.products.map((p) => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartProducts = products.map((product) => {
      const quantity = cart.products.find(
        (p) => p.productId == product._id
      ).quantity;
      return { ...product._doc, quantity };
    });
    res.status(200).json(cartProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
