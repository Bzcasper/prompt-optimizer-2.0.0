import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import ContextEditor from '../../src/components/ContextEditor.vue'
import { createContextRepo, MemoryStorageProvider } from '@prompt-optimizer/core'

// Mock Naive UI Components
vi.mock('naive-ui', () => ({
  NModal: {
    name: 'NModal',
    template: `
      <div v-if="show" class="n-modal" data-testid="modal">
        <div class="n-card">
          <div class="n-card__header">
            <slot name="header" />{{ title }}<slot name="header-extra" />
          </div>
          <div class="n-card__content"><slot /></div>
        </div>
      </div>
    `,
    props: ['show', 'preset', 'title', 'style', 'size', 'bordered', 'segmented', 'maskClosable'],
    emits: ['update:show', 'afterEnter', 'afterLeave']
  },
  NTabs: {
    name: 'NTabs',
    template: '<div class="n-tabs" data-testid="tabs"><slot /></div>',
    props: ['value', 'type', 'size'],
    emits: ['update:value']
  },
  NTabPane: {
    name: 'NTabPane',
    template: '<div class="n-tab-pane" v-if="$parent.value === name || !$parent.value" :data-testid="`tab-${name}`"><slot /></div>',
    props: ['name', 'tab']
  },
  NCard: {
    name: 'NCard',
    template: `<div class="n-card"><div class="n-card__header" v-if="$slots.header"><slot name="header" /></div><div class="n-card__content"><slot /></div></div>`,
    props: ['size', 'bordered', 'embedded', 'hoverable', 'dashed']
  },
  NSpace: {
    name: 'NSpace',
    template: '<div class="n-space"><slot /></div>',
    props: ['justify', 'align', 'size', 'wrap']
  },
  NText: {
    name: 'NText',
    template: '<span class="n-text"><slot /></span>',
    props: ['class', 'depth', 'strong']
  },
  NTag: {
    name: 'NTag',
    template: '<span class="n-tag" :data-type="type"><slot name="icon" /><slot /></span>',
    props: ['size', 'type', 'round']
  },
  NButton: {
    name: 'NButton',
    template: '<button class="n-button" :disabled="disabled" :loading="loading" @click="$emit(\'click\')" :data-testid="$attrs[\'data-testid\'] || \'button\'"><slot name="icon" /><slot /></button>',
    props: ['type', 'disabled', 'loading', 'size', 'dashed', 'block', 'quaternary', 'circle', 'secondary'],
    emits: ['click']
  },
  NEmpty: {
    name: 'NEmpty',
    template: '<div class="n-empty" data-testid="empty"><slot name="icon" /><div><slot /></div><slot name="extra" /></div>',
    props: ['description', 'size']
  },
  NScrollbar: {
    name: 'NScrollbar',
    template: '<div class="n-scrollbar"><slot /></div>',
    props: ['style']
  },
  NList: {
    name: 'NList',
    template: '<div class="n-list"><slot /></div>'
  },
  NListItem: {
    name: 'NListItem',
    template: '<div class="n-list-item"><slot /></div>'
  },
  NInput: {
    name: 'NInput',
    template: '<textarea v-if="type === \'textarea\'" class="n-input" :value="value" :placeholder="placeholder" :disabled="disabled" @input="$emit(\'update:value\', $event.target.value)" data-testid="textarea"></textarea>',
    props: ['value', 'type', 'placeholder', 'autosize', 'size', 'disabled', 'readonly'],
    emits: ['update:value']
  },
  NSelect: {
    name: 'NSelect',
    template: '<select class="n-select" :value="value" @change="$emit(\'update:value\', $event.target.value)" data-testid="select"><option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.label}}</option></select>',
    props: ['value', 'options', 'size', 'disabled'],
    emits: ['update:value']
  },
  NGrid: {
    name: 'NGrid',
    template: '<div class="n-grid"><slot /></div>',
    props: ['cols', 'xGap', 'yGap']
  },
  NGridItem: {
    name: 'NGridItem',
    template: '<div class="n-grid-item"><slot /></div>'
  }
}))

// Mock vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string, params?: any) => {
      const translations: Record<string, any> = {
        'contextEditor.noMessages': 'No messages',
        'contextEditor.addFirstMessage': 'Add first message',
        'contextEditor.addMessage': 'Add message',
        'contextEditor.noVariables': 'No variables',
        'contextEditor.addFirstVariable': 'Add first variable override',
        'contextEditor.addVariable': 'Add variable',
        'contextEditor.variableOverrides': 'Context Variable Overrides',
        'contextEditor.globalVariables': `Global: ${params?.count || 0}`,
        'contextEditor.overrideCount': `${params?.count || 0} overrides`,
        'contextEditor.missingVariableHint': 'Click missing variable to enter edit mode',
        'conversation.clickToCreateVariable': 'Click to create variable',
        'common.edit': 'Edit',
        'common.preview': 'Preview',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.moveUp': 'Move Up',
        'common.moveDown': 'Move Down'
      }
      return translations[key] || key
    },
    locale: { value: 'en-US' }
  })
}))

