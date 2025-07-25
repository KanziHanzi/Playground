const buildMode = import.meta.env.MODE;

interface Routes {
  [index: string]: string;
}

const routes: Routes = {
  "/": "index.html",
  shatteredGlas: "src/sketches/shatteredGlas/index.html",
  primeSpiral: "src/sketches/primeSpiral/index.html",
  sineWave: "src/sketches/sineWave/index.html",
  perlinNoiseTrajectory: "src/sketches/perlinNoiseTrajectory/index.html",
  perlinNoiseFlowField: "src/sketches/perlinNoiseFlowField/index.html",
  particleBomb: "src/sketches/particleBomb/index.html",
  mouseTrail: "src/sketches/mouseTrail/index.html",
  loadingIndicator: "src/sketches/loadingIndicator/index.html",
  audioVisualizer: "src/sketches/audioVisualizer/index.html",
  infiniteTerrain: "src/sketches/infiniteTerrain/index.html",
};

const handleRoute = async () => {
  let path = window.location.hash.replace("#", "");

  if (path.length === 0) {
    path = "/"; // base path when loading the page
  }

  const route: string = routes[path];
  const html = await fetch(route);

  const routeMarkup = await html.text();

  const pageHtml = document.querySelector("html");

  if (!pageHtml) return;

  pageHtml.innerHTML = routeMarkup;

  // guard close for home path as no sketch exists for that path
  if (path === "/") return;

  // import the sketch associated to the current route
  if (buildMode === "production") {
    await import(`/src/sketches/${path}/index.js`);
  } else {
    await import(`/src/sketches/${path}/index.ts`);
  }
};

window.addEventListener("hashchange", handleRoute);

handleRoute();
