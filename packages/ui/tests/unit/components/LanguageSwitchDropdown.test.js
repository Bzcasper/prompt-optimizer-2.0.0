import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import LanguageSwitchDropdown from '../../../src/components/LanguageSwitchDropdown.vue'

// Mock Naive UI components
vi.mock('naive-ui', () => ({
  NButton: {
    name: 'NButton',
    template: '<button><slot name="icon"></slot><slot></slot></button>'
  },
  NDropdown: {
    name: 'NDropdown',
    template: '<div><slot></slot></div>',
    emits: ['select'],
    props: ['options', 'placement', 'trigger']
  }
}))

// Simple test i18n instance
const createTestI18n = () => createI18n({
  legacy: false,
  locale: 'en-US',
  messages: {
    'zh-CN': {},
    'zh-TW': {},
    'en-US': {}
  }
})

// Mock service injection
const mockServices = {
  value: {
    preferenceService: {
      get: vi.fn().mockResolvedValue('en-US'),
      set: vi.fn().mockResolvedValue(true)
    }
  }
}

describe('LanguageSwitchDropdown', () => {
  let wrapper
  let i18n

  beforeEach(() => {
    i18n = createTestI18n()
    vi.clearAllMocks()
  })

  const createWrapper = (props = {}) => {
    return mount(LanguageSwitchDropdown, {
      global: {
        plugins: [i18n],
        provide: {
          services: mockServices
        }
      },
      props
    })
  }

  describe('Core Functionality', () => {
    it('should render the component correctly', () => {
      wrapper = createWrapper()
      expect(wrapper.vm).toBeDefined()
    })

    it('should contain the correct language options', () => {
      wrapper = createWrapper()
      const vm = wrapper.vm
      expect(vm.availableLanguages).toHaveLength(3)
      expect(vm.availableLanguages[0].key).toBe('zh-CN')
      expect(vm.availableLanguages[1].key).toBe('zh-TW')
      expect(vm.availableLanguages[2].key).toBe('en-US')
    })

    it('should be able to call the language switch method', async () => {
      wrapper = createWrapper()
      const vm = wrapper.vm

      // Only verify that the method can be called, not the specific switching logic
      expect(typeof vm.handleLanguageSelect).toBe('function')
      await vm.handleLanguageSelect('en-US')
      expect(mockServices.value.preferenceService.set).toHaveBeenCalled()
    })
  })
})