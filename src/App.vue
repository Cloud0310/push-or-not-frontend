<template>
  <div class="main-content">
    <el-config-provider :locale="language">
      <div class="content-container">
        <div class="header">
          <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-input v-model="postInput" placeholder="请输入内容" clearable />
          <div class="input-button-wrapper">
            <el-upload v-model="imageList" list-type="picture-card">
              <el-icon>
                <Upload />
              </el-icon>
            </el-upload>
            <el-button type="primary" @click="post" style="align-self: flex-end;">发布</el-button>
          </div>
        </div>
        <div class="main">
          <el-timeline center>
            <el-timeline-item v-for=" item in timeLineItems " :key="item.id as number" :timestamp="item.timestamp">
              <el-card style="flex-basis: 400px; --el-card-border-radius: 20px;" shadow="hover">

                <div class="user-info">
                  <el-avatar :size="50"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <div class="user-name">
                    <span>{{ item.user }}</span>
                  </div>
                </div>

                <div class="text-content">{{ item.textContent }}</div>
                <img src="post-image-example.jpg" alt="test_image"
                  style="max-height: 400px; object-fit: cover; width: 100%; border-radius: 20px;">
                <like-button />
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-config-provider>
  </div>
</template>

<style scoped>
.main-content {
  margin: 0 calc((100vw - 690px) / 2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  margin: 20px 0 20px 20px;
}

.text-content {
  margin-top: 10px;
  margin-bottom: 10px;
}

.input-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.user-name {
  height: 40px;
  padding-top: 7px;
  margin-left: 5px;
  display: flex;
  align-items: center;

  font-size: large;
  font-weight: bold;
}
</style>

<style>
.el-icon {
  margin: 5px;
}

.el-main {
  margin-top: 20px;
}

.el-input__wrapper {
  align-items: flex-start;
  height: 150px;
  margin: 10px 0;
  --el-input-border-radius: 20px;
}

.el-input__inner {
  margin-top: 10px;
  margin-left: 10px;
  font-size: large;
}
</style>

<script lang="ts" setup>
import { ref } from "vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import LikeButton from "./components/LikeButton.vue";
import type { UploadUserFile } from 'element-plus'
import { Upload } from "@element-plus/icons-vue"

const language = ref(zhCn)

const postInput = ref("");
function post() {
  return;
}

const imageList = ref<UploadUserFile[]>([]);

const timeLineItems = ref([
  {
    id: 1,
    imageSource: "",
    textContent: "哼哼哼啊啊啊啊啊啊啊",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 114514,
  },
  {
    id: 2,
    imageSource: "",
    textContent: "1919810",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 1919810,
  },
  {
    id: 3,
    imageSource: "",
    textContent: "114514",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 114514,
  },
  {
    id: 4,
    imageSource: "",
    textContent: "1919810",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 1919810,
  },
  {
    id: 5,
    imageSource: "",
    textContent: "1919810",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 1919810,
  },
  {
    imageSource: "",
    textContent: "1919810",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 1919810,
  },
  {
    imageSource: "",
    textContent: "1919810",
    timestamp: "2021-10-10",
    user: "田所浩二",
    likes: 1919810,
  },

])

const textarea = ref(null);
</script>