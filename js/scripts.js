// Removes span element
const removeSpan = (parent, span) => {
  parent.removeChild(span);
};

//Creates span element if exists
const createSpan = (parent, spanElement) => {
  const input = parent.firstElementChild;
  if (!spanElement) {
    spanElement = document.createElement("span");
    parent.appendChild(spanElement);
  }
  if (input.type === "password" && input.value.length >= 1) {
    spanElement.textContent = `${input.id} must contain atleast 8 characters`;
  } else if (
    input.type === "email" &&
    input.value.length >= 1 &&
    !input.validity.valid
  ) {
    spanElement.textContent = "Looks like this is not an email";
  } else {
    spanElement.textContent = `${input.id} cannot be empty`;
  }
};

//Input validation
const validate = (input) => {
  const value = input.value;
  const len = value.length;
  const parent = document.querySelector(`label[for=${input.id}]`);
  const span = parent.querySelector("span");
  const mains = document.querySelector("main");
  const minimum = { text: 1, password: 8 };
  if (input.type === "email" && input.validity.valid && len >= 1) {
    if (span) removeSpan(parent, span);
    parent.classList.remove("invalid");
    mains.classList.remove("expand");
    return true;
  }
  if (len >= minimum[input.type]) {
    if (span) removeSpan(parent, span);
    parent.classList.remove("invalid");
    mains.classList.remove("expand");
    return true;
  }
  parent.classList.add("invalid");
  mains.classList.add("expand");
  createSpan(parent, span);
};

//Validation of all inputs using for inorder to get final output in boolean
const validateAll = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (!validate(inputs[i])) {
      return false;
    }
  }
  return true;
};

// main function
const main = () => {
  const button = document.querySelector("button.cta"); //submit button
  const name = document.querySelectorAll(".name"); //type="text"
  const inputs = document.querySelectorAll("input"); //all inputs
  const password = document.getElementById("password"); //password
  const email = document.getElementById("email"); //email
  const keys = [13, 8, 9, 32, 35, 36, 37, 38, 39, 40]; // allowed keys in input[text]
  const modal = document.querySelector("div.modal"); //modal
  const form = document.querySelector("form"); //form

  //for first-name and last-name (key restriction) - only alphabets
  name.forEach((item) => {
    item.addEventListener("keydown", (e) => {
      if (
        !(
          keys.indexOf(e.keyCode) != -1 ||
          (e.keyCode >= 65 && e.keyCode <= 90) ||
          (e.keyCode >= 97 && e.keyCode <= 122) ||
          (e.keyCode === 189 && e.shiftKey === false && item.value.length)
        )
      )
        e.preventDefault();
    });
  });

  //for all inputs - avoid pasting
  inputs.forEach((item) => {
    item.addEventListener("paste", (e) => {
      e.preventDefault();
    });
  });

  //password - no space character
  password.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) e.preventDefault();
  });

  //email - no number and space and hyphen at start
  email.addEventListener("keydown", (e) => {
    if (
      e.keyCode === 32 ||
      (((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 189) &&
        !email.value.length)
    )
      e.preventDefault();
  });

  //submit button listener
  button.addEventListener("click", (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      validate(input);
    });
    if (validateAll(inputs)) {
      button.setAttribute("disabled", "disabled");
      button.textContent = "claimed";
      modal.classList.add("view");
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target.className === "modal view") modal.classList.remove("view");
    form.reset();
    button.removeAttribute("disabled");
    button.textContent = "Claim your free trial";
  });
};

//calling main function

main();
