// script.js
document.addEventListener('DOMContentLoaded',()=>{

  const acceptedAnswers = ['micaela','mais mais','amor'];
  const answerInput = document.getElementById('answer');
  const checkBtn = document.getElementById('checkBtn');
  const comeBtn = document.getElementById('comeBtn');
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');
  const init1 = document.getElementById('init1');
  const init2 = document.getElementById('init2');
  const checkInit = document.getElementById('checkInit');
  const bgm = document.getElementById('bgm');
  const balloonArea = document.getElementById('balloonArea');
  const goldHeart = document.getElementById('goldHeart');
  const photo3 = document.getElementById('photo3');
  const secret = document.getElementById('secret');

  function showScreen(n){
    [screen1,screen2,screen3].forEach(s=>s.classList.remove('active'));
    n.classList.add('active');
  }

  checkBtn.addEventListener('click',()=>{
    const v = answerInput.value.trim().toLowerCase();
    if(acceptedAnswers.includes(v)){
      // play bgm immediately and keep looping
      try{ bgm.play(); }catch(e){}
      comeBtn.classList.remove('hidden');
    } else {
      alert('Resposta errada. Tente novamente.');
    }
  });
  comeBtn.addEventListener('click',()=> showScreen(screen2));

  checkInit.addEventListener('click',()=>{
    const a = init1.value.trim().toUpperCase();
    const b = init2.value.trim().toUpperCase();
    if((a==='M' && b==='B') || (a==='B' && b==='M')){
      spawnBalloon();
    } else {
      alert('Iniciais inválidas. Página será fechada.');
      window.location.href = 'about:blank';
    }
  });

  function spawnBalloon(){
    showScreen(screen2);
    const div = document.createElement('div');
    div.className = 'balloon';
    div.innerHTML = `
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 464s-144-96-144-224a96 96 0 01192 0 96 96 0 01192 0c0 128-144 224-144 224z" fill="#ff6b6b" stroke="#b33" />
      </svg>
    `;
    balloonArea.appendChild(div);
    div.animate([{transform:'translate(-50%,0)'},{transform:'translate(-50%,-70vh)'}],{duration:3500,iterations:1,fill:'forwards'});
    setTimeout(()=>{ div.style.transform = 'translate(-50%,-70vh)'; div.title='Clique no balão'; },3600);
    div.addEventListener('click',()=> {
      explodeHearts();
      setTimeout(()=> showScreen(screen3), 1500);
    });
  }

  function explodeHearts(){
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const particles = [];
    const colors = ['#ff6b6b','#ff9aa2','#ffd6a5','#c4f1be','#ffd1dc'];
    for(let i=0;i<80;i++){
      particles.push({
        x: innerWidth/2 + (Math.random()-0.5)*200,
        y: innerHeight/2 + (Math.random()-0.5)*200,
        vx: (Math.random()-0.5)*8,
        vy: (Math.random()-6),
        size: 10+Math.random()*12,
        color: colors[Math.floor(Math.random()*colors.length)],
        life: 80+Math.random()*40
      });
    }
    function loop(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life--;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.bezierCurveTo(p.x - 10*p.size/6, p.y - 10*p.size/6, p.x - 10*p.size/6, p.y + 10*p.size/6, p.x, p.y + 12*p.size/6);
        ctx.bezierCurveTo(p.x + 10*p.size/6, p.y + 10*p.size/6, p.x + 10*p.size/6, p.y - 10*p.size/6, p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      if(particles.some(p=>p.life>0)) requestAnimationFrame(loop);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    loop();
  }

  goldHeart.addEventListener('click', ()=>{
    photo3.classList.remove('hidden');
    secret.classList.remove('hidden');
  });

  answerInput.addEventListener('keydown', e=>{ if(e.key==='Enter') checkBtn.click(); });
  init2.addEventListener('keydown', e=>{ if(e.key==='Enter') checkInit.click(); });

});
