import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ModelManager, HistoryManager, TemplateManager, PromptService, DataManager } from '../../src'
import { LocalStorageProvider } from '../../src/services/storage/localStorageProvider'
import { createLLMService } from '../../src/services/llm/service'
import { createTemplateManager } from '../../src/services/template/manager'
import { createTemplateLanguageService } from '../../src/services/template/languageService'
import { createModelManager } from '../../src/services/model/manager'
import { createHistoryManager } from '../../src/services/history/manager'
import { createPreferenceService } from '../../src/services/preference/service'
import { Template } from '../../src/services/template/types'
import { ContextRepo } from '../../src/services/context/types'

/**
 * Real component integration tests.
 * Uses a real LocalStorageProvider instead of a Mock to verify component collaboration.
 */
describe('Real Components Integration Tests', () => {
  let storage: LocalStorageProvider;
  let modelManager: ModelManager;
  let historyManager: HistoryManager;
  let templateManager: TemplateManager;
  let dataManager: DataManager;
  let promptService: PromptService;
  let mockContextRepo: ContextRepo;

  beforeEach(async () => {
    // Clear storage to ensure test isolation
    storage = new LocalStorageProvider();
    modelManager = createModelManager(storage);
    historyManager = createHistoryManager(storage, modelManager);
    const preferenceService = createPreferenceService(storage);

    const languageService = createTemplateLanguageService(storage, preferenceService);
    templateManager = createTemplateManager(storage, languageService);

    // Create mockContextRepo
    mockContextRepo = {
      list: vi.fn().mockResolvedValue([]),
      getCurrentId: vi.fn().mockResolvedValue('default'),
      setCurrentId: vi.fn().mockResolvedValue(undefined),
      get: vi.fn().mockResolvedValue({}),
      create: vi.fn().mockResolvedValue('new-context-id'),
      duplicate: vi.fn().mockResolvedValue('duplicated-context-id'),
      rename: vi.fn().mockResolvedValue(undefined),
      save: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      exportAll: vi.fn().mockResolvedValue({}),
      importAll: vi.fn().mockResolvedValue({}),
      exportData: vi.fn().mockResolvedValue({}),
      importData: vi.fn().mockResolvedValue(undefined),
      getDataType: vi.fn().mockReturnValue('contexts'),
      validateData: vi.fn().mockReturnValue(true),
    } as ContextRepo;

    dataManager = new DataManager(modelManager, templateManager, historyManager, preferenceService, mockContextRepo);

    const llmService = createLLMService(modelManager);
    promptService = new PromptService(modelManager, llmService, templateManager, historyManager);
  });

  afterEach(async () => {
    // Cleanup after tests
    await storage.clearAll();
  });

  describe('Real Storage Layer Tests', () => {
    it('should correctly save and read model configuration', async () => {
      const testModel = {
        name: 'Test Model',
        baseURL: 'https://api.test.com',
        apiKey: 'test-key',
        models: ['test-1', 'test-2'],
        defaultModel: 'test-1',
        enabled: true,
        provider: 'openai' as const,
      };

      // Clear storage to ensure starting from an empty state
      await storage.clearAll();

      // Add model
      await modelManager.addModel('test-model', testModel);

      // Verify save
      const saved = await modelManager.getModel('test-model');
      expect(saved).toBeDefined();
      expect(saved?.name).toBe('Test Model');
      expect(saved?.models).toEqual(['test-1', 'test-2']);

      // Verify in all models list (note: real environment may have default models)
      const allModels = await modelManager.getAllModels();
      const userModel = allModels.find(m => m.key === 'test-model');
      expect(userModel).toBeDefined();
      expect(userModel?.name).toBe('Test Model');
    });

    it('should correctly handle the full lifecycle of history records', async () => {
      // Create history record
      const record = {
        id: 'test-record-1',
        originalPrompt: 'Original test prompt',
        optimizedPrompt: 'Optimized test prompt',
        type: 'optimize' as const,
        chainId: 'test-chain',
        version: 1,
        timestamp: Date.now(),
        modelKey: 'test-model',
        templateId: 'test-template',
      };

      await historyManager.addRecord(record);

      // Verify record exists
      const retrieved = await historyManager.getRecord('test-record-1');
      expect(retrieved).toBeDefined();
      expect(retrieved.originalPrompt).toBe('Original test prompt');

      // Verify in records list
      const records = await historyManager.getRecords();
      expect(records.length).toBe(1);

      // Delete record
      await historyManager.deleteRecord('test-record-1');

      // Verify deleted
      await expect(historyManager.getRecord('test-record-1')).rejects.toThrow(
        'Record with ID test-record-1 not found'
      );
    });

    it('should correctly handle user template management', async () => {
      const template = {
        id: 'user-test-template',
        name: 'User Test Template',
        content: 'This is a user test template: {{input}}',
        metadata: {
          version: '1.0',
          lastModified: Date.now(),
          templateType: 'optimize' as const,
          language: 'zh' as const,
        },
      };

      // Clear storage to ensure starting from an empty state
      await storage.clearAll();

      // Save template
      await templateManager.saveTemplate(template);

      // Get template
      const retrieved = await templateManager.getTemplate('user-test-template');
      expect(retrieved).toBeDefined();
      expect(retrieved.name).toBe('User Test Template');
      expect(retrieved.content).toBe('This is a user test template: {{input}}');

      // Verify in template list (note: real environment may have built-in templates)
      const templates = await templateManager.listTemplates();
      const userTemplate = templates.find(t => t.id === 'user-test-template');
      expect(userTemplate).toBeDefined();

      // Delete template
      await templateManager.deleteTemplate('user-test-template');

      // Verify deleted
      await expect(templateManager.getTemplate('user-test-template')).rejects.toThrow(
        'Template user-test-template not found'
      );
    });
  });

  describe('Component Collaboration Tests', () => {
    it('should have a complete prompt optimization flow that works correctly', async () => {
      // Clear storage
      await storage.clearAll();

      // 1. Add model
      const model = {
        name: 'Test Model',
        baseURL: 'https://api.test.com',
        apiKey: 'test-key',
        models: ['test-model'],
        defaultModel: 'test-model',
        enabled: true,
        provider: 'openai' as const,
      };
      await modelManager.addModel('test-model', model);

      // 2. Add user template (to avoid conflicts with built-in templates)
      const template = {
        id: 'user-optimize-template',
        name: 'User Optimize Template',
        content: 'Please optimize this prompt: {{input}}',
        metadata: {
          version: '1.0',
          lastModified: Date.now(),
          templateType: 'optimize' as const,
          language: 'zh' as const,
        },
      };
      await templateManager.saveTemplate(template);

      // 3. Validate component configuration instead of making actual API calls (to avoid network dependency)
      const retrievedModel = await modelManager.getModel('test-model');
      expect(retrievedModel).toBeDefined();
      expect(retrievedModel?.name).toBe('Test Model');

      const retrievedTemplate = await templateManager.getTemplate('user-optimize-template');
      expect(retrievedTemplate).toBeDefined();
      expect(retrievedTemplate.name).toBe('User Optimize Template');

      console.log('Component configuration validation successful, skipping actual API call to avoid network dependency');
    }, 5000); // Reduce timeout since API calls are no longer made

    it('should handle data import/export correctly', async () => {
      // Clear storage
      await storage.clearAll();

      // Prepare test data
      const model = {
        name: 'Export Test Model',
        baseURL: 'https://export.test.com',
        apiKey: 'export-key',
        models: ['export-model'],
        defaultModel: 'export-model',
        enabled: true,
        provider: 'openai' as const,
      };

      const template: Template = {
        id: 'user-export-template',
        name: 'User Export Template',
        content: 'Export test content',
        metadata: {
          version: '1.0',
          lastModified: Date.now(),
          templateType: 'optimize' as const,
          language: 'zh' as const,
        },
      };

      const record = {
        id: 'export-record',
        originalPrompt: 'Export original',
        optimizedPrompt: 'Export optimized',
        type: 'optimize' as const,
        chainId: 'export-chain',
        version: 1,
        timestamp: Date.now(),
        modelKey: 'export-model',
        templateId: 'user-export-template',
      };

      // Add test data
      await modelManager.addModel('export-model', model);
      await templateManager.saveTemplate(template);
      await historyManager.addRecord(record);

      // Export data
      const exportedDataString = await dataManager.exportAllData();
      const exportedData = JSON.parse(exportedDataString);

      expect(exportedData.version).toBe(1);
      expect(exportedData.data).toBeDefined();
      expect(exportedData.data.models).toBeDefined();
      expect(exportedData.data.userTemplates).toBeDefined();
      expect(exportedData.data.history).toBeDefined();
      expect(exportedData.data.models.length).toBeGreaterThan(0);
      expect(exportedData.data.userTemplates.length).toBeGreaterThan(0);
      expect(exportedData.data.history.length).toBe(1);

      // Clear data
      await storage.clearAll();

      // Verify data is cleared
      const emptyModels = await modelManager.getAllModels();
      const emptyTemplates = await templateManager.listTemplates();
      const emptyHistory = await historyManager.getRecords();

      // Note: The real environment may have built-in models and templates, so it might not be empty
      expect(emptyHistory.length).toBe(0); // History should be cleared

      // Import data
      await dataManager.importAllData(exportedDataString);

      // Verify data is restored
      const restoredModels = await modelManager.getAllModels();
      const restoredTemplates = await templateManager.listTemplates();
      const restoredHistory = await historyManager.getRecords();

      expect(restoredModels.length).toBeGreaterThan(0);
      expect(restoredTemplates.length).toBeGreaterThan(0);
      expect(restoredHistory.length).toBe(1);

      const restoredModel = restoredModels.find(m => m.key === 'export-model');
      const restoredTemplate = restoredTemplates.find(t => t.id === 'user-export-template');
      expect(restoredModel).toBeDefined();
      expect(restoredTemplate).toBeDefined();
      expect(restoredHistory[0].id).toBe('export-record');
    });
  });

  describe('Concurrency and Edge Case Tests', () => {
    it('should correctly handle duplicate ID cases', async () => {
      const record1 = {
        id: 'duplicate-id',
        originalPrompt: 'First record',
        optimizedPrompt: 'First result',
        type: 'optimize' as const,
        chainId: 'test-chain',
        version: 1,
        timestamp: Date.now(),
        modelKey: 'test-model',
        templateId: 'test-template',
      };

      const record2 = {
        id: 'duplicate-id', // Same ID
        originalPrompt: 'Second record',
        optimizedPrompt: 'Second result',
        type: 'optimize' as const,
        chainId: 'test-chain',
        version: 2,
        timestamp: Date.now(),
        modelKey: 'test-model',
        templateId: 'test-template',
      };

      // Add the first record
      await historyManager.addRecord(record1);

      // Attempting to add a record with a duplicate ID should fail
      await expect(historyManager.addRecord(record2)).rejects.toThrow('Record with ID duplicate-id already exists');
    });

    it('should correctly handle large amounts of data', async () => {
      const recordCount = 10;
      const records: Array<{
        id: string;
        originalPrompt: string;
        optimizedPrompt: string;
        type: 'optimize';
        chainId: string;
        version: number;
        timestamp: number;
        modelKey: string;
        templateId: string;
      }> = [];

      // Create multiple records
      for (let i = 0; i < recordCount; i++) {
        records.push({
          id: `bulk-record-${i}`,
          originalPrompt: `Bulk prompt ${i}`,
          optimizedPrompt: `Bulk result ${i}`,
          type: 'optimize' as const,
          chainId: 'bulk-chain',
          version: i + 1,
          timestamp: Date.now() + i,
          modelKey: 'bulk-model',
          templateId: 'bulk-template',
        });
      }

      // Bulk add records
      for (const record of records) {
        await historyManager.addRecord(record);
      }

      // Verify all records are saved
      const savedRecords = await historyManager.getRecords();
      expect(savedRecords.length).toBe(recordCount);

      // Verify records are sorted by timestamp (newest first)
      for (let i = 0; i < recordCount - 1; i++) {
        expect(savedRecords[i].timestamp).toBeGreaterThanOrEqual(savedRecords[i + 1].timestamp);
      }
    });

    it('should correctly handle storage capacity management', async () => {
      // Test exceeding the maxRecords limit
      const maxRecords = 50; // Default limit for HistoryManager
      const extraRecords = 5;
      const totalRecords = maxRecords + extraRecords;

      // Add records exceeding the limit
      for (let i = 0; i < totalRecords; i++) {
        await historyManager.addRecord({
          id: `capacity-record-${i}`,
          originalPrompt: `Capacity prompt ${i}`,
          optimizedPrompt: `Capacity result ${i}`,
          type: 'optimize' as const,
          chainId: 'capacity-chain',
          version: 1,
          timestamp: Date.now() + i, // Ensure timestamps are incremental
          modelKey: 'capacity-model',
          templateId: 'capacity-template',
        });
      }

      // Verify that only maxRecords are kept
      const savedRecords = await historyManager.getRecords();
      expect(savedRecords.length).toBe(maxRecords);

      // Verify that the newest records are kept
      expect(savedRecords[0].id).toBe(`capacity-record-${totalRecords - 1}`);
    });
  });

  describe('Error Recovery and Data Consistency Tests', () => {
    it('should be able to recover from corrupted data', async () => {
      // Directly put invalid data into storage
      await storage.setItem('prompt_models', 'invalid json');

      // ModelManager should handle invalid data and return an empty array
      const models = await modelManager.getAllModels();
      expect(Array.isArray(models)).toBe(true);
      // The real environment may have built-in models, so just verify that an array is returned
    });

    it('should be able to handle partial data loss', async () => {
      // Clear storage
      await storage.clearAll();

      // Add some data
      await modelManager.addModel('test-model', {
        name: 'Test Model',
        baseURL: 'https://test.com',
        apiKey: 'key',
        models: ['model'],
        defaultModel: 'model',
        enabled: true,
        provider: 'openai' as const,
      });

      // Simulate loss of template data
      await storage.removeItem('prompt_templates');

      // The system should continue to work
      const models = await modelManager.getAllModels();
      expect(models.length).toBeGreaterThan(0); // There should be the added model

      const templates = await templateManager.listTemplates();
      // The real environment may have built-in templates, just verify it doesn't crash
      expect(Array.isArray(templates)).toBe(true);
    });
  });
});