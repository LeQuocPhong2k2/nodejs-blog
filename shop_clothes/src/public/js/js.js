const img = document.querySelectorAll(".rounded");
img.forEach(function(element) {
    element.addEventListener("click", () => {
        document.getElementById("main-img").src = element.getAttribute("src");
    });
});