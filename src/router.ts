interface Routes {
  [index: string]: string;
}

const routes: Routes = {
  "/": "index.html",
  "/shatteredGlas": "src/sketches/shatteredGlas/index.html",
  "/primeSpiral": "src/sketches/primeSpiral/index.html",
  "/sineWave": "src/sketches/sineWave/index.html",
  "/perlinNoiseTrajectory": "src/sketches/perlinNoiseTrajectory/index.html",
  "/perlinNoiseFlowField": "src/sketches/perlinNoiseFlowField/index.html",
  "/particleBomb": "src/sketches/particleBomb/index.html",
  "/mouseTrail": "src/sketches/mouseTrail/index.html",
  "/loadingIndicator": "src/sketches/loadingIndicator/index.html",
  "/audioVisualizer": "src/sketches/audioVisualizer/index.html",
};

const navigate = (event: Event) => {
  event.preventDefault();
  const { target } = event;

  if (!target) return;

  window.history.pushState({}, "", (target as HTMLAnchorElement).href);
  handleRoute();
};

const handleRoute = async () => {
  const path = window.location.pathname;
  const route: string = routes[path];
  const html = await fetch(route);

  const test = await html.text();

  const pageHtml = document.querySelector("html");

  if (!pageHtml) return;

  pageHtml.innerHTML = test;

  // guard close for home path as no sketch exists for that path
  if (path === "/") return;

  // import the sketch associated to the current route
  await import(/* @vite-ignore */ `/src/sketches${path}/index.ts`);
};

declare interface Window {
  navigate: (event: Event) => void;
}

window.navigate = navigate;
window.onpopstate = handleRoute;

await handleRoute();

declare interface Window {
  navigate: (event: Event) => void;
}

const navigation = document.querySelector(".navigation");

navigation?.addEventListener("scroll", () => {
  console.log(navigation.scrollTop);
});
