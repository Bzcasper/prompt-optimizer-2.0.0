import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromptService } from '../../../src/services/prompt/service';
import { IModelManager } from '../../../src/services/model/types';
import { ILLMService } from '../../../src/services/llm/types';
import { ITemplateManager, Template } from '../../../src/services/template/types';
import { IHistoryManager } from '../../../src/services/history/types';
import { OptimizationError } from '../../../src/services/prompt/errors';

describe('PromptService Critic Functionality', () => {
  let promptService: PromptService;
  let modelManager: IModelManager;
  let llmService: ILLMService;
  let templateManager: ITemplateManager;
  let historyManager: IHistoryManager;

  beforeEach(() => {
    modelManager = {
      getModel: vi.fn().mockResolvedValue({}),
    } as any;

    llmService = {
      sendMessage: vi.fn(),
    } as any;

    templateManager = {
      getTemplate: vi.fn(),
      listTemplatesByType: vi.fn(),
    } as any;

    historyManager = {
      createNewChain: vi.fn(),
    } as any;

    promptService = new PromptService(modelManager, llmService, templateManager, historyManager);
  });

  describe('critiquePrompt', () => {
    it('should return a parsed critique result when critique is successful', async () => {
      const critiqueTemplate: Template = { id: 'critique-prompt', name: 'Critique', content: 'Critique: {{promptToCritique}}', isBuiltin: true, metadata: {} };
      vi.spyOn(templateManager, 'getTemplate').mockResolvedValue(critiqueTemplate);
      const mockCritiqueResult = { is_passed: true, critique: 'Looks good!' };
      vi.spyOn(llmService, 'sendMessage').mockResolvedValue(JSON.stringify(mockCritiqueResult));

      const result = await promptService.critiquePrompt('test prompt', 'test-model');

      expect(result).toEqual(mockCritiqueResult);
      expect(llmService.sendMessage).toHaveBeenCalled();
    });

    it('should throw an error if the critique response is not valid JSON', async () => {
      const critiqueTemplate: Template = { id: 'critique-prompt', name: 'Critique', content: 'Critique: {{promptToCritique}}', isBuiltin: true, metadata: {} };
      vi.spyOn(templateManager, 'getTemplate').mockResolvedValue(critiqueTemplate);
      vi.spyOn(llmService, 'sendMessage').mockResolvedValue('not json');

      await expect(promptService.critiquePrompt('test prompt', 'test-model')).rejects.toThrow(OptimizationError);
    });
  });

  describe('optimizePrompt with critique loop', () => {
    it('should return the refined prompt if critique fails', async () => {
      const optimizeTemplate: Template = { id: 'optimize', name: 'Optimize', content: 'Optimize: {{originalPrompt}}', isBuiltin: true, metadata: {} };
      const refineTemplate: Template = { id: 'refine-based-on-critique', name: 'Refine', content: 'Refine: {{originalPrompt}} based on {{critique}}', isBuiltin: true, metadata: {} };

      // Mock for getDefaultTemplateId logic
      vi.spyOn(templateManager, 'listTemplatesByType').mockResolvedValue([optimizeTemplate]);

      vi.spyOn(templateManager, 'getTemplate').mockImplementation(async (id: string) => {
        if (id === 'optimize') return optimizeTemplate;
        if (id === 'refine-based-on-critique') return refineTemplate;
        return undefined;
      });

      vi.spyOn(llmService, 'sendMessage')
        .mockResolvedValueOnce('initial optimized prompt')
        .mockResolvedValueOnce('refined prompt');

      const critiqueResult = { is_passed: false, critique: 'Needs improvement' };
      vi.spyOn(promptService, 'critiquePrompt').mockResolvedValue(critiqueResult);

      const result = await promptService.optimizePrompt({
        targetPrompt: 'original prompt',
        modelKey: 'test-model',
        optimizationMode: 'system'
      });

      expect(result).toBe('refined prompt');
      expect(promptService.critiquePrompt).toHaveBeenCalledWith('initial optimized prompt', 'test-model');
      expect(llmService.sendMessage).toHaveBeenCalledTimes(2);
    });

    it('should return the initial prompt if critique passes', async () => {
      const optimizeTemplate: Template = { id: 'optimize', name: 'Optimize', content: 'Optimize: {{originalPrompt}}', isBuiltin: true, metadata: {} };

      // Mock for getDefaultTemplateId logic
      vi.spyOn(templateManager, 'listTemplatesByType').mockResolvedValue([optimizeTemplate]);
      vi.spyOn(templateManager, 'getTemplate').mockResolvedValue(optimizeTemplate);
      vi.spyOn(llmService, 'sendMessage').mockResolvedValue('initial optimized prompt');

      const critiqueResult = { is_passed: true, critique: 'Looks good!' };
      vi.spyOn(promptService, 'critiquePrompt').mockResolvedValue(critiqueResult);

      const result = await promptService.optimizePrompt({
        targetPrompt: 'original prompt',
        modelKey: 'test-model',
        optimizationMode: 'system'
      });

      expect(result).toBe('initial optimized prompt');
      expect(promptService.critiquePrompt).toHaveBeenCalledWith('initial optimized prompt', 'test-model');
      expect(llmService.sendMessage).toHaveBeenCalledTimes(1);
    });
  });
});