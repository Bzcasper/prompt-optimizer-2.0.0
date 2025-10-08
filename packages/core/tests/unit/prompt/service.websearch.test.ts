import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromptService } from '../../../src/services/prompt/service';
import { OptimizationRequest } from '../../../src/services/prompt/types';
import { IModelManager } from '../../../src/services/model/types';
import { ILLMService } from '../../../src/services/llm/types';
import { ITemplateManager } from '../../../src/services/template/types';
import { IHistoryManager } from '../../../src/services/history/types';
import { TemplateProcessor } from '../../../src/services/template/processor';

// Mock dependencies
const mockModelManager = {
  getModel: vi.fn(),
} as unknown as IModelManager;

const mockLlmService = {
  sendMessage: vi.fn(),
} as unknown as ILLMService;

const mockTemplateManager = {
  getTemplate: vi.fn(),
  listTemplatesByType: vi.fn(),
  listTemplates: vi.fn(),
} as unknown as ITemplateManager;

const mockHistoryManager = {
  getRecords: vi.fn(),
  getIterationChain: vi.fn(),
} as unknown as IHistoryManager;

vi.spyOn(TemplateProcessor, 'processTemplate').mockReturnValue([]);

describe('PromptService - Web Search Integration', () => {
  let promptService: PromptService;

  beforeEach(() => {
    vi.clearAllMocks();
    promptService = new PromptService(
      mockModelManager,
      mockLlmService,
      mockTemplateManager,
      mockHistoryManager
    );

    // Mock dependencies to return valid values
    (mockModelManager.getModel as any).mockResolvedValue({ id: 'test-model' });
    (mockTemplateManager.getTemplate as any).mockResolvedValue({ id: 'test-template', content: 'Template content' });
    (mockTemplateManager.listTemplatesByType as any).mockResolvedValue([{ id: 'default-user-template', content: 'Default user template' }]);
    (mockLlmService.sendMessage as any).mockResolvedValue('Optimized prompt');
  });

  it('should trigger web search and inject results when keywords are present', async () => {
    const performWebSearchSpy = vi.spyOn(promptService as any, 'performWebSearch');
    const processTemplateSpy = vi.spyOn(TemplateProcessor, 'processTemplate');

    const request: OptimizationRequest = {
      targetPrompt: 'What is the latest API for this service?',
      modelKey: 'test-model',
      optimizationMode: 'user',
    };

    await promptService.optimizePrompt(request);

    expect(performWebSearchSpy).toHaveBeenCalledWith(request.targetPrompt);
    expect(processTemplateSpy).toHaveBeenCalled();

    const context = processTemplateSpy.mock.calls[0][1];
    expect(context).toHaveProperty('webSearchResults');
    expect(context.webSearchResults).toContain('Simulated web search results');
  });

  it('should not trigger web search when keywords are absent', async () => {
    const performWebSearchSpy = vi.spyOn(promptService as any, 'performWebSearch');
    const processTemplateSpy = vi.spyOn(TemplateProcessor, 'processTemplate');

    const request: OptimizationRequest = {
      targetPrompt: 'Optimize this simple prompt.',
      modelKey: 'test-model',
      optimizationMode: 'user',
    };

    await promptService.optimizePrompt(request);

    expect(performWebSearchSpy).not.toHaveBeenCalled();

    const context = processTemplateSpy.mock.calls[0][1];
    expect(context).not.toHaveProperty('webSearchResults');
  });
});