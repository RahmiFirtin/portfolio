let activeMenu = () => {
    const menuButton = document.querySelector("#menu-button");
    const navbar = document.querySelector("nav");
    const menu = document.querySelector(".menu");
    menuButton.addEventListener("click", () => {
        if(menuButton.firstElementChild.classList.contains("fa-bars")) {
            navbar.classList.toggle("transparentBcg");
            menu.classList.toggle("showMenu");
            menuButton.firstElementChild.classList.remove("fa-bars");
            menuButton.firstElementChild.classList.add("fa-times");
            //window.open('mailto:test@example.com');
            //window.open('mailto:test@example.com?subject=subject&body=body');
        } else {
            navbar.classList.toggle("transparentBcg");
            menu.classList.toggle("showMenu");
            menuButton.firstElementChild.classList.add("fa-bars");
            menuButton.firstElementChild.classList.remove("fa-times");
        }
    });
}
activeMenu();