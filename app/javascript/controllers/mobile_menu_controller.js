import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "button", "overlay"]
  static classes = ["open", "closed"]

  connect() {
    this.isOpen = false
    this.lockBodyScroll(false)
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.isOpen = true
    this.menuTarget.classList.remove(this.closedClass)
    this.menuTarget.classList.add(this.openClass)
    this.buttonTarget.classList.add("is-active")

    if (this.hasOverlayTarget) {
      this.overlayTarget.classList.remove("hidden")
      this.overlayTarget.classList.add("fade-in")
    }

    this.lockBodyScroll(true)
    this.setAttribute(this.buttonTarget, "aria-expanded", "true")
  }

  close() {
    this.isOpen = false
    this.menuTarget.classList.remove(this.openClass)
    this.menuTarget.classList.add(this.closedClass)
    this.buttonTarget.classList.remove("is-active")

    if (this.hasOverlayTarget) {
      this.overlayTarget.classList.add("hidden")
      this.overlayTarget.classList.remove("fade-in")
    }

    this.lockBodyScroll(false)
    this.setAttribute(this.buttonTarget, "aria-expanded", "false")
  }

  closeOnEscape(event) {
    if (event.key === "Escape" && this.isOpen) {
      this.close()
    }
  }

  closeOnOutsideClick(event) {
    if (this.isOpen && !this.menuTarget.contains(event.target) && !this.buttonTarget.contains(event.target)) {
      this.close()
    }
  }

  lockBodyScroll(lock) {
    if (lock) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }

  setAttribute(element, attribute, value) {
    element.setAttribute(attribute, value)
  }

  disconnect() {
    this.lockBodyScroll(false)
  }
}