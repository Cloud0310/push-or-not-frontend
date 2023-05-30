<template>
  <div class="main-content">
    <el-config-provider :locale="language">
      <el-dialog v-model="isLoggedIn" title="请登录或注册" v-if="isLoggedIn" width="30%">
        <el-text>账号</el-text>
        <el-input v-model="loginInfo.user_id" clearable placeholder="请输入用户名" size="small"></el-input>
        <el-text>密码</el-text>
        <el-input v-model="loginInfo.password" type="password" placeholder="请输入密码" clearable size="small"></el-input>
        <template #footer>
          <div class="loginContainer">
            <el-button @click="">注册</el-button>
            <el-button type="primary">登录</el-button>
          </div>
        </template>
      </el-dialog>
      <div class="content-container" v-else>
        <div class="header">
          <div class="input-dialog">
            <div class="avatar">
              <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="margin-right: 10px;" />
            </div>
            <el-input v-model="postInput" placeholder="分享文字" clearable />
          </div>
          <div class="input-button-wrapper">
            <div class="image-uploader">
              <el-upload v-model="image" list-type="picture">
                <el-icon>
                  <Picture />
                </el-icon>
              </el-upload>
            </div>
            <el-button type="primary" @click="post" style="align-self: flex-end;">发布<el-icon>
                <Upload />
              </el-icon></el-button>
          </div>
        </div>
        <div class="main">
          <el-timeline center>
            <el-timeline-item v-for="item in timeLineItems" :key="item.id as number" :timestamp="item.timestamp">
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
                <div class="bottom-info">
                  <div class="tags">
                    <el-tag v-for="tag in tags" style="margin: 0 5px;"> # {{ tag }}</el-tag>
                  </div>
                  <div class="likes">
                    <el-button @click="handleLike" style="--el-border-radius-base: 10px; justify-content: space-between;">
                      {{ likes }} <el-icon>
                        <Star v-if="!liked" />
                        <StarFilled v-else="liked" />
                      </el-icon>
                    </el-button>
                  </div>
                </div>
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

.loginContainer {
  display: flex;
  justify-content: space-between;
}

.image-uploader {
  margin-left: 80px;
}

.header {
  margin: 20px 0 20px 20px;
}

.input-dialog {
  display: flex;
  align-items: flex-start;
}

.text-content {
  margin-top: 10px;
  margin-bottom: 10px;
}

.input-button-wrapper {
  margin: 0 10px;
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

.avatar {
  margin: 10px;
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

.bottom-info {
  margin-top: 10px;

  display: flex;
  justify-content: space-between;
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
  margin: 10px 0;
  --el-input-border-radius: 10px;
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
import { Picture, Star, Upload } from "@element-plus/icons-vue"
import { LoginRequest, ErrorResponse, RegisterRequest, PostResponse, login, register, getPosts, createPost, getUser } from "./utils/api";


const language = ref(zhCn)

const postInput = ref("");
function post() {
  return;
}

const likes = ref<number>(0)
const liked = ref<boolean>(false)

const tags = ref<Array<string>>(["test", "test2", "test3"])

const isLoggedIn = ref<boolean>(false);

const loginInfo = ref<LoginRequest>({
  user_id: "",
  password: "",
});

const PostResponse = ref<PostResponse>({
  post_id: 0,
  post_by: "",
  post_date: "",
  text: "",
  image_url: "",
  tags: ["", ""],
  captioning: "",
});

const image = ref([]);

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

function handleLike() {
  if (liked.value) {
    likes.value -= 1;
  } else {
    likes.value += 1;
  }
  liked.value = !liked.value;
};

function handleLogin() {
  login(loginInfo.value, () => {
    ;
  }, console.error()l);
}

// const textarea = ref(null);
</script>