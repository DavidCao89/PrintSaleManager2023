<script setup lang="ts">
import { initialAbility } from '@/plugins/casl/ability';
import { useAppAbility } from '@/plugins/casl/useAppAbility';
import PartialUserProfileMenu from '@/views/apps/nHelper/partial/partialUserProfileMenu.vue';

const router = useRouter()
const ability = useAppAbility()
const userData = JSON.parse(localStorage.getItem('userData') || 'null')

const logout = () => {
  // Remove "userData" from localStorage
  localStorage.removeItem('userData')

  // Remove "accessToken" from localStorage
  localStorage.removeItem('accessToken')

  // Redirect to login page
  router.push('/login')
    .then(() => {
      // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page
      // Remove "userAbilities" from localStorage
      localStorage.removeItem('userAbilities')

      // Reset ability to initial ability
      ability.update(initialAbility)
    })
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <span class="nHeader cursor-pointer">
      <span class="hello">Xin chào:</span>
      <br>
      <span class="fullName">Quản trị hệ thống</span>
      <PartialUserProfileMenu :user-data="userData" />
    </span>
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />
      <PartialUserProfileMenu :user-data="userData" />
    </VAvatar>
  </VBadge>
</template>
