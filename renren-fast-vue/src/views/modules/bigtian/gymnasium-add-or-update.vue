<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    @close="closeImg"
      :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="体育馆名称" prop="gymnasium">
        <el-input v-model="dataForm.gymnasium" placeholder="体育馆名称"></el-input>
      </el-form-item>
      <el-form-item label="场馆类型" prop="type">
        <el-select v-model="dataForm.type" multiple placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in option"
            :key="item.id"
            :label="item.type"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" disabled="" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="longitudeLatitude">
        <el-input v-model="dataForm.longitudeLatitude" placeholder="经纬度" disabled=""></el-input>
        <el-button type="primary" size="mini" @click="showMaps">选择经纬度</el-button>
      </el-form-item>
      <el-form-item label="图片">
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
      <el-form-item label="场馆介绍" prop="description">
        <el-input v-model="dataForm.description" placeholder="场馆介绍" type="textarea" rows="5"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <el-dialog
      title="选择位置"
      custom-class="multipleImgDialog hp90"
      append-to-body
      modal="false"
      :visible.sync="showMap"

    >
      <maps @data="longitudeLatitude"></maps>
    </el-dialog>
  </el-dialog>
</template>

<script>
import maps from './Map'

export default {
  components: {maps},
  data() {
    return {
      fileList: [],
      Headers: {},
      actionUrl: '',
      option: [],
      showMap: false,
      visible: false,
      dataForm: {
        id: 0,
        gymnasium: '',
        type: '',
        description: '',
        address: '',
        longitudeLatitude: '',
        images: ''
      },
      dataRule: {
        gymnasium: [
          {required: true, message: '体育馆名称不能为空', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '场馆类型不能为空', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '场馆介绍不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '地址不能为空', trigger: 'blur'}
        ],
        longitudeLatitude: [
          {required: true, message: '经纬度不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    closeImg() {
      this.fileList = []
    },
    handleAvatarSuccess(res, file) {
      this.dataForm.images = res.msg
    },
    getType() {
      this.$http({
        url: this.$http.adornUrl(`/bigtian/gymnasiumtype/list`),
        method: 'get'
      }).then(res => {
        let list = res.data.page.list
        list.forEach(item => {
          item.id = item.id + ''
        })
        this.option = list
      })
    },
    showMaps() {
      this.showMap = true
    },
    longitudeLatitude(data) {
      this.dataForm.longitudeLatitude = data.longitudeLatitude
      this.dataForm.address = data.address
      this.showMap = false
    },
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/bigtian/gymnasium/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.gymnasium = data.gymnasium.gymnasium
              this.dataForm.type = data.gymnasium.type.split(',')
              this.dataForm.description = data.gymnasium.description
              this.dataForm.address = data.gymnasium.address
              this.dataForm.longitudeLatitude = data.gymnasium.longitudeLatitude
              this.dataForm.images = data.gymnasium.images
              this.fileList.push({name: '', url: data.gymnasium.images})
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
            url: this.$http.adornUrl(`/bigtian/gymnasium/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'gymnasium': this.dataForm.gymnasium,
              'type': this.dataForm.type.toString(),
              'description': this.dataForm.description,
              'address': this.dataForm.address,
              'longitudeLatitude': this.dataForm.longitudeLatitude,
              'images': this.dataForm.images
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
    this.getType()
    this.actionUrl = this.$http.adornUrl(`/uploadImg`)
  }

}
</script>
