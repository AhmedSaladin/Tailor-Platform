const Tailor = require("./tailor.model");
const User = require("../user/user.model");
const {
  tailorSchema,
  tailorUpdateAboutSchema,
  tailorUpdateNameSchema,
} = require("../../utility/validationSchema");
const { hashing } = require("../../utility/password");
const {
  get_uuid,
  images_clean_up,
  get_grouped_image_uuid,
} = require("../../utility/imageHandling");
const { is_valid_id, is_not_found } = require("../../utility/errors");
const { cleaner } = require("../../utility/relationCleaner");

filter_tailors_get = async (req, res, next) => {
  const filter = req.query;
  console.log(filter);
  try {
    const tailors = await Tailor.find({ isTailor: true, ...filter });
    res.status(200).json(tailors);
  } catch (err) {
    next(err);
  }
};

search_tailors_get = async (req, res, next) => {
  const { name } = req.query;
  try {
    const tailors = await Tailor.find({
      name: { $regex: `${name}`, $options: "i" },
    });

    res.status(200).json(tailors);
  } catch (err) {
    next(err);
  }
};

all_tailors_get = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 2);
    const count = await Tailor.find({ isTailor: true }).countDocuments();
    const totalPages = Math.ceil(count / limit);
    const tailors = await Tailor.find({ isTailor: true })
      .skip((currentPage - 1) * limit)
      .limit(limit);
    res.status(200).json({ tailors, totalPages });
  } catch (err) {
    next(err);
  }
};

tailor_get = async (req, res, next) => {
  const _id = req.params.id;
  try {
    is_valid_id(_id);
    const tailor = await Tailor.findById(_id);
    res.status(200).json(tailor);
  } catch (err) {
    next(err);
  }
};

tailor_post = async (req, res, next) => {
  const { email, phone } = req.body;
  try {
    tailor = await Tailor.findOne({ email });
    if (tailor) throw { status: 400, message: "Email already registered." };

    user = await User.findOne({ email });
    if (user) throw { status: 400, message: "Email already registered." };

    tailor = await Tailor.findOne({ phone });
    if (tailor && tailor.phone === req.body.phone)
      throw {
        status: 400,
        message: "Phone number is linked to an existing account.",
      };

    tailor = await tailorSchema.validateAsync(req.body).catch((err) => {
      throw { status: 400, message: err.message };
    });
    const hashed_password = await hashing(tailor.password);
    await Tailor.create({
      name: tailor.name,
      email: tailor.email,
      phone: tailor.phone,
      gender: tailor.gender,
      designFor: tailor.designFor,
      password: hashed_password,
    });
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

tailor_patch = async (req, res, next) => {
  const _id = req.params.id;
  try {
    is_valid_id(_id);
    if (req.body.about) {
      tailor = await tailorUpdateAboutSchema
        .validateAsync(req.body)
        .catch((err) => {
          throw { status: 400, message: err.message };
        });
    } else if (req.body.name || req.body.designFor) {
      tailor = await tailorUpdateNameSchema
        .validateAsync(req.body)
        .catch((err) => {
          throw { status: 400, message: err.message };
        });
    }
    await Tailor.findByIdAndUpdate(_id, req.body);
    if (req.body.avatar) {
      const tailor = await Tailor.findById(_id);
      const oldImg = get_uuid(tailor.avatar);
      const newImg = get_uuid(req.body.avatar);
      if (oldImg !== newImg) await images_clean_up(oldImg);
    }
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

tailor_delete = async (req, res, next) => {
  const _id = req.params.id;
  try {
    is_valid_id(_id);
    const tailor = await Tailor.findByIdAndDelete(_id);
    await images_clean_up(tailor.avatar);
    await cleaner("tailor", _id, "comment");
    await cleaner("tailor", _id, "order");
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

img_delete = async (req, res, next) => {
  const imgURL = req.query.img;
  const { id } = req.query;
  try {
    const tailor = await Tailor.findById(id);
    const uuid = await get_grouped_image_uuid(get_uuid(imgURL));
    is_not_found(uuid);
    await images_clean_up(uuid);
    tailor.gallary = tailor.gallary.filter((img) => img !== imgURL);
    await Tailor.findByIdAndUpdate(id, tailor);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  search_tailors_get,
  filter_tailors_get,
  all_tailors_get,
  tailor_get,
  tailor_post,
  tailor_patch,
  tailor_delete,
  img_delete,
};
