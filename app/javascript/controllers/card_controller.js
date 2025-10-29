import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["card"]
  static classes = ["hover"]

  connect() {
    this.addKeyboardSupport()
  }

  addKeyboardSupport() {
    this.cardTargets.forEach(card => {
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.activateCard(card)
        }
      })
    })
  }

  activateCard(card) {
    // Create ripple effect or any visual feedback
    card.style.transform = 'scale(0.98)'
    setTimeout(() => {
      card.style.transform = ''
    }, 150)
  }

  disconnect() {
    this.cardTargets.forEach(card => {
      card.removeEventListener('keydown', this.activateCard)
    })
  }
}