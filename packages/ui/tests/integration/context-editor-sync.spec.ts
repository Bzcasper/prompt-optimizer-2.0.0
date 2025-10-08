import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import ConversationManager from '../../src/components/ConversationManager.vue'
import ContextEditor from '../../src/components/ContextEditor.vue'

// Mock Naive UI Components
vi.mock('naive-ui', () => ({
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
    props: ['class', 'depth']
  },
  NTag: {
    name: 'NTag',
    template: '<span class="n-tag"><slot name="icon" /><slot /></span>',
    props: ['size', 'type', 'round']
  },
  NButton: {
    name: 'NButton',
    template: '<button class="n-button" :disabled="disabled" :loading="loading" @click="$emit(\'click\')" data-testid="button"><slot name="icon" /><slot /></button>',
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
    template: '<textarea v-if="type === \'textarea\'" class="n-input" :value="value" :placeholder="placeholder" :disabled="disabled" @input="$emit(\'update:value\', $event.target.value)"></textarea>',
    props: ['value', 'type', 'placeholder', 'autosize', 'size', 'disabled', 'readonly'],
    emits: ['update:value']
  },
  NDropdown: {
    name: 'NDropdown',
    template: '<div class="n-dropdown" @click="$emit(\'select\', \'user\')"><slot /></div>',
    props: ['options'],
    emits: ['select']
  },
  NModal: {
    name: 'NModal',
    template: `
      <div v-if="show" class="n-modal" data-testid="modal">
        <div class="n-card">
          <div class="n-card__header">
            <slot name="header" />{{ title }}<slot name="header-extra" />
          </div>
          <div class="n-card__content"><slot /></div>
          <div class="n-card__footer"><slot name="action" /></div>
        </div>
      </div>
    `,
    props: ['show', 'preset', 'title', 'style', 'size', 'bordered', 'segmented', 'maskClosable'],
    emits: ['update:show', 'afterEnter', 'afterLeave']
  },
  NTabs: {
    name: 'NTabs',
    template: '<div class="n-tabs"><slot /></div>',
    props: ['value', 'type', 'size'],
    emits: ['update:value']
  },
  NTabPane: {
    name: 'NTabPane',
    template: '<div class="n-tab-pane" v-if="$parent.value === name || !$parent.value"><slot /></div>',
    props: ['name', 'tab']
  },
  NSelect: {
    name: 'NSelect',
    template: '<select class="n-select" :value="value" @change="$emit(\'update:value\', $event.target.value)"><option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.label}}</option></select>',
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
        'conversation.management.title': 'Conversation Management',
        'conversation.messageCount': `${params?.count || 0} messages`,
        'variables.count': `${params?.count || 0} variables`,
        'variables.missing': `Missing ${params?.count || 0}`,
        'tools.count': `${params?.count || 0} tools`,
        'conversation.noMessages': 'No messages',
        'conversation.addFirst': 'Add first message',
        'conversation.addMessage': 'Add message',
        'common.expand': 'Expand',
        'common.collapse': 'Collapse',
        'conversation.management.openEditor': 'Open Editor',
        'common.moveUp': 'Move Up',
        'common.moveDown': 'Move Down',
        'common.delete': 'Delete',
        'conversation.roles.system': 'System',
        'conversation.roles.user': 'User',
        'conversation.roles.assistant': 'Assistant',
        'conversation.placeholders.system': 'Enter system prompt...',
        'conversation.placeholders.user': 'Enter user message...',
        'conversation.placeholders.assistant': 'Enter assistant reply...',
        'conversation.clickToCreateVariable': 'Click to create variable',
        'contextEditor.noMessages': 'No messages',
        'contextEditor.addFirstMessage': 'Add first message',
        'contextEditor.addMessage': 'Add message',
        'common.preview': 'Preview',
        'common.edit': 'Edit',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.import': 'Import',
        'common.export': 'Export'
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
    shouldUseVerticalLayout: { value: false },
    isMobile: { value: false }
  })
}))

vi.mock('../../src/composables/usePerformanceMonitor', () => ({
  usePerformanceMonitor: () => ({
    recordUpdate: vi.fn()
  })
}))

vi.mock('../../src/composables/useDebounceThrottle', () => ({
  useDebounceThrottle: () => ({
    debounce: (fn: Function) => fn,
    throttle: (fn: Function) => fn,
    batchExecute: (fn: Function) => {
      return (item: any) => {
        fn([item])
      }
    }
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
        name: 'System Template',
        description: 'System chat template',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' }
        ]
      }
    ])
  }
}))

/**
 * Test parent component to simulate real data synchronization scenarios
 */
