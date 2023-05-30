<template>
    <div class="main-content">
        <el-config-provider :locale="language">
            <el-dialog v-model="notLogged" title="请登录或注册" v-if="notLogged" width="30%">
                <el-text>账号</el-text>
                <el-input v-model="loginInfo.user_id" clearable placeholder="请输入用户名"></el-input>
                <el-text>密码</el-text>
                <el-input v-model="loginInfo.password" type="password" placeholder="请输入密码" clearable></el-input>
                <template #footer>
                    <div class="loginContainer">
                        <el-button @click="handleRegister">注册</el-button>
                        <el-button type="primary" @click="handleLogin">登录</el-button>
                    </div>
                </template>
            </el-dialog>
            <div class="content-container" v-else>
                <div class="header">
                    <div class="input-dialog">
                        <div class="avatar">
                            <el-avatar :size="50"
                                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                       style="margin-right: 10px;"/>
                        </div>
                        <el-input v-model="postInput" type="textarea" placeholder="分享文字" clearable/>
                    </div>
                    <div class="input-button-wrapper">
                        <div class="image-uploader">
                            <el-upload v-model:file-list="image" list-type="picture" :auto-upload="false">
                                <el-icon>
                                    <Picture/>
                                </el-icon>
                            </el-upload>
                        </div>
                        <el-button type="primary" @click="post" style="align-self: flex-end;">发布
                            <el-icon>
                                <Upload/>
                            </el-icon>
                        </el-button>
                    </div>
                </div>
                <div class="main">
                    <el-timeline center>
                        <el-timeline-item v-for="(item, index) in timeLineItems.reverse()" :key="item.post_id as number"
                                          :timestamp="item.post_date">
                            <el-card style="flex-basis: 400px; --el-card-border-radius: 20px;" shadow="hover">
                                <div class="user-info">
                                    <el-avatar :size="50"
                                               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                    <div class="user-name">
                                        <span>{{ item.post_by }}</span>
                                    </div>
                                </div>
                                <div class="text-content">{{ item.text }}</div>
                                <img :src="item.image_url" alt="test_image"
                                     style="max-height: 400px; object-fit: cover; width: 100%; border-radius: 20px;">
                                <div class="bottom-info">
                                    <div class="tags">
                                        <el-tag v-for="tag in item.tags" style="margin: 5px 5px;" type="success"> # {{ tag }}</el-tag>
                                    </div>
                                    <div class="likes">
                                        <el-button @click="handleLike(index)"
                                                   style="--el-border-radius-base: 10px; justify-content: space-between;" plain type="primary">
                                            {{ item.likes }}
                                            <el-icon>
                                                <Star v-if="!liked[index]"/>
                                                <StarFilled v-else/>
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

</style>

<script lang="ts" setup>
import {ref} from "vue";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {Picture, Star, Upload} from "@element-plus/icons-vue"
import {
  baseURL,
  createPost,
  ErrorResponse,
  handleErrorResponsePopup,
  login,
  LoginRequest,
  PostResponse,
  register
} from "./utils/api";
import {ElMessage} from "element-plus";


const language = ref(zhCn)

const postInput = ref("");

function post() {
  console.log(image.value)
  createPost(
    postInput.value,
    image.value[0].raw,
    (response: PostResponse) => {
      ElMessage.success("发布成功")
      response.image_url = baseURL + response.image_url
      addPost(response)
    }, (error: ErrorResponse) => {
      handleErrorResponsePopup(error)
    })
  return;
}

const liked = ref([])

const definedTags = ref<Array<string>>(['魅族', '小米', '火箭队', '林书豪', '恒大', '韩剧', '雾霾', '房价', '同桌的你', '公务员'])

const notLogged = ref<boolean>(true);

const loginInfo = ref<LoginRequest>({
  user_id: "",
  password: "",
});

const image = ref([]);

const timeLineItems = ref([])

addPost({
  post_id: 10,
  image_url: "/post-image-example.jpg",
  text: "哼哼哼啊啊啊啊啊啊啊",
  post_date: "Tue, 30 May 2023 11:45:14 GMT",
  post_by: "田所浩二",
  tags: "1000000000",
  captioning: "哼哼哼啊啊啊啊啊啊啊"
})
addPost({
  post_id: 24,
  image_url: "/post-image-example.jpg",
  text: "1919810",
  post_date: "Sun, 16 Apr 2006 06:58:39 GMT",
  post_by: "田所浩二",
  tags: "0000001000",
  captioning: "哼哼哼啊啊啊啊啊啊啊"
})
addPost({
  post_id: 3,
  image_url: "/post-image-example.jpg",
  text: "114514",
  post_date: "Thu, 04 Jan 1145 19:19:08 GMT",
  post_by: "田所浩二",
  tags: "0000100100",
  captioning: "哼哼哼啊啊啊啊啊啊啊"
})

function addPost(response: PostResponse) {
  let nowTags: Array<string> = [];
  for (let i = 0; i < response.tags.length; i++) {
    if (response.tags[i] != '0') {
      nowTags.push(definedTags.value[i])
    }
  }
  timeLineItems.value.push({
    post_id: response.post_id,
    image_url: response.image_url,
    text: response.text,
    post_date: response.post_date,
    post_by: response.post_by,
    tags: nowTags,
    captioning: response.captioning,
    likes: Math.ceil(Math.random() * 100)
  })
    liked.value.push(false)
}

function handleLike(index: number) {
  if (liked.value[index]) {
    timeLineItems.value[index].likes -= 1;
  } else {
    timeLineItems.value[index].likes += 1;
  }
  liked.value[index] = !liked.value[index];
};

function handleRegister() {
  register({
    user_id: loginInfo.value.user_id,
    password: loginInfo.value.password,
    tags: '0000000000'
  }, () => {
    notLogged.value = false;
  }, (err: ErrorResponse) => {
    handleErrorResponsePopup(err);
  })
}

function handleLogin() {
  login(loginInfo.value, () => {
    notLogged.value = false;
  }, (err: ErrorResponse) => {
    handleErrorResponsePopup(err);
  });
}

// const textarea = ref(null);
</script>