const multer = require("multer");

const upload = multer({ dest: "temp/" });

const multiuploads = upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "cover",
    maxCount: 1,
  },
]);

module.exports = { multiuploads };
