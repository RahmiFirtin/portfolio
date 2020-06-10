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
    
    findItem(items) {
        let title = document.location.search;
        let currentItem = items.find(item => {
            let newItem = `?${item.queryTitle}`;
            return newItem == title;
        });
        this.displayItem(currentItem);
    }

    displayItem(currentItem) {
        let portfolioMain = document.querySelector("#porfolio-main");
        let portfolioItem = `
            <div class="porfolio-container">
            <p class="portfolio-title">${currentItem.title}</p>
            <div class="portfolio-image-container">
                <img src="${currentItem.image}" alt="${currentItem.title}">
            </div>
            <p class="portfolio-description">${currentItem.description}</p>
            <p class="portfolio-programme">${currentItem.programme}</p>
        </div>
        `;
        portfolioMain.innerHTML = portfolioItem;
        this.deleteEmptyElements(currentItem);
    }

    deleteEmptyElements(currentItem) {        
        let portfolioContainer = document.querySelector(".porfolio-container");
        let portfolioDescription = document.querySelector(".portfolio-description");
        let portfolioProgramme = document.querySelector(".portfolio-programme");

        if(currentItem.description == undefined) {
            portfolioContainer.removeChild(portfolioDescription);            
        }
        if(currentItem.programme == undefined) {
            portfolioContainer.removeChild(portfolioProgramme);
        }        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const portfolioJSON = new Portfolio();
    const ui = new UI();

    portfolioJSON.getPortfolio()
    .then(items => {
        ui.findItem(items);
        ui.activeMenu();        
    });
});