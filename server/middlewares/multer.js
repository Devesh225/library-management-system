import multer from "multer";

const storage = multer.memoryStorage();

const singleFileUpload = multer({storage}).single("file");

export default singleFileUpload;