import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dashboard"
export default class extends Controller {
  static targets = ["mobileMenu", "menuIcon", "closeIcon"]

  connect() {
    console.log("Dashboard controller connected")
  }

  toggleMobileMenu() {
    // Toggle mobile menu visibility
    this.mobileMenuTarget.classList.toggle("hidden")

    // Toggle menu icons
    this.menuIconTarget.classList.toggle("hidden")
    this.closeIconTarget.classList.toggle("hidden")

    // Optional: Prevent body scroll when menu is open
    if (!this.mobileMenuTarget.classList.contains("hidden")) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  // Close mobile menu when clicking outside or on a link
  closeMobileMenu() {
    if (!this.mobileMenuTarget.classList.contains("hidden")) {
      this.toggleMobileMenu()
    }
  }

  // Smooth scroll to anchor links
  scrollToSection(event) {
    const href = event.currentTarget.getAttribute("href")

    if (href && href.startsWith("#")) {
      event.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close mobile menu if open
        this.closeMobileMenu()

        // Smooth scroll to element
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    }
  }

  disconnect() {
    // Clean up when controller is disconnected
    document.body.style.overflow = ""
  }
}
