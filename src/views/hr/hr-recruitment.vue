<template>
  <div class="jobs-dashboard">
    <div class="jobs-wrapper">
      <div class="job-heading">
        <vs-button type="shadow" @click="openCreateJobForm = true">
          {{ t('job.create') }}
        </vs-button>
      </div>
      <div class="job-cards">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="6">
            <el-statistic title="Jobs" :value="jobs.length">
              <template #suffix>
                <el-icon style="vertical-align: -0.125em">
                  <briefcase />
                </el-icon>
              </template>
            </el-statistic>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-statistic title="Job seeker" :value="seekers.length">
              <template #suffix>
                <el-icon style="vertical-align: -0.125em">
                  <people />
                </el-icon>
              </template>
            </el-statistic>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-statistic title="Total Employees" :value="employees.length">
              <template #suffix>
                <el-icon style="vertical-align: -0.125em">
                  <user-profile />
                </el-icon>
              </template>
            </el-statistic>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-statistic title="Applicants" :value="applicants?.length || 0">
              <template #suffix>
                <el-icon style="vertical-align: -0.125em">
                  <note />
                </el-icon>
              </template>
            </el-statistic>
          </el-col>
        </el-row>
      </div>

      <div class="applicants">
        <div class="applicant-heading">
          <h3>Applicants List</h3>
          <vs-input v-model="applicantSearch" :placeholder="t('page.search')">
            <template #icon>
              <el-icon><search-normal /></el-icon>
            </template>
          </vs-input>
        </div>

        <el-table
          lazy
          table-layout="fixed"
          :data="applicants"
          style="width: 100%"
        >
          <el-table-column fixed min-width="200" prop="user.name" label="Tên" />
          <el-table-column min-width="200" prop="user.email" label="Email" />

          <el-table-column min-width="230" label="Lời nhắn" prop="message" />

          <el-table-column
            min-width="250"
            label="Tên công việc"
            prop="job.title"
          />

          <el-table-column
            min-width="150"
            label="Cấp bậc"
            prop="job.position"
          />

          <el-table-column
            width="150"
            label="Trạng thái"
            prop="job.status"
            align="center"
          >
            <template #default="{ row }">
              <vs-select
                v-model="row.status"
                @change="updateApplicantStatus(row)"
              >
                <vs-option
                  v-for="(status, index) in applicantStatus"
                  :key="index"
                  :value="status"
                />
              </vs-select>
            </template>
          </el-table-column>

          <el-table-column
            min-width="170"
            label="CV"
            header-align="center"
            align="center"
          >
            <template #default="{ row }">
              <vs-button
                @click="downloadCv(row)"
                color="danger"
                type="flat"
                style="margin: auto"
              >
                <el-icon size="20" style="margin-right: 8px">
                  <document-download />
                </el-icon>
                Cv download
              </vs-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="12">
          <div class="jobs-list">
            <div class="jobs-heading">
              <h3>Latest Jobs</h3>
            </div>
            <div
              class="job-item"
              v-for="(job, index) in jobSortCreatedTime"
              :key="index"
            >
              <h3 class="job-title">
                {{ job.title }} <el-tag>{{ job.position }}</el-tag>
              </h3>
              <h3 class="job-time">
                {{ formatTime(new Date(job.created_at).getTime()) }}
              </h3>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <div class="jobs-list">
            <div class="jobs-heading">
              <h3>Offered</h3>
            </div>
            <div
              class="job-item"
              v-for="(applicant, index) in applicantsOffered"
              :key="index"
            >
              <h3 class="job-title">
                {{ applicant.user.name }} - {{ applicant.user.user_id }}
                <el-tag>{{ applicant.job.position }}</el-tag>
              </h3>
              <h3 class="job-time">
                {{ formatTime(new Date(applicant.created_at).getTime()) }}
              </h3>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12"> </el-col>
      </el-row>

      <keep-alive>
        <vs-dialog v-model="openCreateJobForm">
          <template #header>
            <h4>{{ t('job.create') }}</h4>
          </template>
          <div class="form-group">
            <div class="form-original">
              <vs-input
                v-model="job.title"
                class="job-control"
                label-float
                :label="t('job.title')"
              />
            </div>
            <div class="form-original">
              <vs-input
                v-model="job.age"
                class="job-control"
                label-float
                :label="t('job.age')"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="form-original">
              <vs-input
                v-model="job.experience"
                class="form-control"
                label-float
                :label="t('job.experience')"
              />
            </div>
            <div class="form-original">
              <vs-input
                v-model="job.no_of_vacancies"
                class="form-control"
                label-float
                :label="t('job.quantity')"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="form-original">
              <vs-input
                v-model="job.salary_from"
                class="form-control"
                label-float
                :label="t('job.salary-from')"
              />
            </div>
            <div class="form-original">
              <vs-input
                v-model="job.salary_to"
                class="form-control"
                label-float
                :label="t('job.salary-to')"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="form-original">
              <vs-select
                class="form-control"
                allow-create
                :label="t('job.department')"
                v-model="job.department"
              >
                <vs-option
                  v-for="(department, index) in departments"
                  :key="index"
                  :value="department.name"
                />
              </vs-select>
            </div>
            <div class="form-original">
              <vs-select
                class="form-control"
                allow-create
                :label="t('job.type')"
                v-model="job.type"
              >
                <vs-option
                  v-for="(type, index) in jobTypes"
                  :key="index"
                  :value="type.name"
                />
              </vs-select>
            </div>
            <div class="form-original">
              <vs-select
                class="form-control"
                allow-create
                :label="t('job.position')"
                v-model="job.position"
              >
                <vs-option
                  v-for="(position, index) in jobPositions"
                  :key="index"
                  :value="position.name"
                />
              </vs-select>
            </div>
          </div>
          <div class="form-group is-ep">
            <div class="form-original">
              <el-date-picker
                v-model="job.start_date"
                :popper-options="{
                  strategy: 'absolute',
                }"
                type="date"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                :disabled-date="disabledDate"
                placeholder="Ngày bắt đầu"
              />
            </div>
            <div class="form-original">
              <el-date-picker
                v-model="job.expired_date"
                type="date"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                :disabled-date="disabledDate"
                placeholder="Ngày kết thúc"
              />
            </div>
          </div>

          <div class="form-group is-ep">
            <div class="form-original">
              <h2 class="form-label">{{ t('job.description') }}</h2>
              <tiny-editor
                class="form-control"
                api-key="no-api-key"
                v-model="job.description"
                :init="{
                  plugins:
                    'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount checklist casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                  toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  height: 250,
                  skin: isDark ? 'oxide-dark' : 'oxide',
                  content_css: isDark ? 'dark' : 'default',
                }"
              />
            </div>
          </div>

          <div class="job-button">
            <vs-button @click="createJob" block style="margin: 20px 0 0 0">
              {{ t('job.create') }}
            </vs-button>
          </div>
        </vs-dialog>
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TinyEditor from '@tinymce/tinymce-vue'
import { saveAs } from 'file-saver'

