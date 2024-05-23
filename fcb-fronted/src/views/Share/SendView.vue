<script setup lang="ts">
import { ref } from 'vue'
import { useAdminData } from "@/stores/adminData";
import CardTools from "@/components/CardTools.vue";
import UploadFile from "@/components/UploadFile.vue";
import UploadText from "@/components/UploadText.vue";

import { useI18n } from 'vue-i18n'
import { request } from "@/utils/request";
import { ElMessage } from "element-plus";

const isLogin = ref(false);
const { t } = useI18n()
const adminData = useAdminData();
const shareData = ref({
  expireValue: 1,
  expireStyle: 'day',
  targetType: 'file',
})
const refreshLoginStatus = () => {
  adminData.updateAdminPwd(adminData.adminPassword);
  request({
    url: '/admin/login',
    method: 'post',
  }).then((res: any) => {
    if (res.code === 200) {
      isLogin.value = true;
      ElMessage.success(t('admin.login.loginSuccess'));
    } else {
      ElMessage.error(t('admin.login.loginError'));
    }
  });
};
if (adminData.adminPassword !== '') {
  refreshLoginStatus();
}
</script>

<template>
  <main>
    <el-card v-if="isLogin" class="card" style="position: relative" :body-style="{ padding: '0' }">
      <card-tools style="padding: 1rem"/>
      <div style="display: flex;margin: 1rem">
        <div>
          <el-input
              v-model="shareData.expireValue"
              style="width: 200px"
              :placeholder="t('send.pleaseInputExpireValue')"
          >
            <template #prepend>
              <el-select v-model="shareData.expireStyle" :placeholder="t('send.expireStyle')" style="width: 75px">
                <el-option :label="t('send.expireData.day')" value="day" />
                <el-option :label="t('send.expireData.hour')" value="hour" />
                <el-option :label="t('send.expireData.minute')" value="minute" />
                <el-option :label="t('send.expireData.forever')" value="forever" />
                <el-option :label="t('send.expireData.count')" value="count" />
              </el-select>
            </template>
            <template #append>
              <span v-if="shareData.expireStyle=='day'">{{t('send.expireValue.day')}}</span>
              <span v-else-if="shareData.expireStyle=='hour'">{{t('send.expireValue.hour')}}</span>
              <span v-else-if="shareData.expireStyle=='minute'">{{t('send.expireValue.minute')}}</span>
              <span v-else-if="shareData.expireStyle=='forever'">👌</span>
              <span v-else-if="shareData.expireStyle=='count'">{{t('send.expireValue.count')}}</span>
            </template>
          </el-input>
        </div>
        <el-radio-group v-model="shareData.targetType" style="margin-left: 1rem;">
          <el-radio label="file">
            {{t('send.fileType.file')}}
          </el-radio>
          <el-radio label="text">
            {{t('send.fileType.text')}}
          </el-radio>
        </el-radio-group>
      </div>
      <div style="margin: 1rem">
        <upload-file :shareData="shareData" v-if="shareData.targetType=='file'"/>
        <upload-text :shareData="shareData" v-else-if="shareData.targetType=='text'"/>
      </div>
    </el-card>

    <el-form size="large" v-else>
      <el-form-item :label="t('admin.login.managePassword')">
        <el-input
            v-model="adminData.adminPassword"
            :placeholder="t('admin.login.passwordNotEmpty')"
            type="password"
        >
          <template #append>
            <el-button @click="refreshLoginStatus">{{ t('admin.login.login') }}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </main>
</template>