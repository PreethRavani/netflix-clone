// Move scrollCarousel function to global scope with better error handling
function scrollCarousel(direction) {
  const carousel = document.querySelector(".trending-carousel")
  if (!carousel) {
    console.error("Carousel not found")
    return
  }

  const scrollAmount = 220 // width of item + gap
  const currentScroll = carousel.scrollLeft

  if (direction === "next") {
    carousel.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: "smooth",
    })
  } else {
    carousel.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: "smooth",
    })
  }
}

// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for carousel navigation with better error handling
  const carouselNext = document.querySelector(".carousel-nav.next")
  if (carouselNext) {
    carouselNext.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Carousel next button clicked") // Debug log
      scrollCarousel("next")
    })
  } else {
    console.error("Carousel navigation button not found")
  }

  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  // Email validation
  const emailInputs = document.querySelectorAll(".email-input")
  const getStartedBtns = document.querySelectorAll(".get-started-btn")

  getStartedBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const email = emailInputs[index].value

      if (validateEmail(email)) {
        // Simulate redirect to sign up
        alert("Redirecting to sign up...")
      } else {
        alert("Please enter a valid email address.")
        emailInputs[index].focus()
      }
    })
  })

  // Smooth scrolling for better UX
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe feature sections
  document.querySelectorAll(".feature-section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  // Header background on scroll
  const header = document.querySelector(".header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.9)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)"
      header.style.backdropFilter = "none"
    }

    lastScrollY = currentScrollY
  })

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Language selector functionality
  const languageSelects = document.querySelectorAll(".language-select")
  languageSelects.forEach((select) => {
    select.addEventListener("change", (e) => {
      // Simulate language change
      console.log("Language changed to:", e.target.value)
    })
  })

  // Sign in button functionality
  const signInBtn = document.querySelector(".sign-in-btn")
  if (signInBtn) {
    signInBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // Simulate redirect to sign in page
      alert("Redirecting to sign in page...")
    })
  }

  // Add loading animation to buttons
  function addLoadingState(button) {
    const originalText = button.textContent
    button.textContent = "Loading..."
    button.disabled = true

    setTimeout(() => {
      button.textContent = originalText
      button.disabled = false
    }, 2000)
  }

  // Enhanced email input experience
  emailInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused")
    })

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const getStartedBtn = input.parentElement.querySelector(".get-started-btn")
        if (getStartedBtn) {
          getStartedBtn.click()
        }
      }
    })
  })

  // Auto-hide carousel navigation on mobile
  function updateCarouselNav() {
    const nav = document.querySelector(".carousel-nav")
    if (window.innerWidth <= 768) {
      if (nav) nav.style.display = "none"
    } else {
      if (nav) nav.style.display = "flex"
    }
  }

  window.addEventListener("resize", updateCarouselNav)
  updateCarouselNav() // Call immediately
})

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 1000) {
  element.style.animation = `${animation} ${duration}ms ease-out`

  setTimeout(() => {
    element.style.animation = ""
  }, duration)
}

// Device detection for enhanced mobile experience
function isMobile() {
  return window.innerWidth <= 768
}

// Optimize animations for mobile
if (isMobile()) {
  document.body.classList.add("mobile")

  // Reduce motion for better performance on mobile
  const style = document.createElement("style")
  style.textContent = `
        @media (max-width: 768px) {
            *, *::before, *::after {
                animation-duration: 0.3s !important;
                animation-delay: 0s !important;
                transition-duration: 0.3s !important;
            }
        }
    `
  document.head.appendChild(style)
}
