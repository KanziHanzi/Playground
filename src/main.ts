// import "src/sketches/audioVisualizer";
// import "src/sketches/mouseTrail";
// import "src/sketches/sineWave";
// import "src/sketches/particleBomb";
// import "src/sketches/loadingIndicator"
// import "src/sketches/perlinNoiseTrajectory";
// import "src/sketches/perlinNoiseFlowField";
// import "src/sketches/primeSpiral"
// import "src/sketches/shatteredGlas";

const routes = {
  "/": "index.html",
  "/shatteredGlas": "src/sketches/shatteredGlas/index.html",
};

const navigate = (event: Event) => {
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);
  handleRoute();
};

const handleRoute = async () => {
  const path = window.location.pathname;
  const route: string = routes[path];
  const html = await fetch(route);

  const test = await html.text();

  document.querySelector("html").innerHTML = test;
};

window.navigate = navigate;
window.onpopstate = handleRoute;

handleRoute();
