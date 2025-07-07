// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
      target.setAttribute("tabindex", "-1"); // Allow focus for accessibility
      target.focus();
    }
  });
});

// Back-to-top button behavior
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form validation with accessibility alerts
const form = document.querySelector("form");
form.addEventListener("submit", e => {
  const emailField = document.querySelector("input[type='email']");
  const messageField = document.querySelector("textarea");
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  // Clear previous ARIA live messages
  let errorBox = document.getElementById("formError");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.id = "formError";
    errorBox.setAttribute("aria-live", "assertive");
    errorBox.setAttribute("role", "alert");
    errorBox.style.color = "red";
    form.prepend(errorBox);
  } else {
    errorBox.textContent = "";
  }

  if (!email || !message) {
    e.preventDefault();
    errorBox.textContent = "Please fill out both fields before submitting.";
    emailField.setAttribute("aria-invalid", !email);
    messageField.setAttribute("aria-invalid", !message);
  } else {
    emailField.removeAttribute("aria-invalid");
    messageField.removeAttribute("aria-invalid");
  }
});


