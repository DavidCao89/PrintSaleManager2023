<script setup lang="ts">
import { loginService } from '@/plugins/nservices/loginService'
import { NCoreConfig } from '@/plugins/nservices/NCoreConfig'
import { useSystemNStore } from '@/plugins/nStore/system/systemNStore'
import { requiredValidator } from '@validators'
import { VBtn, VCard, VCardText, VCheckbox, VCol, VDivider, VForm, VImg, VProgressCircular, VRow, VTextField } from 'vuetify/components'

const isPasswordVisible = ref(false)

const route = useRoute()
const router = useRouter()

// const ability = useAppAbility()

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})

const refVForm = ref<VForm>()
const email = ref('admin@demo.com')
const password = ref('admin')
const rememberMe = ref(false)
const isLoading = ref(false)
const useSystemStore = useSystemNStore()

const login = async () => {
  isLoading.value = true

  const resultApi = await loginService(email.value, password.value)
  if (resultApi) {
    localStorage.setItem(NCoreConfig.userData, JSON.stringify(resultApi.userFile))
    localStorage.setItem(NCoreConfig.accessToken, JSON.stringify(resultApi.accesstoken))
    localStorage.setItem(NCoreConfig.refreshToken, JSON.stringify(resultApi.refreshToken))
    localStorage.setItem(NCoreConfig.menuRoleItem, JSON.stringify(resultApi.menuRoles))

    useSystemStore.addMenuItems(resultApi.menuRoles)
    router.replace(route.query.to ? String(route.query.to) : '/')
  }
  else { isLoading.value = false }

  // axios.post<LoginResponse>('/auth/login', { email: email.value, password: password.value })
  //   .then(r => {
  //     const { accessToken, userData, userAbilities } = r.data

  //     localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
  //     ability.update(userAbilities)

  //     localStorage.setItem('userData', JSON.stringify(userData))
  //     localStorage.setItem('accessToken', JSON.stringify(accessToken))

  //     // Redirect to `to` query if exist or redirect to index route
  //     router.replace(route.query.to ? String(route.query.to) : '/')
  //   })
  //   .catch(e => {
  //     const { errors: formErrors } = e.response.data

  //     errors.value = formErrors
  //     console.error(e.response.data)
  //   })
}

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid)
        login()
    })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <!--        <div class="d-flex align-center justify-center w-100 h-100"> -->
        <!--          <VImg -->
        <!--            max-width="505" -->
        <!--            :src="authThemeImg" -->
        <!--            class="auth-illustration mt-16 mb-2" -->
        <!--          /> -->
        <!--        </div> -->

        <VImg
          src="../../public/images/tet_2023/banner_tet.png"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center nLogin"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <!--
            <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
            />
          -->

          <h5 class="text-h5 font-weight-semibold mb-1 title">
            ĐĂNG NHẬP HỆ THỐNG
          </h5>
        </VCardText>
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Tên đăng nhập"
                  type="text"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Mật khẩu"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Nhớ mật khẩu"
                  />
                  <!--                  <RouterLink -->
                  <!--                    class="text-primary ms-2 mb-1" -->
                  <!--                    :to="{ name: 'forgot-password' }" -->
                  <!--                  > -->
                  <!--                    Forgot Password? -->
                  <!--                  </RouterLink> -->
                </div>

                <VBtn
                  v-if="!isLoading"
                  block
                  type="submit"
                >
                  Đăng nhập
                </VBtn>
                <VBtn
                  v-else-if="isLoading"
                  :disabled="true"
                  block
                >
                  <VProgressCircular
                    :width="3"
                    color="primary"
                    indeterminate
                  />
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4">itphonui</span>
                <VDivider />
              </VCol>
              <!--
                <VCol
                cols="12"
                class="text-center"
                >
                <span>New on our platform?</span>
                <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
                >
                Create an account
                </RouterLink>
                </VCol>
                <VCol
                cols="12"
                class="d-flex align-center"
                >
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
                </VCol>
              -->

              <!-- auth providers -->
              <!--
                <VCol
                cols="12"
                class="text-center"
                >
                <AuthProvider />
                </VCol>
              -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
