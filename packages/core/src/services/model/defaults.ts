import { ModelConfig } from './types';
import { getEnvVar, clearCustomModelEnvCache } from '../../utils/environment';
import { createStaticModels } from './static-models';
import { generateDynamicModels } from './model-utils';

// For the web version, we don't access environment variables for API keys.
// They will be empty by default and must be provided by the user.
const staticModels: Record<string, ModelConfig> = createStaticModels({
  OPENAI_API_KEY: '',
  GEMINI_API_KEY: '',
  DEEPSEEK_API_KEY: '',
  SILICONFLOW_API_KEY: '',
  ZHIPU_API_KEY: '',
  CUSTOM_API_KEY: '',
  // These are not secrets and can be configured for custom models via env.
  CUSTOM_API_BASE_URL: getEnvVar('VITE_CUSTOM_API_BASE_URL'),
  CUSTOM_API_MODEL: getEnvVar('VITE_CUSTOM_API_MODEL')
});

/**
 * 获取所有模型配置（包括静态和动态）
 */
export function getAllModels(): Record<string, ModelConfig> {
  // 生成动态自定义模型
  const dynamicModels = generateDynamicModels();

  // 合并静态模型和动态模型
  return {
    ...staticModels,
    ...dynamicModels
  };
}

// 直接导出所有模型配置
export const defaultModels = getAllModels();

/**
 * 清除模型缓存，强制重新扫描
 */
export function clearModelsCache(): void {
  clearCustomModelEnvCache();
}
