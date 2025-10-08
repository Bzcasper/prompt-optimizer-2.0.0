import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { ActionButtonUI, ContentCardUI } from '../../src'

// Create i18n instance (createLocalVue is not needed for Vue 3)
const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  messages: {}
})

describe('Basic UI Component Tests', () => {
  describe('ActionButtonUI', () => {
    it('should render button text correctly', () => {
      const buttonText = 'Test Button'
      const wrapper = mount(ActionButtonUI, {
        global: {
          plugins: [i18n] // Use i18n plugin directly
        },
        props: {
          text: buttonText,
          icon: '🔄'
        }
      })
      expect(wrapper.text()).toContain(buttonText)
    })

    it('should handle loading state correctly', async () => {
      const wrapper = mount(ActionButtonUI, {
        global: {
          plugins: [i18n] // Add i18n plugin
        },
        props: {
          text: 'Test Button',
          icon: '🔄',
          loading: false
        }
      })
      
      // Initial state is not loading
      expect(wrapper.props('loading')).toBe(false)
      
      // Change to loading state
      await wrapper.setProps({ loading: true })
      expect(wrapper.props('loading')).toBe(true)
    })
  })

  describe('ContentCardUI', () => {
    it('should render slot content correctly', () => {
      const slotContent = 'Test Content'
      const wrapper = mount(ContentCardUI, {
        slots: {
          default: slotContent
        }
      })
      expect(wrapper.text()).toContain(slotContent)
    })
  })
})