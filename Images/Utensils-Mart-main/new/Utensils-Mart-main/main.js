/* Shared optional page behaviours. Guard optional elements so one page cannot break another. */
(() => {
  const a1 = document.getElementById("a1");
  const a2 = document.getElementById("a2");
  if (a1 && a2) {
    a2.style.display = "none";
    window.setTimeout(() => {
      a1.style.display = "none";
      a2.style.display = "block";
    }, 1500);
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      const fields = ["name", "email", "subject", "message"].map(id => document.getElementById(id));
      if (fields.some(field => !field || !field.value.trim())) {
        event.preventDefault();
        alert("Please fill out all the fields.");
        return;
      }
      const email = document.getElementById("email");
      if (email && !email.checkValidity()) {
        event.preventDefault();
        alert("Please enter a valid email address.");
      }
    });
  }
})();
