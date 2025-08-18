
exports.uploadImage = async (req, res) => {
  try {
    if (!req) {
      return res.status(400).send("Không có file nào được tải lên");
    }
    console.log(req);

    // Check file type
    if (req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg") {
      return res.status(400).send("Chỉ chấp nhận file hình ảnh (JPEG/PNG/JPG)");
    }
    if (req.file.size > 2 * 1024 * 1024) { // 2MB limit
      return res.status(400).send("File quá lớn. Vui lòng tải lên file nhỏ hơn 2MB.");
    }

    const publicUrl = "https://photo.znews.vn/w1920/Uploaded/mdf_eioxrd/2021_07_06/1q.jpg"

    return res.status(200).send({
      DT: publicUrl,
      EM: "Upload file successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Upload file failed",
      error: error.message,
    });
  }
};