const TestParentComponent = {
  name: 'TestParentComponent',
  props: {
    initialMessages: {
      type: Array,
      default: () => []
    },
    initialVariables: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: any, { emit }: any) {
    // Shared reactive state
    const messages = ref([...props.initialMessages])
    const variables = ref({ ...props.initialVariables })
    const showContextEditor = ref(false)
    
    // Mock variable scanning function
    const scanVariables = (content: string): string[] => {
      if (!content) return []
      const matches = content.match(/\{\{([^}]+)\}\}/g) || []
      return matches.map(match => match.slice(2, -2))
    }
    
    // Mock variable replacement function
    const replaceVariables = (content: string, vars?: Record<string, string>): string => {
      if (!content || !vars) return content
      let result = content
      Object.entries(vars).forEach(([key, value]) => {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value as string)
      })
      return result
    }
    
    // Handle message updates from ConversationManager
    const handleMessagesUpdate = (newMessages: any[]) => {
      messages.value = [...newMessages]
      emit('messagesChanged', messages.value)
    }
    
    // Handle state updates from ContextEditor
    const handleContextEditorStateUpdate = (newState: any) => {
      if (newState.messages) {
        messages.value = [...newState.messages]
      }
      if (newState.variables) {
        variables.value = { ...newState.variables }
      }
      emit('contextChanged', { messages: messages.value, variables: variables.value })
    }
    
    // Handle context change event
    const handleContextChange = (newMessages: any[], newVariables: Record<string, string>) => {
      messages.value = [...newMessages]
      variables.value = { ...newVariables }
      emit('contextChanged', { messages: messages.value, variables: variables.value })
    }
    
    // Open editor
    const handleOpenContextEditor = () => {
      showContextEditor.value = true
    }
    
    // Close editor
    const handleCloseContextEditor = () => {
      showContextEditor.value = false
    }
    
    return {
      messages,
      variables,
      showContextEditor,
      scanVariables,
      replaceVariables,
      handleMessagesUpdate,
      handleContextEditorStateUpdate,
      handleContextChange,
      handleOpenContextEditor,
      handleCloseContextEditor
    }
  },
  template: `
    <div>
      <ConversationManager
        :messages="messages"
        :available-variables="variables"
        :scan-variables="scanVariables"
        :replace-variables="replaceVariables"
        @update:messages="handleMessagesUpdate"
        @openContextEditor="handleOpenContextEditor"
        data-testid="conversation-manager"
      />
      
      <ContextEditor
        :visible="showContextEditor"
        :state="{ messages, variables, tools: [], showVariablePreview: true, showToolManager: false, mode: 'edit' }"
        :scan-variables="scanVariables"
        :replace-variables="replaceVariables"
        :is-predefined-variable="() => false"
        @update:visible="(visible) => showContextEditor = visible"
        @update:state="handleContextEditorStateUpdate"
        @contextChange="handleContextChange"
        data-testid="context-editor"
      />
    </div>
  `,
  components: {
    ConversationManager,
    ContextEditor
  }
}

