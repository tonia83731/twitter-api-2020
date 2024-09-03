const imgur = require("imgur");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
imgur.setClientId(IMGUR_CLIENT_ID);
const imgurFileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) resolve(null);
    return imgur
      .uploadFile(file.path)
      .then((img) => {
        resolve(img?.link || null);
      })
      .catch((error) => reject(error));
  });
};

module.exports = { imgurFileHandler };
