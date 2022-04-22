<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    @close="closeImg"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="名称" prop="type">
        <el-input v-model="dataForm.type" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload
          ref="uploads"
          :limit="1"
          :on-success="handleAvatarSuccess"
          :action="actionUrl"
          :headers="Headers"
          list-type="picture-card"
          :file-list="fileList"
          :auto-upload="true">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      Headers: {},
      actionUrl: '',
      visible: false,
      dataForm: {
        id: 0,
        type: '',
        icon: ''
      },
      dataRule: {
        type: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ],
        icon: [{required: true, message: '图标不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    closeImg() {
      this.fileList = []
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.icon = res.msg
    },
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/bigtian/gymnasiumtype/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.type = data.gymnasiumType.type
              this.fileList.push({url: data.gymnasiumType.icon})
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/bigtian/gymnasiumtype/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'type': this.dataForm.type,
              'icon': this.dataForm.icon
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  },
  mounted() {
    this.Headers.token = this.$cookie.get('token')
    this.actionUrl = this.$http.adornUrl(`/uploadImg`)
  }
}
</script>