// Mock composables
vi.mock('../../src/composables/useResponsive', () => ({
  useResponsive: () => ({
    modalWidth: { value: '90vw' },
    buttonSize: { value: 'medium' },
    inputSize: { value: 'medium' },
    cardSize: { value: 'small' },
    tagSize: { value: 'small' },
    size: { value: 'medium' },
    shouldUseVerticalLayout: { value: false },
    isMobile: { value: false }
  })
}))

vi.mock('../../src/composables/useAccessibility', () => ({
  useAccessibility: () => ({
    aria: {
      getLabel: (key: string, fallback?: string) => fallback || key,
      getDescription: (key: string) => key,
      getLiveRegionText: (key: string) => key
    },
    announce: vi.fn(),
    accessibilityClasses: { value: {} },
    isAccessibilityMode: { value: false },
    liveRegionMessage: { value: '' },
    announcements: { value: [] }
  })
}))

// Mock useContextEditor
const mockContextEditor = {
  currentData: { value: null },
  isLoading: { value: false },
  smartImport: vi.fn(),
  convertFromOpenAI: vi.fn(),
  convertFromLangFuse: vi.fn(),
  importFromFile: vi.fn(),
  exportToFile: vi.fn(),
  exportToClipboard: vi.fn(),
  setData: vi.fn()
}

vi.mock('../../src/composables/useContextEditor', () => ({
  useContextEditor: () => mockContextEditor
}))

// Mock quickTemplateManager
vi.mock('../../src/data/quickTemplates', () => ({
  quickTemplateManager: {
    getTemplates: vi.fn(() => [
      {
        id: 'template1',
        name: 'Test Template',
        description: 'Test template for integration testing',
        messages: [
          { role: 'system', content: 'You are a helpful assistant working on {{taskType}}.' }
        ]
      }
    ])
  }
}))

/**
 * Test component wrapper to integrate ContextRepo for persistence testing
 */
const TestContextEditorWithPersistence = {
  name: 'TestContextEditorWithPersistence',
  props: {
    initialState: {
      type: Object,
      default: () => ({
        messages: [],
        variables: {},
        tools: [],
        showVariablePreview: true,
        showToolManager: false,
        mode: 'edit'
      })
    }
  },
  setup(props: any, { emit }: any) {
    const visible = ref(true)
    const storage = new MemoryStorageProvider()
    const contextRepo = createContextRepo(storage)
    const currentContextId = ref<string | null>(null)
    
    // Mock variable scanning function
    const scanVariables = (content: string): string[] => {
      if (!content) return []
      const matches = content.match(/\{\{([^}]+)\}\}/g) || []
      return matches.map(match => match.slice(2, -2))
    }
    
    // Mock variable replacement function
    const replaceVariables = (content: string, vars?: Record<string, string>): string => {
      if (!content) return content
      const allVars = { ...vars }
      let result = content
      Object.entries(allVars).forEach(([key, value]) => {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value as string)
      })
      return result
    }
    
    // Check if a variable is predefined
    const isPredefinedVariable = (name: string): boolean => {
      const predefined = ['originalPrompt', 'currentPrompt', 'userQuestion', 'conversationContext', 'iterateInput', 'lastOptimizedPrompt', 'toolsContext']
      return predefined.includes(name)
    }
    
    // Handle state updates and persist them
    const handleStateUpdate = async (newState: any) => {
      if (!currentContextId.value) {
        // Create a new context
        currentContextId.value = await contextRepo.create({ title: 'Test Context' })
      }
      
      // Persist to ContextRepo
      await contextRepo.update(currentContextId.value, {
        messages: newState.messages || [],
        variables: newState.variables || {}
      })
      
      emit('stateChanged', newState)
    }
    
    // Handle context changes
    const handleContextChange = async (messages: any[], variables: Record<string, string>) => {
      if (!currentContextId.value) {
        currentContextId.value = await contextRepo.create({ title: 'Test Context' })
      }
      
      await contextRepo.update(currentContextId.value, {
        messages: messages || [],
        variables: variables || {}
      })
      
      emit('contextChanged', { messages, variables })
    }
    
    // Simulate data restoration after a refresh
    const simulateRefresh = async () => {
      if (currentContextId.value) {
        const contextData = await contextRepo.get(currentContextId.value)
        return {
          messages: contextData.messages,
          variables: contextData.variables,
          tools: contextData.tools || [],
          showVariablePreview: true,
          showToolManager: false,
          mode: 'edit'
        }
      }
      return props.initialState
    }
    
    return {
      visible,
      contextRepo,
      currentContextId,
      scanVariables,
      replaceVariables,
      isPredefinedVariable,
      handleStateUpdate,
      handleContextChange,
      simulateRefresh
    }
  },
  template: `
    <ContextEditor
      v-model:visible="visible"
      :state="initialState"
      :scan-variables="scanVariables"
      :replace-variables="replaceVariables" 
      :is-predefined-variable="isPredefinedVariable"
      @update:state="handleStateUpdate"
      @contextChange="handleContextChange"
      data-testid="context-editor-with-persistence"
    />
  `,
  components: {
    ContextEditor
  }
}