import JobsService from '~/services/jobs-service'
import { isDark } from '~/composables'
import { formatTime } from '~/utils'
import {
  useDepartmentStore,
  useJobsStore,
  useApplicantsStore,
  useUsersStore,
  useEmployeesStore,
} from '~/store'
import ApplicantServices from '~/services/applicant-services'

import type { JobCreate, JobTypes, JobPosition } from '~/types/job'
import type { Applicant } from '~/types'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const departmentsStore = useDepartmentStore()
const { departments } = storeToRefs(departmentsStore)

const jobsStore = useJobsStore()
const { jobs } = storeToRefs(jobsStore)

const applicantsStore = useApplicantsStore()
const { applicants } = storeToRefs(applicantsStore)

const employeesStore = useEmployeesStore()
const { employees } = storeToRefs(employeesStore)

const usersStore = useUsersStore()
const { seekers } = storeToRefs(usersStore)

const jobTypes = ref<JobTypes[]>([])
const jobPositions = ref<JobPosition[]>([])
const applicantStatus = ref<string[]>([])
const applicantsOffered = ref<Applicant[]>([])

const openCreateJobForm = ref(false)
const applicantSearch = ref<string>('')

const job = ref<JobCreate>({
  title: '',
  department: '',
  salary_from: 1,
  salary_to: 1,
  age: 18,
  description: '',
  experience: '',
  expired_date: '',
  no_of_vacancies: 1,
  position: '',
  start_date: '',
  type: '',
})

const jobSortCreatedTime = computed(() => {
  const _jobs = [...jobs.value]
  _jobs.sort((a, b) => b.id - a.id)
  return _jobs
})

const disabledDate = (time: Date) => {
  return time.getTime() < new Date().getTime() - 1000 * 60 * 60 * 24
}

