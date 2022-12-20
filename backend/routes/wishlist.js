const Cart = require("../models/Cart");

const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/addtowishlist", verifyToken, async (req, res) => {
  try {
    const wishList = await Cart.findOne({ userId: req.body.id, isCart: false });

    if (!wishList) {
      const wishListData = {
        userId: req.body.id,
        products: [req.body.product],
        isCart: false,
      };
      const newWishList = new Cart(wishListData);
      const savedWishlist = await newWishList.save();
      return res.status(200).json(savedWishlist);
    }

    const product = wishList.products.filter(
      (p) => p.productId === req.body.product.productId
    )[0];

    if (product) {
      return res.status(203).json("Product already in wishlist");
    } else {
      const updatedWishList = await Cart.findOneAndUpdate(
        { userId: req.body.id, isCart: false },
        {
          $addToSet: { products: req.body.product },
        },
        { safe: true, upsert: true, returnDocument: "after" }
      );
      return res.status(200).json(updatedWishList);
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

router.post("/removefromwishlist", verifyToken, async (req, res) => {
  try {
    const wishlist = await Cart.findOne({
      userId: req.body.userId,
      isCart: false,
    });

    if (!wishlist) {
      return res.status(200).json("wishlist is empty");
    }

    const updatedWishListProducts = wishlist.products.filter(
      (p) => p.productId !== req.body.productId
    );
    const updatedWishList = await Cart.findOneAndUpdate(
      { userId: req.body.userId, isCart: false },
      {
        $set: { products: updatedWishListProducts },
      },
      { safe: true, upsert: true, returnDocument: "after" }
    );
    const productIds = updatedWishList.products.map((p) => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    return res.status(200).json(products);
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

//GET USER WishList
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wishList = await Cart.findOne({
      userId: req.params.id,
      isCart: false,
    });

    if (!wishList) {
      return res.status(200).json([]);
    }
    const productIds = wishList.products.map((p) => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const wishlistProducts = products.map((product) => {
      const quantity = wishList.products.find(
        (p) => p.productId == product._id
      ).quantity;
      return { ...product._doc, quantity };
    });
    res.status(200).json(wishlistProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// routh checks if product id is in wishlist
router.get(
  "/find/:userId/:productId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const wishList = await Cart.findOne({
        userId: req.params.userId,
        isCart: false,
      });

      if (!wishList) {
        return res.status(200).json(false);
      }

      const product = wishList.products.filter(
        (p) => p.productId === req.params.productId
      )[0];

      if (product) {
        return res.status(200).json(true);
      } else {
        return res.status(203).json(false);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const wishlists = await Cart.find();
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

module.exports = router;
