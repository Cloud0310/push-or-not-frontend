import axios from "axios";
import {ElMessage} from "element-plus";

// INITIALIZE -----------------------------------------------------------------
export const baseURL = 'http://localhost:5000/';

axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: baseURL + 'api/',
  timeout: 30000
} as any);

service.interceptors.response.use(
  (res) => {
    if (res.status === 204)
      return res;
    if (res.data && (res.status === 200 || res.status === 201))
      return res;
    return Promise.reject(res);
  },
  (error) => {
    if (!error.response.data)
      error.response.data = {
        response_code: 400,
        additional_message: '网络错误'
      };
    return Promise.reject(error)
  }
);

// REQUEST STRUCTURE ----------------------------------------------------------
export interface LoginRequest {
  user_id: string;
  password: string;
}

export interface RegisterRequest {
  user_id: string;
  password: string;
  tags: string;
}

// RESPONSE STRUCTURE ---------------------------------------------------------
export interface ErrorResponse {
  response_code: number;
  additional_message: string;
}

export interface UserResponse {
  user_id: string;
  tags: string;
}

export interface PostResponse {
  post_id: number;
  post_by: string;
  post_date: string;
  text: string;
  image_url: string;
  tags: string;
  captioning: string;
}

// ERROR HANDLING -------------------------------------------------------------
export function handleErrorResponsePopup(err: ErrorResponse) {
  let message = '';
  switch (err.response_code) {
    case 200:
      message = '账号或密码错误';
      break;
    case 201:
      message = '账号已存在';
      break;
    case 202:
      message = '无效的用户名称';
      break;
    case 203:
      message = '未登录';
      break;
    case 300:
      message = '该帖不存在';
      break;
    case 400:
      message = '网络错误';
      break;
  }
  ElMessage(message)
}

// API CALLS ------------------------------------------------------------------
export function login(request: LoginRequest, success: () => void, fail: (err: ErrorResponse) => void) {
  service
    .post('login', request)
    .then(() => success())
    .catch((err) => {
      fail(err.response.data)
    });
}

export function register(request: RegisterRequest, success: () => void, fail: (err: ErrorResponse) => void) {
  service
    .post('register', request)
    .then(() => success())
    .catch((err) => fail(err.response.data));
}

export function getUser(name: string, success: (res: UserResponse) => void, fail: (err: ErrorResponse) => void) {
  service
    .get('users/' + name)
    .then((res) => success(res.data))
    .catch((err) => fail(err.response.data));
}

export function getUsers(success: (res: string[]) => void, fail: (err: ErrorResponse) => void) {
  service
    .get('users')
    .then((res) => success(res.data))
    .catch((err) => fail(err.response.data));
}

export function getPosts(success: (res: number[]) => void, fail: (err: ErrorResponse) => void) {
  service
    .get('posts')
    .then((res) => success(res.data))
    .catch((err) => fail(err.response.data));
}

export function getPost(id: number, success: (res: PostResponse) => void, fail: (err: ErrorResponse) => void) {
  service
    .get('posts/' + id)
    .then((res) => success(res.data))
    .catch((err) => fail(err.response.data));
}

export function deletePost(id: number, success: () => void, fail: (err: ErrorResponse) => void) {
  service
    .delete('posts/' + id)
    .then(() => success())
    .catch((err) => fail(err.response.data));
}

export function createPost(text: string, image: any, success: (res: PostResponse) => void, fail: (err: ErrorResponse) => void) {
  service
    .postForm('posts/new', {
      text: text,
      image: image
    })
    .then((res) => success(res.data))
    .catch((err) => fail(err.response.data));
}