import { showNotification, validateForm } from "../script.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  const submitButton = form.querySelector("#submit-btn");
  const submitButtonText = submitButton.textContent;
  let completedRecaptcha = false;

  submitButton.disabled = false;

  function recaptchaDataCallback(data) {
    // fetch(`https://flask-mailer-04f370a78f42.herokuapp.com/get-recaptcha-res`, {
    fetch(`http://127.0.0.1:5000/get-recaptcha-res`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: data }),
    })
      .then(async (res) => {
        const results = await res.json();
        completedRecaptcha = results.success;
      })
      .catch(() => {
        grecaptcha.reset();
      });
  }

  function recaptchaExpiredCallback() {
    completedRecaptcha = false;
  }

  window.recaptchaDataCallback = recaptchaDataCallback;
  window.recaptchaExpiredCallback = recaptchaExpiredCallback;

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const [isValid, hasMissingFields, hasMalformedEmail] = validateForm();
    if (!isValid) {
      const messageArray = [];
      if (hasMissingFields) {
        messageArray.push("Fill out all required fields.");
      }
      if (hasMalformedEmail) {
        messageArray.push("Please enter a valid email.");
      }
      const message = messageArray.join(`\n`);
      return showNotification(message, "error");
    }

    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0 || !completedRecaptcha) {
      showNotification("Please complete the reCAPTCHA verification.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitForm();
  });

  function submitForm() {
    const formData = new FormData(form);
    const emailData = Object.fromEntries(formData.entries());

    if (emailData["g-recaptcha-response"]) {
      delete emailData["g-recaptcha-response"];
    }

    // fetch("https://flask-mailer-04f370a78f42.herokuapp.com/send", {
    fetch("http://127.0.0.1:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    })
      .then(async (response) => {
        if (response.ok) {
          form.reset();
          grecaptcha.reset();
          showNotification(
            `Thank you! Your Salesforce assessment request has been sent. We\'ll contact you soon.`,
            "success",
            10000
          );
        } else {
          showNotification(
            "Failed to send message. Please try again later.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        showNotification(
          "There was a problem sending the email. Please try again later.",
          "error"
        );
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = submitButtonText;
      });
  }
});
