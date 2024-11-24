const Router = require("express");
const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.post(
  "/registration",
  [
    check("password", "Password must be longer than 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { phone, password, clientId ,city} = req.body;
      const candidate = await Client.findOne({ clientId });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `Client with client Id ${clientId} already exists` });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = new Client({ phone, password: hashPassword, clientId, city });
      await user.save();
      // await fileService.createDir(req, new File({ user: user.id, name: "" }));
      return res.json({ message: "Client was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { clientId, password } = req.body;
    const user = await Client.findOne({ clientId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ clientId: user.clientId }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      client: {
        id: user.id,
        phone: user.phone,
        orders: user.orders
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await Client.findOne({ _id: req.user.id });
    const token = jwt.sign({ clientId: user.clientId }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      client: {
        id: user.id,
        phone: user.phone,
        orders: user.orders
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

module.exports = router;
