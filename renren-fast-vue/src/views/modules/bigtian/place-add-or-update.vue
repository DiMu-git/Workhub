<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    @close="closeImg"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="体育馆" prop="parentId">
        <el-select v-model="dataForm.parentId" filterable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.gymnasium"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="dataForm.typeId" filterable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.type"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约费用" prop="price">
        <el-input v-model="dataForm.price" ninput="value=value.replace(/[^\d.]/g,'')" placeholder="预约费用"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="images">
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
      <el-form-item label="场地描述" prop="description">
        <el-input :rows="5" v-model="dataForm.description" type="textarea" placeholder="场地描述"></el-input>
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
      options: [],

      dataForm: {
        id: 0,
        typeId: undefined,
        parentId: '',
        price: undefined,
        description: '',
        images: '',
        name: ''
      },
      dataRule: {
        parentId: [
          {required: true, message: '体育馆不能为空', trigger: 'change'}
        ],
        typeId: [
          {required: true, message: '场地类型不能为空', trigger: 'change'}
        ],
        price: [
          {required: true, message: '预约费用不能为空', trigger: 'blur'},
          {type: 'number', message: '请输入数字类型', trigger: 'blur', transform: (value) => Number(value)}
        ],
        description: [
          {required: true, message: '场地描述不能为空', trigger: 'blur'}
        ],
        images: [
          {required: true, message: '图片不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.Headers.token = this.$cookie.get('token')
    this.actionUrl = this.$http.adornUrl(`/uploadImg`)
  },
  methods: {

    closeImg() {
      this.fileList = []
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.images = res.msg
    },
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/bigtian/place/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.parentId = data.place.parentId
              this.dataForm.price = data.place.price
              this.dataForm.description = data.place.description
              this.dataForm.images = data.place.images
              this.dataForm.name = data.place.name
              this.dataForm.typeId=data.place.typeId
              this.fileList.push({url:data.place.images})
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
            url: this.$http.adornUrl(`/bigtian/place/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'parentId': this.dataForm.parentId,
              'price': this.dataForm.price,
              'description': this.dataForm.description,
              'images': this.dataForm.images,
              'name': this.dataForm.name,
              "typeId":this.dataForm.typeId,
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
  }
}
</script>
