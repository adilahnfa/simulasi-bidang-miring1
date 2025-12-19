const g = 9.81;

function runSimulation() {
  const theta = parseFloat(document.getElementById("theta").value) * Math.PI / 180;
  const mu_s = parseFloat(document.getElementById("mu_s").value);
  const mu_k = parseFloat(document.getElementById("mu_k").value);

  const a_analytic = g * (Math.sin(theta) - mu_k * Math.cos(theta));
  const startCondition = Math.tan(theta) > mu_s;

  let info = document.getElementById("info");

  if (!startCondition) {
    info.innerHTML = "Benda TIDAK bergerak (gaya gesek statis lebih besar).";
    return;
  }

  info.innerHTML = "Benda bergerak. Percepatan analitik = " + a_analytic.toFixed(2) + " m/s²";

  // Simulasi numerik (Euler & RK4)
  let dt = 0.02;
  let tMax = 3;

  let xE = 0, vE = 0;
  let xR = 0, vR = 0;

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  for (let t = 0; t <= tMax; t += dt) {

    // Euler
    vE += a_analytic * dt;
    xE += vE * dt;

    // Runge-Kutta 4
    let k1v = a_analytic * dt;
    let k1x = vR * dt;

    let k2v = a_analytic * dt;
    let k2x = (vR + 0.5 * k1v) * dt;

    let k3v = a_analytic * dt;
    let k3x = (vR + 0.5 * k2v) * dt;

    let k4v = a_analytic * dt;
    let k4x = (vR + k3v) * dt;

    vR += (k1v + 2*k2v + 2*k3v + k4v) / 6;
    xR += (k1x + 2*k2x + 2*k3x + k4x) / 6;

    let px = t / tMax * canvas.width;
    let py = canvas.height - xR * 50;

    ctx.lineTo(px, py);
  }

  ctx.stroke();
}
