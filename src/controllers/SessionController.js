const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  },

  async delete(req, res) {
    const { email } = req.query;

    let user = await User.findOne({ email: email });

    user = await User.deleteOne({ email });

    return res.json(user);
  }
};
  