const getApplicantStatus = async () => {
  try {
    applicantStatus.value = await ApplicantServices.status()
  } catch (error) {
    ElMessage({
      message: `${(error as any).message}`,
      duration: 3000,
      type: 'error',
    })
    applicantStatus.value = []
  }
}
const getJobTypes = async () => {
  try {
    jobTypes.value = await JobsService.types()
  } catch (error) {
    ElMessage({
      message: `${(error as any).message}`,
      duration: 3000,
      type: 'error',
    })
    jobTypes.value = []
  }
}
const getJobPositions = async () => {
  try {
    jobPositions.value = await JobsService.positions()
  } catch (error) {
    ElMessage({
      message: `${(error as any).message}`,
      duration: 3000,
      type: 'error',
    })
    jobPositions.value = []
  }
}
const getApplicantsOffered = async () => {
  try {
    applicantsOffered.value = await ApplicantServices.applicantOffered()
  } catch (error) {
    applicantsOffered.value = []
  }
}
const createJob = async () => {
  try {
    const response = await JobsService.create(job.value)

    ElMessage({
      message: response.message,
      type: 'success',
      duration: 3000,
    })
    jobsStore.refetch()
  } catch (error) {
    ElMessage({
      message: `${(error as any).message}`,
      type: 'error',
      duration: 8000,
    })
  }
}

// const archiveJob = async ({ id, status }: { id: number; status: string }) => {
//   try {
//     const response = await JobsService.archiveJob({ id, status })

//     ElMessage({
//       message: response.message || 'Lưu trữ công việc tuyển dụng thành công',
//       duration: 3 * 1000,
//       type: 'success',
//     })
//   } catch (error) {
//     ElMessage({
//       message: `${(error as any).message}`,
//       type: 'error',
//       duration: 3 * 1000,
//     })
//     console.log(error)
//   }
// }

const downloadCv = async (applicant: Applicant) => {
  try {
    const response = (await ApplicantServices.downloadCv(applicant.id)) as any
    const blob = new Blob([response], { type: 'application/pdf' })
    saveAs(blob, applicant.user.name)

    ElMessage({
      message: 'Download CV thành công',
      duration: 3000,
      type: 'success',
    })
  } catch (error) {
    ElMessage({
      message: 'Download CV không thành công',
      type: 'error',
      duration: 3000,
    })
  }
}

const updateApplicantStatus = async (applicant: Applicant) => {
  try {
    const response = await ApplicantServices.update(applicant)
    ElMessage({
      message: response.message || 'Cập nhật trạng thái thành công',
      type: 'success',
      duration: 3000,
    })
    applicantsStore.refetch()
    getApplicantsOffered()
  } catch {
    ElMessage({
      message: 'Cập nhật trạng thái thất bại',
      type: 'error',
      duration: 3000,
    })
  }
}

getJobTypes()
getJobPositions()
getApplicantStatus()
getApplicantsOffered()
</script>

<style scoped lang="scss">
.el-col {
  text-align: center;
}

.el-statistic {
  padding: 20px;
  background-color: getColor(theme-layout);
  border-radius: 18px;
}

.jobs-wrapper {
  .job-heading {
    display: flex;
    // justify-content: end;
  }
  .job-cards {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 16px;
  }
  .jobs-list {
    flex: 1;
    padding: 20px;
    border-radius: 20px;
    background: getColor(theme-layout);
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .jobs-heading {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .vs-input {
        width: unset;
      }
    }
    .job-item {
      width: 100%;
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
      background: getColor(theme-layout);
      border: 1px solid transparent;
      border-bottom-color: getColor(color, 0.2);
      display: flex;
      justify-content: space-between;

      &:last-of-type {
        border-bottom-color: transparent;
      }
    }
  }

  .job-form {
    background: getColor(theme-layout);
    padding: 24px;
    border-radius: 14px;
    min-width: 320px;
    flex: 1;
  }
}
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  &.is-ep {
    margin-top: 20px;
  }

  .form-original {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 10px;

    .form-label {
      font-size: 14px;
      margin-left: 12px;
    }
  }
}

.applicants {
  background: getColor(theme-layout);
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px;

  .applicant-heading {
    font-size: 20px;
    padding-left: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;

    .vs-input {
      width: unset;
    }

    h3 {
      flex: 1;
      flex-shrink: 0;
    }
  }
}

.el-date-editor {
  --el-date-editor-width: auto;
}
</style>

<style lang="scss">
.table-operations .cell {
  display: flex;
}
.tox-tinymce-aux {
  z-index: 3000 !important;
}
.tox-statusbar__text-container {
  display: none !important;
}
.tox-notifications-container {
  display: none !important;
}

.vs-select {
  max-width: unset !important;
}
.form-original .el-date-editor .el-input__wrapper {
  width: 100%;
}
</style>
