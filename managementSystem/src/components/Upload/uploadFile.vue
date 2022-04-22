<template>
  <div class="container">
      <el-upload
        class="uploader"
        ref="upload"
        :action="doUploadUrl()"
        :headers="headers"
        :file-list="fileList"
        :limit="limit"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <!-- <i class="el-icon-plus"></i> -->
        <el-button size="small" plain class="uploadBtn">
          <img src="@/assets/images/hj/uploading@2x.png" alt="">
          上传文件
        </el-button>
        <div v-if="fileTypes.length>0" slot="tip" class="el-upload__tip">支持扩展名：{{fileTypes.join("、")}}</div>
      </el-upload>
      



      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'uploadFile',
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    fileList:{
      type: Array,
      default: function () {
        return []
      },
    },
    fileTypes:{
      type: Array,
      default: function () {
        return []
      },
    }
  },
  data() { 
    return {
      // dialogImageUrl: '',
      // dialogVisible: false,
    }
  },
  computed:{
    headers(){
      return {
        "Authorization":getToken()
      }
    }
  },
  components:{
  },
  methods:{
    doUploadUrl(){
      return window.origin+'/patient-care/sys/document/upload'
    },
    //图片个数超出提示
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`最多上传 ${this.limit} 个文件`);
    },
    // //图片预览
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    //图片列表中删除
    handleRemove(file, fileList) {
      // 这里加判断的原因是，区别是组件内部调用还是用户手动删除，当选择文件不符合before-upload的限制时，组件内部会调用一次remove函数从上传列表中删除此文件，此时文件的状态只有上传成功status才是success
      
      if (file.status === 'success') { 
        let resFileList = JSON.parse(JSON.stringify(fileList))
        this.$emit("getUrlFn", resFileList);

        // this.fileNum--  // 删除的时候，记得也要-- 不然success里通过比较上传成功个数和通过校验个数来进行的弹窗等操作会有问题
      }
    },

    // 图片上传成功
    handleAvatarSuccess(res, file,fileList) {
      debugger
      // this.fileList = URL.createObjectURL(file.raw);

      let resFileList = JSON.parse(JSON.stringify(this.fileList))

      if(res.code == 0){
        resFileList.push({name: file.name, url:res.data.src});
        this.$emit("getUrlFn", resFileList);
        this.$message.success('上传成功');

      }else{
        let uploadFiles = this.$refs.upload.uploadFiles
        for (let i = 0; i < uploadFiles.length; i++) {
                if (file.uid === uploadFiles[i].uid) {
                  uploadFiles.splice(i, 1)
                  break
                }
            }
            this.$message.error(`${file.name} 文件上传失败`)
      }
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      
      const fileSuffix= file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
			var isEXT = (this.fileTypes.indexOf(fileSuffix) > -1);
			if(this.fileTypes.length==0){isEXT=true}//不传fileTypes 则不限制文件类型
      if (!isEXT) {
        this.$alert('', '上传图片 仅支持'+ this.fileTypes.join("/") +'格式', {
            confirmButtonText: '确定',
					});	
        }
      const isLt2M = file.size / 1024 / 1024 < 500;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500MB!');
      }
      return isEXT && isLt2M;
    },

    //重置数据
		// reset(){
    //   //初始化图片
    //     this.fileList=[];

    //     var upload = this.$refs.upload;
    //     if (upload) {
    //       upload.clearFiles();
    //     }
    // }
  },
  created() {
    // this.reset()
  },
  mounted() {

  },
 }
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  ::v-deep .uploader{
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    .uploadBtn{
      span{
        display:flex;
        img{
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
    .el-upload__tip{
      width: calc(100% - 120px);
      color: #999999;
      margin-top:0px;
      margin: 0 10px;
    }
    .el-button{
      border: 1px solid #DCDFE6;
      border-color: #DCDFE6;
      color: #333333;
    }
  } 
  
}
</style>