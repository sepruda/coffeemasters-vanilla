export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  // Clone and append the web component on mount
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("app-menu-changed", () => {
      this.render();
    });

    this.render();
  }

  render() {
    if (app.store.menu) {
      const menu = this.root.querySelector("#menu");
      // Clear previous content to not have Loading still there
      menu.innerHTML = "";

      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
                        <h3>${category.name}</h3>
                        <ul class="category">
                        </ul>
                    `;
        menu.appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement("product-item");

          // One way to do it, could also use an id
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      menu.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
