import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest'
import { 
  createLLMService, 
  createModelManager,
  createTemplateManager,
  createHistoryManager,
  PromptService,
  ModelConfig,
  OptimizationRequest,
  OptimizationError,
  TestError,
  IStorageProvider,
  MemoryStorageProvider,
} from '../../../src'
import { createTemplateLanguageService } from '../../../src/services/template/languageService'

describe('PromptService', () => {
  let storageProvider: IStorageProvider;
  let promptService: PromptService;
  let modelManager: any;
  let llmService: any;
  let templateManager: any;
  let historyManager: any;
  let languageService: any;

  const mockModelConfig: ModelConfig = {
    name: 'test-model',
    baseURL: 'https://test.api',
    apiKey: 'test-key',
    models: ['test-model'],
    defaultModel: 'test-model',
    enabled: true,
    provider: 'openai'
  };

  beforeEach(async () => {
    storageProvider = new MemoryStorageProvider();

    // Clear storage state
    await storageProvider.clearAll();

    // Create all required services
    languageService = createTemplateLanguageService(storageProvider);
    templateManager = createTemplateManager(storageProvider, languageService);
    historyManager = createHistoryManager(storageProvider);
    modelManager = createModelManager(storageProvider);
    llmService = createLLMService(modelManager);

    // Initialize services
    await modelManager.addModel('test-model', mockModelConfig);

    // Create PromptService directly
    promptService = new PromptService(modelManager, llmService, templateManager, historyManager);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('optimizePrompt', () => {
    it('should successfully optimize the prompt', async () => {
      vi.spyOn(llmService, 'sendMessage').mockResolvedValue('Optimized prompt');

      const request: OptimizationRequest = {
        optimizationMode: 'system',
        targetPrompt: 'test prompt',
        modelKey: 'test-model',
      };
      const result = await promptService.optimizePrompt(request);
      expect(result).toBe('Optimized prompt');
      expect(llmService.sendMessage).toHaveBeenCalled();
    });

    it('should throw an error when the model does not exist', async () => {
      const request: OptimizationRequest = {
        optimizationMode: 'system',
        targetPrompt: 'test prompt',
        modelKey: 'non-existent-model',
      };
      await expect(promptService.optimizePrompt(request)).rejects.toThrow(OptimizationError);
    });
  });

  describe('testPrompt', () => {
    it('should successfully test the prompt', async () => {
      vi.spyOn(llmService, 'sendMessage').mockResolvedValue('Test result');

      const result = await promptService.testPrompt(
        'system prompt',
        'user prompt',
        'test-model',
      );
      expect(result).toBe('Test result');
    });

    it('should throw an error when the model does not exist', async () => {
      await expect(
        promptService.testPrompt(
          'system prompt',
          'user prompt',
          'non-existent-model',
        ),
      ).rejects.toThrow(TestError);
    });
  });

  describe('getHistory', () => {
    it('should return the history', async () => {
      const history = await promptService.getHistory();
      expect(Array.isArray(history)).toBe(true);
    });
  });
});