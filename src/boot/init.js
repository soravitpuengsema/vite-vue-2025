export async function initFunction() {
  /*
	const commitDate = import.meta.env.VITE_COMMIT_DATE || "Unknown"
  console.log(`[Init] App Commit Date: ${commitDate}`)
  console.log("[Init] State")
  const oldCommitDate = localStorage.getItem("commit_date")
  if (oldCommitDate != commitDate) {
    store.dispatch("setLogout")
    router.push("/login")
    location.reload()
  }
  localStorage.setItem("commit_date", commitDate)
  const accessToken = localStorage.getItem("access_token")
  const refreshToken = localStorage.getItem("refresh_token")
  const tokenExpire = localStorage.getItem("token_expire")
  const userCode = localStorage.getItem("user_code")

  if (accessToken && refreshToken && tokenExpire && userCode) {
    store.dispatch("setTokenKey", {
      accessToken,
      refreshToken,
      expires: moment(tokenExpire).diff(moment(), "seconds"),
    })
    store.dispatch("setIsAutherized", true)
    console.log("[Start] Getting user info...")
    store.dispatch("setUserCode", userCode)

    try {
      const userInfo = await $http.get("/api/auth/getUser")
      // console.log("[Init] userInfo::", userInfo.data)
      store.dispatch("setUserInfo", userInfo.data || {})

      const permission = await $http.get("/api/auth/getPermissions")
      // console.log("[Init] permission::", permission.data)
      store.dispatch("setPermission", permission.data || [])
    } catch (error) {
      console.error("Error fetching user info or permissions:", error)
      store.dispatch("setLogout")
      router.push("/login")
      location.reload()
      // go to login
    }
  }
	*/
}
