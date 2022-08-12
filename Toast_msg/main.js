const $ = document.querySelector.bind(document);

function toast({
    title = "",
    message = "",
    type = "",
    icon = "",
    duration = 3000,
}) {
    const main = $(".toast-container");
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);
    const autoremove = setTimeout(() => {
        main.removeChild(toast);
    }, duration + 300);
    const delay = (duration / 1000).toFixed(2);
    toast.style.animation = `left ease 0.3s, right linear 0.3s ${delay}s forwards`;
    toast.onclick = (e) => {
        if (e.target.closest(".toast__close")) {
            toast.style.animation = "right2 ease 0.3s forwards";
            setTimeout(function () {
                main.removeChild(toast);
            }, 300);
            clearTimeout(autoremove);
        }
    };
    if (main) {
        toast.innerHTML = `
                <div class="toast__icon"><i class="${icon}"></i></div>
                <div class="toast__info">
                    <h2 class="toast__title">${title}</h2>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
        `;
        main.appendChild(toast);
    }
}
const show__seccess = $("#success");
const show__error = $("#error");
show__seccess.onclick = function (e) {
    toast({
        title: "Thành công",
        message: "Bạn đã đăng nhập thành công",
        type: "success",
        icon: "fa-solid fa-check",
        duration: 5000,
    });
    console.log(e);
};
show__error.onclick = function () {
    toast({
        title: "Thất bại",
        message: "Bạn đã đăng nhập không thành công",
        type: "error",
        icon: "fa-solid fa-exclamation",
        duration: 5000,
    });
};
