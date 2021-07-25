const axios = require("axios");

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

async function get_grouped_image_uuid(groupedImage) {
  console.log(groupedImage);
  let uuid;
  await axios
    .get(`https://api.uploadcare.com/groups/${groupedImage}/`, {
      headers: {
        Authorization: process.env.UPLOAD_CARE_HEADER,
        Accept: "application/vnd.uploadcare-v0.5+json",
      },
    })
    .then((res) => (uuid = res.data.files[0].uuid))
    .catch((err) => console.log(err.toString()));
  return uuid;
}

module.exports = { get_uuid, images_clean_up, get_grouped_image_uuid };
