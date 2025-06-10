import { createRouter, createWebHistory } from "vue-router"
import { $http } from "@/boot/http"
import store from "@/store"
import moment from "moment"
import _ from "lodash"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/Page404.vue"),
    },
    {
      path: "/403",
      component: () => import("@/views/Page403.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/Layout.vue"),
      children: [
        {
          name: "home",
          path: "/home",
          component: () => import("@/views/Home.vue"),
        },
        {
          name: "profile",
          path: "/profile",
          component: () => import("@/views/Profile.vue"),
        },
      ],
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    {
      name: "logout",
      path: "/logout",
      component: {
        async beforeRouteEnter(to, from, next) {
          // await $http.post(`api/auth/logout`)
          // store.dispatch("setLogout")
          next("/login")
        },
      },
    },
    {
      name: "blank-template",
      path: "/blank-template",
      component: () => import("@/views/BlankTemplate.vue"),
    },
  ],
})

router.beforeResolve(async (to, from, next) => {
  // Handle menu transition
  if (store.state.fromMenu) {
    to.meta.transition = ""
    store.dispatch("setFromMenu", false)
  }

  const { isAutherized, tokenExpire } = store.state
  const currentDate = moment()

  // Handle login redirects
  if ((to.path === "/login" || to.path === "/") && isAutherized) {
    console.log("redirect to home")
    return next("/home")
  }

  // Skip auth check for login and logout routes
  if (["/login", "/logout"].indexOf(to.path) !== -1) {
    console.log("skip auth check")
    return next()
  }

  // Check authentication
  if (!isAutherized || tokenExpire == null) {
    console.log("not autherized")
    return next("/login")
  }

  // Handle token refresh
  if (currentDate.isAfter(tokenExpire)) {
    console.log("token expired")
    try {
      const tokenRes = await $http.post("/api/auth/token", {
        refreshToken: store.state.refreshToken,
      })

      if (tokenRes?.status === 200) {
        await store.dispatch("setTokenKey", tokenRes.data)
      } else {
        await store.dispatch("setIsAutherized", false)
        console.log("token expired")
        return next("/login")
      }
    } catch (error) {
      await store.dispatch("setIsAutherized", false)
      console.log("token expired catch")
      return next("/login")
    }
  }

  // Check permissions
  const { permissions } = to.meta
  if (!permissions) {
    console.log("no permissions")
    return next()
  }

  const userPermissions = String(permissions).split(",")
  const hasPermission =
    _.intersection(store.state.permissions, userPermissions).length > 0

  if (hasPermission) {
    console.log("has permission")
    return next()
  }

  console.log("no permission 403")
  return next({ path: "/403", replace: true })
})

export default router
