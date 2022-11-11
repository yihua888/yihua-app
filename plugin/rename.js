export default {
  info: "文件夹下的文件重命名",
  codeStr: `
    const fs = require("fs");
    const path = require("path");
    
    const walkSync = (curDirPath, cb) => {
      fs.readdirSync(curDirPath, { withFileTypes: true }).forEach(
        (dirent, index) => {
          const filePath = path.join(curDirPath, dirent.name);
          if (dirent.isFile()) {
            cb(filePath, dirent, index);
          } else if (dirent.isDirectory()) {
            walkSync(filePath, cb);
          }
        }
      );
    };
    
    walkSync("文件夹", (filePath, stat, index) => {
      const arr = filePath.split("\\");
      const oldName = arr[arr.length - 1];
      const newName = filePath.replace(oldName, index + "_" + oldName);
      fs.rename(filePath, newName, (err) => {
        console.log(err);
      });
    });`,
};
