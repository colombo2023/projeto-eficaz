function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}


setInterval(updateClock, 1000);


updateClock();


//anuncio jbl
const redBlue = document.querySelector('#redBlue');
const bluePink = document.querySelector('#bluePink');

const selectedImg = document.createElement('img');
selectedImg.src = 'img/seleciona.svg';
selectedImg.style.width = '100%';
document.body.appendChild(selectedImg);
redBlue.appendChild(selectedImg);

bluePink.addEventListener('click', () => {
    document.querySelector('.carousel').style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    document.querySelector('.carousel').style.transform = 'translateY(-40%)';
    
    bluePink.appendChild(selectedImg);
});

redBlue.addEventListener('click', () => {
    document.querySelector('.carousel').style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    document.querySelector('.carousel').style.transform = 'translateY(50%)';

    redBlue.appendChild(selectedImg);
});

