<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-form-item :label="$t('name')">
            <a-input :placeholder="$t('namePlaceholder')" v-decorator="['realname']" />
          </a-form-item>
          <a-form-item :label="$t('descs')">
            <a-textarea rows="4" :placeholder="$t('descsPlaceholder')" v-decorator="['descs']" />
          </a-form-item>

          <a-form-item :label="$t('Email')" :required="false">
            <a-input :placeholder="$t('Email')" v-decorator="['email']" />
          </a-form-item>

          <a-form-item :label="$t('birthday')" :required="false">
            <a-date-picker :placeholder="$t('birthday')" v-decorator="['birthday']" />
          </a-form-item>

          <a-form-item>
            <!-- <a-button type="primary">提交</a-button> -->
            <a-button type="primary" style="margin-left: 8px">{{$t('Save')}}</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px',textAlign: 'center'}">
        <!-- <div class="ant-upload-preview" @click="onUpload">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" />
        </div>-->
        <a-upload
          accept=".png, .jpg, .gif"
          class="ArticleUpload"
          list-type="picture-card"
          @preview="handlePreview"
          :remove="handleRemove"
          @change="handleChange"
          :file-list="fileList"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">图片上传</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-col>
    </a-row>

    <!-- <avatar-modal ref="modal" @ok="setavatar" /> -->
  </div>
</template>

<script>
import AvatarModal from "./AvatarModal";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  i18n: require("./i18n"),
  components: {
    AvatarModal,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "base" }),
      // 文件
      fileList: [],
      // cropper
      preview: {},
      option: {
        img: "/avatar2.jpg",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
      },
      // 是否上传图片
      ishandleChange: false,
      // 移除的图片sid
      FileRemoveSID: null,
      /** 图片 */
      previewImage: "",
      previewVisible: false,
    };
  },
  methods: {
    /** 保存按钮 */
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if (!error) {
          let obj = {};
          console.log(values);
        }
      });
    },
    setavatar(url) {
      console.log(url);
      // this.option.img = url;
    },
    //===============  图片上传（start） =============
    handleRemove(file) {
      if (file.sid) {
        this.FileRemoveSID = file.sid;
      }
      this.fileList = [];
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = [];
      this.ishandleChange = true;
      fileList.map((v) => {
        Object.assign(v, {
          status: "done",
        });
      });
      this.fileList = fileList;
    },
    /**
     * 附件上传
     */
    uploadChange(affiliationId, type) {
      if (this.FileRemoveSID) {
        // getattachDelete({ sid: this.FileRemoveSID }).then((res) => {});
      }
      const formData = new FormData();
      formData.append("file", this.fileList[0].originFileObj);
      formData.append("fileType", this.fileList[0].originFileObj.type);
      // getattachUpload({ affiliationId, formData }).then((res) => {
      //   if (res.success) {
      //     this.ishandleChange = false;
      //     if (type == 1) {
      //       this.spinning = false;
      //       this.$message.success("发布成功");
      //     } else {
      //       this.$message.success("保存成功");
      //     }
      //     this.Return_btn("保存");
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // });
    },
    //=============== 图片上传（end） =============
  },
};
</script>

<style lang="less">
.ArticleUpload {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    .ant-upload-list-item-info {
      border-radius: 50%;
    }
    i {
      font-size: 32px;
      color: #999;
    }
    .ant-upload-text {
      font-size: 20px;
    }
  }
  .ant-upload-list-picture-card-container {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    .ant-upload-list-item.ant-upload-list-item-done.ant-upload-list-item-list-type-picture-card {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      .ant-upload-list-item-info {
        border-radius: 50%;
      }
      i {
        font-size: 32px;
        margin: 0 10px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
#myfile {
  display: none;
}
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
