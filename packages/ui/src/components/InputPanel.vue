<!-- 输入面板组件 - 纯Naive UI实现 -->
<template>
  <NSpace vertical :size="16" 
  >
    <!-- 标题区域 -->
    <NFlex justify="space-between" align="center" :wrap="false">
      <NText :depth="1" style="font-size: 18px; font-weight: 500;">{{ label }}</NText>
      <NFlex align="center" :size="12">
        <slot name="optimization-mode-selector"></slot>
        <NButton
          type="tertiary"
          size="small"
          @click="openFullscreen"
          :title="$t('common.expand')"
          ghost
          round
        >
          <template #icon>
            <NIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </NIcon>
          </template>
        </NButton>
      </NFlex>
    </NFlex>

    <!-- 输入框 -->
    <NInput
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      type="textarea"
      :placeholder="placeholder"
      :rows="4"
      :autosize="{ minRows: 4, maxRows: 12 }"
      clearable
    />
    <NFlex justify="space-between" align="center" style="margin-top: 4px;">
      <NAlert v-if="showWarning" type="warning" :show-icon="true" :bordered="false" style="padding: 2px 8px;">
        Prompt length is approaching the model's limit.
      </NAlert>
      <div v-else></div> <!-- Placeholder to keep count to the right -->
      <NText
        v-if="maxTokens"
        :depth="3"
        style="font-size: 12px; margin-left: auto;"
        aria-live="polite"
      >
        {{ charCount }} / {{ maxTokens }}
      </NText>
    </NFlex>

    <!-- 控制面板 -->
    <NGrid :cols="24" :x-gap="12" responsive="screen">
      <!-- 模型选择 -->
      <NGridItem :span="6" :xs="24" :sm="6">
        <NSpace vertical :size="8">
          <NText :depth="2" style="font-size: 14px; font-weight: 500;">{{ modelLabel }}</NText>
          <slot name="model-select"></slot>
        </NSpace>
      </NGridItem>
      
      <!-- 提示词模板选择 -->
      <NGridItem v-if="templateLabel" :span="12" :xs="24" :sm="12">
        <NSpace vertical :size="8">
          <NText :depth="2" style="font-size: 14px; font-weight: 500;">{{ templateLabel }}</NText>
          <slot name="template-select"></slot>
        </NSpace>
      </NGridItem>

      <!-- 控制按钮组 -->
      <NGridItem :span="templateLabel ? 2 : 14" :xs="24" :sm="templateLabel ? 2 : 14">
        <NSpace vertical :size="8" align="end">
          <slot name="control-buttons"></slot>
        </NSpace>
      </NGridItem>

      <!-- 提交按钮 -->
      <NGridItem :span="4" :xs="24" :sm="4">
        <NSpace vertical :size="8" align="end">
          <NButton
            type="primary"
            size="medium"
            @click="$emit('submit')"
            :loading="loading"
            :disabled="loading || disabled || !modelValue.trim()"
            block
            round
          >
            {{ loading ? loadingText : buttonText }}
          </NButton>
        </NSpace>
      </NGridItem>
    </NGrid>
  </NSpace>
  
  <!-- 全屏弹窗 -->
  <FullscreenDialog v-model="isFullscreen" :title="label">
    <NInput
      v-model:value="fullscreenValue"
      type="textarea"
      :placeholder="placeholder"
      :autosize="{ minRows: 20 }"
      clearable
      show-count
    />
  </FullscreenDialog>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { NInput, NButton, NText, NSpace, NFlex, NGrid, NGridItem, NIcon, NAlert } from 'naive-ui'
import { useFullscreen } from '../composables/useFullscreen'
import FullscreenDialog from './FullscreenDialog.vue'
import { useModelManager } from '../composables/useModelManager'
import { useModelSelectRefs } from '../composables/useModelSelectRefs'
import type { AppServices } from '../types/services'

interface Props {
  modelValue: string
  selectedModel: string
  label: string
  placeholder?: string
  modelLabel: string
  templateLabel?: string
  buttonText: string
  loadingText: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  templateLabel: '',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:selectedModel': [value: string]
  'submit': []
  'configModel': []
}>()

const services = inject<import('vue').Ref<AppServices | null>>('services', null)
const modelSelectRefs = useModelSelectRefs()
const modelManager = useModelManager(services, modelSelectRefs)

const charCount = computed(() => props.modelValue.length)

const maxTokens = computed(() => {
  const model = modelManager.allModels.value.find(m => m.key === props.selectedModel)
  return model?.maxTokens || null
})

const showWarning = computed(() => {
  if (!maxTokens.value) return false
  return charCount.value > maxTokens.value * 0.8
})

// 使用全屏组合函数
const { isFullscreen, fullscreenValue, openFullscreen } = useFullscreen(
  computed(() => props.modelValue),
  (value) => emit('update:modelValue', value)
)
</script>