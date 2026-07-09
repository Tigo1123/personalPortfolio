const themebutton = document.querySelector(".theme-toggle");
const savetheme = localStorage.getItem("theme");
const meaubutton = document.querySelector(".menu-toggle");
const navlink = document.querySelector(".nav-links");
const sections = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

sections.forEach(function (section) {
  observer.observe(section);
});

if (savetheme === "dark") {
  document.body.classList.add("dark-mode");
  themebutton.textContent = "☀️";
}
meaubutton.addEventListener("click", function () {
  navlink.classList.toggle("active");
});
themebutton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
  if (document.body.classList.contains(".dark-mode")) {
    themebutton.textContent = "☀️";
  } else {
    themebutton.textContent = "🌙";
  }
});
