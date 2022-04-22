<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="微信openId" prop="wxOpenId">
      <el-input v-model="dataForm.wxOpenId" placeholder="微信openid"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="dataForm.nickName" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="dataForm.realName" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="identityCard">
      <el-input v-model="dataForm.identityCard" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio v-model="dataForm.sex" :label="1">男</el-radio>
      <el-radio v-model="dataForm.sex" :label="0">女</el-radio>
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
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          wxOpenId: '',
          nickName: '',
          phone: '',
          realName: '',
          identityCard: '',
          sex: 0
        },
        dataRule: {
          wxOpenId: [
            { required: true, message: '微信openid不能为空', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur' }
          ],
          identityCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '0：女，1：男不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/bigtian/wxuser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.wxOpenId = data.wxUser.wxOpenId
                this.dataForm.nickName = data.wxUser.nickName
                this.dataForm.phone = data.wxUser.phone
                this.dataForm.realName = data.wxUser.realName
                this.dataForm.identityCard = data.wxUser.identityCard
                this.dataForm.sex = data.wxUser.sex
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bigtian/wxuser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'wxOpenId': this.dataForm.wxOpenId,
                'nickName': this.dataForm.nickName,
                'phone': this.dataForm.phone,
                'realName': this.dataForm.realName,
                'identityCard': this.dataForm.identityCard,
                'sex': this.dataForm.sex
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
