<template>
  <div class="job-container" @click.self="onClose">
    <div class="wrapper">
      <div class="divider"><div class="line"></div></div>

      <div class="wrapper-content">
        <vs-scrollbar>
          <h1 class="job-title">{{ job.title }}</h1>

          <div class="general-infor-box">
            <h3 class="title">Thông tin chung</h3>

            <el-row :gutter="30">
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Mức lương</div>
                    <div class="value">
                      {{ job.salary_from }} - {{ job.salary_to }} VND
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Kinh nghiệm</div>
                    <div class="value">{{ job.experience }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Số lượng</div>
                    <div class="value">{{ job.no_of_vacancies }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Vị trí</div>
                    <div class="value">{{ job.position }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Phòng ban</div>
                    <div class="value">{{ job.department }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="8">
                <div class="general-infor-item">
                  <el-icon size="20"></el-icon>
                  <div>
                    <div class="property">Hình thức làm việc</div>
                    <div class="value">{{ job.type }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="job-description" v-html="job.description" />

          <div class="job-apply">
            <vs-button
              color="dribbble"
              type="flat"
              @click="openApplyForm = true"
            >
              Ứng tuyển ngay
            </vs-button>
          </div>
        </vs-scrollbar>
      </div>
    </div>

    <vs-dialog v-model="openApplyForm">
      <el-upload
        v-model:file-list="cvFile"
        drag
        :limit="1"
        :auto-upload="false"
        accept=".pdf"
        :multiple="false"
        list-type="text"
        @exceed="handleExceed"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Kéo thả CV vào đây hoặc <em>ấn để tải lên</em>
        </div>
      </el-upload>

      <el-input
        v-model="message"
        autosize
        type="textarea"
        placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này. Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn có chưa có kinh nghiệm làm việc (hoặc CV không tốt)."
      />

      <vs-button
        color="danger"
        type="flat"
        block
        @click="applyJob"
        style="margin: 30px 0 0 0"
      >
        Nộp CV
      </vs-button>
    </vs-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import ApplicantServices from '~/services/applicant-services'
import { Job } from '~/types/job'

const props = defineProps<{
  job: Job
}>()

const cvFile = ref<UploadUserFile[]>([])
const message = ref<string>('')

const openApplyForm = ref(false)

const emit = defineEmits({
  close: () => true,
})

const onClose = () => emit('close')

const applyJob = async () => {
  try {
    console.log(props.job)
    const response = await ApplicantServices.apply({
      job_id: props.job.id,
      message: message.value,
      cv_upload: cvFile.value[0],
    })

    ElMessage({
      message: response.message || 'Ứng tuyển thành công',
      type: 'success',
      duration: 3000,
    })
  } catch (error) {
    console.log(error)
    ElMessage({
      message: `${(error as any).message}`,
      type: 'error',
      duration: 3000,
    })
  }
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 1, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}
</script>

<style lang="scss" scoped>
@import 'element-plus/theme-chalk/src/mixins/function.scss';

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%;
  background-color: getCssVar(overlay-color);
}

.job-container {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 20px;
  background-color: getCssVar(overlay-color, lighter);

  .wrapper {
    background-color: getCssVar(bg-color, page);
    height: 90%;
    min-height: 320px;
    margin-top: auto;
    width: 100%;
    border-radius: 30px 30px 0 0;
    animation: fade-up 0.25s ease forwards;

    .divider {
      height: 26px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .line {
        height: 6px;
        width: 80px;
        border-radius: 30px;
        background-color: getCssVar(border-color, light);
      }
    }
  }
}

.wrapper-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-bottom: 50px;
  position: relative;

  .heading {
    font-size: 22px;
  }

  .general-infor-box {
    margin-top: 20px;
    padding: 20px;
    border-radius: 16px;
    background: getCssVar(bg-color);

    .title {
      font-size: 18px;
    }
  }
}
.job-description {
  margin-top: 20px;
  padding: 20px;
  border-radius: 16px;
  background: getCssVar(bg-color);
}

.job-apply {
  position: absolute;
  right: 0;
  top: 0;
}
.job-title {
  font-size: 24px;
}

@keyframes fade-up {
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(0);
  }
}

// unreset css for render richtext
</style>

<style lang="scss">
.job-description {
  ul {
    list-style: inside !important;
  }
  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
}
</style>
