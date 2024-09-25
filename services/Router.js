const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        // Different ways to get the href property on the links
        // const url1 = link.href
        // const url = event.target.href
        const url = link.getAttribute("href");
        Router.go(url);
      });
    });

    // Event handler for URL changes
    window.addEventListener("popstate", (event) => {
      // Use the route prop on the state from the pushState, don't add the back page to history
      Router.go(event.state.route, false);
    });

    // Go to the initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
        // Creating a new web-component that we've defined
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramId;
        }
    }

    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scroll(0, 0);
    } else {
      // 404 error on client-side
    }
  },
};

export default Router;
