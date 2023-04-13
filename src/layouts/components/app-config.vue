<template>
  <div class="config">
    <div class="btn-group-right">
      <el-tooltip effect="light" :enterable="false">
        <el-button link>
          <el-switch
            v-model="isDark"
            class="ml-2"
            inline-prompt
            style="--el-switch-on-color: #242526"
            :active-icon="Moon"
            :inactive-icon="Sunny"
          />
        </el-button>
        <template #content>
          <span style="user-select: none">Theme</span>
        </template>
      </el-tooltip>
      <el-tooltip effect="light" :enterable="false">
        <a :href="REPO_LINK" target="_blank" style="display: flex">
          <el-icon size="26">
            <icon-code />
          </el-icon>
        </a>

        <template #content>
          <span style="user-select: none">Repository</span>
        </template>
      </el-tooltip>
      <el-tooltip effect="light">
        <el-icon size="26"> <icon-language /> </el-icon>
        <template #content>
          <div
            v-for="(language, index) in SUPPORT_LANGUAGES"
            :key="index"
            class="tooltip-option"
            @click="loadLanguageAsync(language.id)"
          >
            {{ language.label }}
          </div>
        </template>
      </el-tooltip>

      <el-tooltip effect="light">
        <div class="user-info">
          <img class="user-avatar" src="/avatar.png" />
          <span class="user-name">{{ user.name }}</span>
        </div>

        <template #content>
          <!-- <div
            class="tooltip-option"
            @click="$router.push({ name: 'profile' })"
          >
            {{ t('user.see-info') }}
          </div> -->
          <div class="tooltip-option" @click="$router.push({ name: 'logout' })">
            {{ t('auth.logout') }}
          </div>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { isDark } from '~/composables'
import { REPO_LINK } from '~/config'
import { loadLanguageAsync, SUPPORT_LANGUAGES } from '~/plugins/i18n'
import { useUserStore } from '~/store'
import IconCode from '~/components/icons/code.vue'
import IconLanguage from '~/components/icons/language.vue'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())

const { t } = useI18n()
</script>

<style scoped lang="scss">
.config {
  padding: 10px;
  /* background-color: #ccc; */
}

.btn-group-right {
  height: 100%;
  display: flex;
  gap: 15px;
  margin-left: auto;
  width: max-content;
  align-items: center;
  padding-right: 20px;
}

.tooltip-option {
  padding: 6px 16px;
  user-select: none;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.25s ease;
}

.tooltip-option + .tooltip-option {
  margin-top: 4px;
}

.tooltip-option:hover {
  background-color: getColor(bg-color, page);
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
  gap: 10px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    border: none;
  }
}
</style>
