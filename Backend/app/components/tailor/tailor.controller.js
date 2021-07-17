const Tailor = require("./tailor.model");
const {
  tailorSchema,
  tailorUpdateAboutSchema,
  tailorUpdateNameSchema,
} = require("../../utility/validationSchema");
const { hashing } = require("../../utility/password");
const { is_valid_id } = require("../../utility/errors");

filter_tailors_get = async (req, res, next) => {
  const filter = req.query;
  try {
    const tailors = await Tailor.find({ isTailor: true, ...filter });
    res.status(200).json(tailors);
  } catch (err) {
    next(err);
  }
};

all_tailors_get = async (req, res, next) => {
  try {
    const tailors = await Tailor.find({ isTailor: true });
    res.status(200).json(tailors);
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
    }
    if (req.body.name || req.body.designFor) {
      tailor = await tailorUpdateNameSchema
        .validateAsync(req.body)
        .catch((err) => {
          throw { status: 400, message: err.message };
        });
    }
    const tailor = await Tailor.findByIdAndUpdate(_id, req.body);
    if (req.body.avatar) {
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
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

function get_uuid(url) {
  const result = url.split("/");
  return result[3];
}

async function images_clean_up(oldImg) {
  await axios
    .delete(`https://api.uploadcare.com/files/${oldImg}/`, {
      headers: {
        Authorization: process.env.UPLOAD_CARE_HEADER,
        Accept: "application/vnd.uploadcare-v0.5+json",
        Date: new Date().toUTCString(),
      },
    })
    .catch((err) => console.log(err.toString()));
}

module.exports = {
  filter_tailors_get,
  all_tailors_get,
  tailor_get,
  tailor_post,
  tailor_patch,
  tailor_delete,
};
