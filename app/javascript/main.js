let burger = document.querySelector(".burger");
let burgerContent = document.querySelector(".burgerContent");
let isOpen = false;

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    isOpen = !isOpen;

    if (isOpen) {
        burgerContent.style.display = "block";
        burgerContent.style.width = "0";
        burgerContent.style.height = "100%";
        burgerContent.style.background = "black";
        burgerContent.style.position = "fixed";
        burgerContent.style.inset = "0";
        burgerContent.style.zIndex = "100";
        burger.style.zIndex = "101";
        animate(0, 100);
    } else {
        animate(100, 0, () => {
            burgerContent.style.display = "none";
            burgerContent.style.width = "100%";
            burgerContent.style.height = "0";
            burgerContent.style.background = "none";
            burgerContent.style.position = "static";
            burgerContent.style.inset = "auto";
            burger.style.zIndex = "99";
        });
    }
});

function animate(from, to, onFinish = null) {
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        burgerContent.style.width = `${(progress / 300) * (to - from) + from}%`;

        if (progress < 300) {
            window.requestAnimationFrame(step);
        } else {
            if (onFinish) onFinish();
        }
    }

    window.requestAnimationFrame(step);
}

const lines = burger.querySelectorAll("span");

burger.addEventListener("click", () => {
    lines.forEach((line, index) => {
        line.classList.toggle("active");

        if (line.classList.contains("active")) {
            switch (index) {
                case 0:
                    line.style.transform = "rotate(45deg)";
                    break;
                case 1:
                    line.style.opacity = 0;
                    break;
                case 2:
                    line.style.transform = "rotate(-45deg)";
                    line.style.position = "relative";
                    line.style.top = "-23px";
                    break;
            }
        } else {
            switch (index) {
                case 0:
                    line.style.transform = "rotate(0)";
                    break;
                case 1:
                    line.style.opacity = 1;
                    break;
                case 2:
                    line.style.transform = "rotate(0)";
                    line.style.position = "static";
                    break;
            }
        }
    });
});
