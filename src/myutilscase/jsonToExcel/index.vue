<template>
    <div class="content">
        <div class="upload-box left" @click="importFile">
            <upload-filled style="width: 10em; height: 10em; margin-right: 8px" />
            <div>点击即可导入</div>
            <input type="file" style="display: none" ref="inputFile" @change="changeFile" />
        </div>
        <div class="pd24 center right">
            <el-input type="textarea" clearable class="json-box" v-model="myjson" />
            <el-button type="primary" class="mt20" @click="toExcel">生成excel</el-button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import * as XLSX from "xlsx";

const downloadExcel = (el: Element, fileName: string) => {
    const thead = el.querySelector(".el-table__header-wrapper thead")?.innerHTML;
    const tbody = el.querySelector(".el-table__body-wrapper tbody")?.innerHTML;
    let html = `<table border>
                  <thead>
                    ${thead}
                  </thead>
                  <tbody>
                    ${tbody}
                  </tbody>
                </table>`;
    html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel">
            <head>
            <xml>
              <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                <x:WorksheetOptions>
                  <x:Print><x:ValidPrinterInfo /></x:Print>
                </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
              </x:ExcelWorkbook>
            </xml>
            </head>
            <style>
            table{vnd.ms-excel.numberformat:@;}
            th,td{
              text-align: center;
            }
            .left{
              text-align: left;
            }
            </style>
            ${html}
            </html>
          `;
    let excelBlob = new Blob([html], { type: "application/vnd.ms-excel" });
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = URL.createObjectURL(excelBlob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const inputFile = ref<HTMLInputElement | null>(null);
const importFile = () => {
    if (inputFile.value) {
        inputFile.value.click();
    }
};

const exportExcel = (data: string, name: string) => {
    const ws = XLSX.utils.json_to_sheet(JSON.parse(data));
    // 设置每列的宽度
    //   ws["!cols"] = cellWidth;
    // 设置第一行的高度
    //   ws["!rows"] = [{ hpx: 30 }];
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将sheet添加到工作簿中, 并命名sheet
    XLSX.utils.book_append_sheet(wb, ws, "sheet");

    // 将工作簿导出为xlsx文件
    XLSX.writeFile(wb, `${name}.xlsx`);
};

const myjson = ref<string>("");

const toExcel = () => {
    exportExcel(myjson.value, "test");
};

const changeFile = (e: any) => {
    const file = e.target.files[0];
    const type = file.name.split(".");
    if (type[type.length - 1] !== "json") {
        ElMessage.error("只能选择json文件");
        return false;
    }
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (ev: any) => {
        const data = ev.currentTarget.result;
        exportExcel(data, type[0]);
    };
};
</script>
  
<style lang="scss" scoped>
.content {
    display: flex;

    .upload-box {
        height: 500px;
        text-align: center;
        font-size: 20px;
        margin: 24px;
        color: #1890ff;
        border: 1px #1890ff dotted;
        width: 50%;
        align-items: center;
        padding: 120px;
        box-sizing: border-box;
    }

    .right {
        width: 50%;

        .json-box ::v-deep .el-textarea__inner {
            height: 500px;
            margin-bottom: 24px;
        }

        .pd24 {
            padding: 24px;
        }
    }
}

.center {
    text-align: center;
    margin: 20px;
}
</style>
  