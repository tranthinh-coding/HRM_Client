<template>
  <div class="w-full mt4 mb5">
    <div class="my8 flex gap7">
      <vs-card type="2">
        <template #title>
          <h3>Tran Van Thinh</h3>
        </template>
        <template #img>
          <img src="/img/think.jpg" alt="" />
        </template>
        <template #text>
          <p>Leader.</p>
        </template>
        <template #interactions>
          <vs-button color="danger" icon @click="showMessage">
            <i class="bx bx-heart"></i>
          </vs-button>
          <el-link href="https://github.com/tranthinh-coding" target="_blank">
            <vs-button class="ml1" type="shadow">
              <i class="bx bxl-github text-base"></i>
            </vs-button>
          </el-link>
        </template>
      </vs-card>

      <vs-card type="5">
        <template #title>
          <h3>Do Van Duc</h3>
        </template>
        <template #img>
          <!-- <img src="/img/think.jpg" alt="" /> -->
          <!-- <div class="w100 h100"></div> -->
          <el-skeleton-item
            variant="image"
            style="width: 400px; height: 400px"
          />
        </template>
        <template #text>
          <p>Developer.</p>
        </template>
        <template #interactions>
          <vs-button color="danger" icon @click="showMessage">
            <i class="bx bx-heart"></i>
          </vs-button>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notification } from 'vuesax-old'

const showMessage = () => {
  notification({
    text: 'Love u',
    border: 'danger',
  })
}
</script>
