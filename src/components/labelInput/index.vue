<template>
    <div class="yh-label-input" :style="{ height: height, width: width }" @click="clickInput">
        <div class="yh-tag-box" ref="tagBox">
            <el-tag v-for="(tag, index) in tags" :key="index" closable @close="delTag(index)" class="yh-tag">{{ tag }}
            </el-tag>
        </div>
        <el-input v-model.trim="inputData" ref="testInput" @keydown.enter="addTag" class="yh-tag-input"
            :maxlength="maxTag"></el-input>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            default: '100px',
            type: String
        },
        height: {
            default: '40px',
            type: String
        },
        maxTag: {
            default: 50,
            type: Number
        },
        labelName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputData: '',
            tags: []
        }
    },
    methods: {
        delTag(index) {
            this.tags.splice(index, 1)
            let tagStr = this.tags.toString()
            this.$emit('saveTag', tagStr)
        },
        addTag() {
            if (this.tags.find(item => item == this.inputData)) {
                return this.$message.warning('已存在' + this.inputData + '标签')
            }
            if (!this.inputData) return;
            let length = this.inputData.split('/').length
            if (length > 2) {
                return this.$message.warning('标签格式应为A/B，或者B')
            }
            this.tags.push(this.inputData)
            let tagStr = this.tags.toString()
            this.$emit('saveTag', tagStr)
            this.inputData = ''
        },
        clickInput() {
            this.$refs.testInput.focus()
        }
    },
    mounted() {
        if (this.labelName) {
            this.tags = this.labelName.split(',')
        }
    }
}
</script>

<style lang="scss" scoped>
.yh-label-input {
    position: relative;
    overflow: auto;
    border: 1px solid #ccc;

    .yh-tag-box {
        display: flex;
        z-index: 999;
        align-items: center;
        flex-wrap: wrap;

        .yh-tag {
            margin-left: 10px;
            margin-top: 10px;
        }
    }

    .yh-tag-input ::v-deep .el-input__inner {
        border: 0px;
        display: inline-block;
    }
}
</style>
