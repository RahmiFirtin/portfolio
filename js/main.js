const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "41i8ouqgl3nv",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "6oJL8TLZ1FaQP54oolcbhGGByYE3LjHGxtOL6DPEqXI"
});

class Portfolio {
    async getPortfolio() {

        let contentful = await client.getEntries({
            content_type: 'portfolio'
        });        
        let items = contentful.items;
        items = items.map(item => {
            let queryTitle = item.fields.queryTitle;
            let title = item.fields.title;
            let description = item.fields.description;
            let programme = item.fields.programme;
            let mainImage = item.fields.mainImage.fields.file.url;
            let image = item.fields.image.fields.file.url;
            return {queryTitle, title, description, programme, mainImage, image};
        });
        return items;
    }
}

class UI {

    activeMenu() {
        const menuButton = document.querySelector("#menu-button");
        const navbar = document.querySelector("nav");
        const menu = document.querySelector(".menu");
        menuButton.addEventListener("click", () => {
            if(menuButton.firstElementChild.classList.contains("fa-bars")) {
                navbar.classList.toggle("transparentBcg");
                menu.classList.toggle("showMenu");
                menuButton.firstElementChild.classList.remove("fa-bars");
                menuButton.firstElementChild.classList.add("fa-times");
            } else {
                navbar.classList.toggle("transparentBcg");
                menu.classList.toggle("showMenu");
                menuButton.firstElementChild.classList.add("fa-bars");
                menuButton.firstElementChild.classList.remove("fa-times");
            }
        });    
    }
    
    displayCarts(items) {
         const portfolio = document.querySelector(".portfolio");
         let portfolioItem = "";
         items.forEach(item => {
            portfolioItem += 
            `
            <div class="portfolio-item">
                <a href="portfolio.html?${item.queryTitle}">
                    <img class="portfolio-item-image" src="${item.mainImage}" alt="${item.title}">
                </a>
            </div>
            `
         });
         portfolio.innerHTML = portfolioItem;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const portfolioJSON = new Portfolio();
    const ui = new UI();

    portfolioJSON.getPortfolio()
    .then(items => { 
        ui.activeMenu();
        ui.displayCarts(items);
        
    });
});
