/*
 * A forum software for use in a school in China.
 * Copyright (C) 2023-2024 Fustigate & YZ9551(YXZ)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { createRouter, createWebHistory } from 'vue-router';
import Post from "./components/Post.vue"
import Home from "./components/Home.vue"
import AddPost from "./components/AddPost.vue"
import Login from "./components/Login.vue"
import SignUp from "./components/SignUp.vue"

const routes = [
    {
        path: '/post/:postId',
        name: "Post-Page",
        component: Post,
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/addpost",
        name: "Add-Post",
        component: AddPost
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/signup",
        name: "Sign Up",
        component: SignUp
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