describe('ContextEditor Persistence Integration Test', () => {
  let wrapper: VueWrapper<any>
  
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })
  
  const createPersistenceWrapper = async (initialState = {}) => {
    const defaultState = {
      messages: [],
      variables: {},
      tools: [],
      showVariablePreview: true,
      showToolManager: false,
      mode: 'edit'
    }
    
    wrapper = mount(TestContextEditorWithPersistence, {
      props: {
        initialState: { ...defaultState, ...initialState }
      },
      global: {
        stubs: {},
        mocks: {
          announcements: []
        }
      }
    })
    
    await nextTick()
    return wrapper
  }

  describe('Core Persistence Functionality Verification', () => {
    it('should create ContextRepo and support basic persistence', async () => {
      wrapper = await createPersistenceWrapper()
      
      // Verify the wrapper component correctly created the storage and repository
      expect(wrapper.vm.contextRepo).toBeDefined()
      expect(wrapper.vm.currentContextId).toBeDefined()
      
      // Verify helper functions are available
      expect(typeof wrapper.vm.scanVariables).toBe('function')
      expect(typeof wrapper.vm.replaceVariables).toBe('function') 
      expect(typeof wrapper.vm.isPredefinedVariable).toBe('function')
      expect(typeof wrapper.vm.simulateRefresh).toBe('function')
    })
    
    it('should support variable scanning and replacement', async () => {
      wrapper = await createPersistenceWrapper()
      
      // Test variable scanning
      const content = 'Hello {{name}}, your task is {{task}}'
      const variables = wrapper.vm.scanVariables(content)
      expect(variables).toEqual(['name', 'task'])
      
      // Test variable replacement
      const values = { name: 'Alice', task: 'testing' }
      const replaced = wrapper.vm.replaceVariables(content, values)
      expect(replaced).toBe('Hello Alice, your task is testing')
      
      // Test predefined variable detection
      expect(wrapper.vm.isPredefinedVariable('originalPrompt')).toBe(true)
      expect(wrapper.vm.isPredefinedVariable('customVar')).toBe(false)
    })
    
    it('should support context data persistence', async () => {
      const testState = {
        messages: [
          { role: 'system', content: 'Test {{mode}} message' }
        ],
        variables: { mode: 'integration' }
      }
      
      wrapper = await createPersistenceWrapper(testState)
      
      // Simulate state update persistence
      await wrapper.vm.handleStateUpdate({
        messages: [
          ...testState.messages,
          { role: 'user', content: 'User message with {{param}}' }
        ],
        variables: { ...testState.variables, param: 'value' }
      })
      
      // Verify a context has been created
      expect(wrapper.vm.currentContextId).toBeTruthy()
      
      // Verify the stateChanged event was emitted
      expect(wrapper.emitted('stateChanged')).toBeTruthy()
    })
    
    it('should support data restoration after a refresh', async () => {
      const initialData = {
        messages: [
          { role: 'user', content: 'Initial message with {{var}}' }
        ],
        variables: { var: 'initial' }
      }
      
      wrapper = await createPersistenceWrapper(initialData)
      
      // Simulate data modification
      await wrapper.vm.handleContextChange(
        [
          ...initialData.messages,
          { role: 'assistant', content: 'Response with {{response}}' }
        ],
        { ...initialData.variables, response: 'result' }
      )
      
      // Verify a context has been created and contains data
      expect(wrapper.vm.currentContextId).toBeTruthy()
      
      // Simulate restoration after a refresh
      const restoredState = await wrapper.vm.simulateRefresh()
      
      // Verify data is correctly restored
      expect(restoredState.messages).toHaveLength(2)
      expect(restoredState.messages[1].content).toBe('Response with {{response}}')
      expect(restoredState.variables.response).toBe('result')
      expect(restoredState.variables.var).toBe('initial')
    })
    
    it('should ensure variable preview consistency', async () => {
      wrapper = await createPersistenceWrapper()
      
      const testContent = 'Processing {{task}} in {{mode}} environment'
      const testVariables = { task: 'analysis', mode: 'production' }
      
      // Verify variable scan results
      const detectedVars = wrapper.vm.scanVariables(testContent)
      expect(detectedVars).toEqual(['task', 'mode'])
      
      // Verify full replacement
      const fullyReplaced = wrapper.vm.replaceVariables(testContent, testVariables)
      expect(fullyReplaced).toBe('Processing analysis in production environment')
      
      // Verify handling of missing variables
      const partialVars = { task: 'analysis' } // mode is missing
      const partiallyReplaced = wrapper.vm.replaceVariables(testContent, partialVars)
      expect(partiallyReplaced).toBe('Processing analysis in {{mode}} environment')
      
      // Verify detection of missing variables
      const availableVars = Object.keys(partialVars)
      const missingVars = detectedVars.filter(v => !availableVars.includes(v))
      expect(missingVars).toEqual(['mode'])
    })
  })
})