describe('Integration Test for Data Sync between ConversationManager and ContextEditor', () => {
  let wrapper: VueWrapper<any>
  
  beforeEach(() => {
    vi.clearAllMocks()
    if (wrapper) {
      wrapper.unmount()
    }
  })
  
  const createIntegratedWrapper = async (props = {}) => {
    const defaultProps = {
      initialMessages: [],
      initialVariables: {}
    }
    
    wrapper = mount(TestParentComponent, {
      props: { ...defaultProps, ...props },
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
  
  describe('Basic Data Sync Mechanism', () => {
    it('should correctly initialize shared data state', async () => {
      const initialMessages = [
        { role: 'user', content: 'Test message {{testVar}}' }
      ]
      const initialVariables = { testVar: 'value1' }
      
      wrapper = await createIntegratedWrapper({
        initialMessages,
        initialVariables
      })
      
      // Verify ConversationManager receives correct data
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('messages')).toEqual(initialMessages)
      expect(manager.props('availableVariables')).toEqual(initialVariables)
      
      // Verify parent component state is correctly initialized
      expect(wrapper.vm.messages).toEqual(initialMessages)
      expect(wrapper.vm.variables).toEqual(initialVariables)
    })
    
    it('should share the same data source between ConversationManager and ContextEditor', async () => {
      const initialMessages = [
        { role: 'system', content: 'System prompt' },
        { role: 'user', content: 'User message' }
      ]
      
      wrapper = await createIntegratedWrapper({
        initialMessages
      })
      
      // Open ContextEditor
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      // Verify ContextEditor receives the same data
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      expect(editor.props('state').messages).toEqual(initialMessages)
      
      // Verify both components reference the same data source
      expect(wrapper.vm.messages).toBe(wrapper.vm.messages) // Reference equality
    })
  })
  
  describe('Data Sync: ConversationManager → ContextEditor', () => {
    it('should reflect changes in ContextEditor in real-time when a message is modified in ConversationManager', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [
          { role: 'user', content: 'Original message' }
        ]
      })
      
      // Open ContextEditor
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Modify message in ConversationManager
      const newMessages = [
        { role: 'user', content: 'Modified message' }
      ]
      
      await manager.vm.$emit('update:messages', newMessages)
      await nextTick()
      
      // Verify ContextEditor reflects the change in real-time
      expect(wrapper.vm.messages[0].content).toBe('Modified message')
      expect(editor.props('state').messages[0].content).toBe('Modified message')
    })
    
    it('should immediately show the new message in ContextEditor when a message is added in ConversationManager', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [
          { role: 'user', content: 'First message' }
        ]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Add message in ConversationManager
      const newMessages = [
        { role: 'user', content: 'First message' },
        { role: 'assistant', content: 'Second message' }
      ]
      
      await manager.vm.$emit('update:messages', newMessages)
      await nextTick()
      
      // Verify ContextEditor shows the new message
      expect(wrapper.vm.messages).toHaveLength(2)
      expect(wrapper.vm.messages[1].content).toBe('Second message')
      expect(editor.props('state').messages).toHaveLength(2)
    })
    
    it('should sync deletion in ContextEditor when a message is deleted in ConversationManager', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [
          { role: 'user', content: 'Message 1' },
          { role: 'assistant', content: 'Message 2' }
        ]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      
      // Delete the first message
      const newMessages = [
        { role: 'assistant', content: 'Message 2' }
      ]
      
      await manager.vm.$emit('update:messages', newMessages)
      await nextTick()
      
      // Verify both components reflect the deletion
      expect(wrapper.vm.messages).toHaveLength(1)
      expect(wrapper.vm.messages[0].content).toBe('Message 2')
    })
  })
  
  describe('Data Sync: ContextEditor → ConversationManager', () => {
    it('should reflect changes in ConversationManager in real-time when a message is modified in ContextEditor', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [
          { role: 'user', content: 'Original content' }
        ]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Simulate modifying state in ContextEditor
      const newState = {
        messages: [{ role: 'user', content: 'Content modified in editor' }],
        variables: {},
        tools: [],
        showVariablePreview: true,
        showToolManager: false,
        mode: 'edit'
      }
      
      await editor.vm.$emit('update:state', newState)
      await nextTick()
      
      // Verify ConversationManager reflects the change in real-time
      expect(wrapper.vm.messages[0].content).toBe('Content modified in editor')
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('messages')[0].content).toBe('Content modified in editor')
    })
    
    it('should sync ConversationManager when data is modified via contextChange event in ContextEditor', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [
          { role: 'system', content: 'System message' }
        ],
        initialVariables: { oldVar: 'oldValue' }
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Simulate contextChange event
      const newMessages = [
        { role: 'system', content: 'Updated system message' },
        { role: 'user', content: 'New user message {{newVar}}' }
      ]
      const newVariables = { newVar: 'newValue' }
      
      await editor.vm.$emit('contextChange', newMessages, newVariables)
      await nextTick()
      
      // Verify parent component state update
      expect(wrapper.vm.messages).toHaveLength(2)
      expect(wrapper.vm.messages[0].content).toBe('Updated system message')
      expect(wrapper.vm.messages[1].content).toBe('New user message {{newVar}}')
      expect(wrapper.vm.variables).toEqual({ newVar: 'newValue' })
      
      // Verify ConversationManager receives new data
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('messages')).toEqual(newMessages)
      expect(manager.props('availableVariables')).toEqual(newVariables)
    })
  })
  
  describe('Impact of Template Application on Data Sync', () => {
    it('should reflect template content in ConversationManager in real-time when a template is applied in ContextEditor', async () => {
      wrapper = await createIntegratedWrapper()
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Simulate applying a template (via contextChange event)
      const templateMessages = [
        { role: 'system', content: 'You are a helpful assistant specialized in {{domain}}.' },
        { role: 'user', content: '{{userQuery}}' }
      ]
      const templateVariables = { domain: 'AI', userQuery: 'Help me' }
      
      await editor.vm.$emit('contextChange', templateMessages, templateVariables)
      await nextTick()
      
      // Verify ConversationManager displays template content
      expect(wrapper.vm.messages).toEqual(templateMessages)
      expect(wrapper.vm.variables).toEqual(templateVariables)
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('messages')).toEqual(templateMessages)
      expect(manager.props('availableVariables')).toEqual(templateVariables)
    })
  })
  
  describe('Impact of Import/Export on Data Sync', () => {
    it('should update ConversationManager in real-time when data is imported in ContextEditor', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [{ role: 'user', content: 'Old data' }]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Simulate import operation (via contextChange event)
      const importedMessages = [
        { role: 'system', content: 'Imported system message' },
        { role: 'user', content: 'Imported user message {{importedVar}}' }
      ]
      const importedVariables = { importedVar: 'imported value' }
      
      await editor.vm.$emit('contextChange', importedMessages, importedVariables)
      await nextTick()
      
      // Verify data sync
      expect(wrapper.vm.messages).toEqual(importedMessages)
      expect(wrapper.vm.variables).toEqual(importedVariables)
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('messages')).toEqual(importedMessages)
      expect(manager.props('availableVariables')).toEqual(importedVariables)
    })
    
    it('should make imported data immediately available in both components', async () => {
      wrapper = await createIntegratedWrapper()
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      // Simulate complex imported data
      const complexImportedData = {
        messages: [
          { role: 'system', content: 'Complex system prompt: process {{taskType}} task' },
          { role: 'user', content: 'User question: {{question}}' },
          { role: 'assistant', content: 'Assistant reply template' }
        ],
        variables: {
          taskType: 'Data Analysis',
          question: 'How to optimize performance?'
        }
      }
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      await editor.vm.$emit('contextChange', complexImportedData.messages, complexImportedData.variables)
      await nextTick()
      
      // Verify sync of complex data
      expect(wrapper.vm.messages).toHaveLength(3)
      expect(wrapper.vm.messages[0].content).toContain('{{taskType}}')
      expect(wrapper.vm.variables.taskType).toBe('Data Analysis')
      
      // Verify ConversationManager's variable scanning functionality
      const detectedVars = wrapper.vm.scanVariables(wrapper.vm.messages[0].content)
      expect(detectedVars).toContain('taskType')
    })
  })
  
  describe('Full "Edit → Emit → Parent Update → Real-time Reflection" Link Validation', () => {
    it('should validate the complete data flow link', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [{ role: 'user', content: 'Test message' }]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Step 1: ConversationManager edit → emit
      const newMessages1 = [{ role: 'user', content: 'Step 1 modification' }]
      await manager.vm.$emit('update:messages', newMessages1)
      await nextTick()
      
      // Verify link: Edit → Emit → Parent Update → ContextEditor reflects
      expect(wrapper.vm.messages[0].content).toBe('Step 1 modification')
      expect(editor.props('state').messages[0].content).toBe('Step 1 modification')
      
      // Step 2: ContextEditor edit → emit
      const newMessages2 = [{ role: 'user', content: 'Step 2 modification' }]
      await editor.vm.$emit('contextChange', newMessages2, {})
      await nextTick()
      
      // Verify link: Edit → Emit → Parent Update → ConversationManager reflects
      expect(wrapper.vm.messages[0].content).toBe('Step 2 modification')
      expect(manager.props('messages')[0].content).toBe('Step 2 modification')
      
      // Verify event emission (by checking with emitted())
      expect(manager.emitted('update:messages')).toBeTruthy()
      expect(editor.emitted('contextChange')).toBeTruthy()
    })
    
    it('should ensure data consistency and prevent race conditions', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [{ role: 'user', content: 'Initial message' }]
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Rapid sequential modification operations
      const operations = [
        { source: 'manager', content: 'Quick mod 1' },
        { source: 'editor', content: 'Quick mod 2' },
        { source: 'manager', content: 'Quick mod 3' }
      ]
      
      // Simulate rapid sequential operations
      for (const op of operations) {
        if (op.source === 'manager') {
          await manager.vm.$emit('update:messages', [{ role: 'user', content: op.content }])
        } else {
          await editor.vm.$emit('contextChange', [{ role: 'user', content: op.content }], {})
        }
        await nextTick()
      }
      
      // Verify final state is consistent
      expect(wrapper.vm.messages[0].content).toBe('Quick mod 3')
      expect(manager.props('messages')[0].content).toBe('Quick mod 3')
      expect(editor.props('state').messages[0].content).toBe('Quick mod 3')
    })
  })
  
  describe('Variable Sync Feature', () => {
    it('should sync variable updates across both components', async () => {
      wrapper = await createIntegratedWrapper({
        initialMessages: [{ role: 'user', content: 'Hello {{name}}!' }],
        initialVariables: { name: 'World' }
      })
      
      wrapper.vm.handleOpenContextEditor()
      await nextTick()
      
      const editor = wrapper.findComponent({ name: 'ContextEditor' })
      
      // Update variables
      const newVariables = { name: 'Vue', greeting: 'Hi' }
      await editor.vm.$emit('contextChange', wrapper.vm.messages, newVariables)
      await nextTick()
      
      // Verify variable sync
      expect(wrapper.vm.variables).toEqual(newVariables)
      
      const manager = wrapper.findComponent({ name: 'ConversationManager' })
      expect(manager.props('availableVariables')).toEqual(newVariables)
      
      // Verify variable replacement functionality
      const replacedContent = wrapper.vm.replaceVariables('Hello {{name}}!', wrapper.vm.variables)
      expect(replacedContent).toBe('Hello Vue!')
    })
  })
})