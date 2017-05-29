

document.addEventListener("DOMContentLoaded",(e)=>{
    let newTop = null;
    let newLeft = null;
    let speed = 1;

    const droneSize = 2 * document.getElementById("drone1").style.height;
    const directions = {
    left: 'left',
    right: 'right'
    }
    let drone1 = {
    top: 100,
    left: 400,
    topInit: 200,
    leftInit: 200
    }
    let drone2 = {
    top: 400,
    left: 10,
    topInit: 300,
    leftInit: 110
    }

    const box = {
    height: document.getElementById("box").offsetHeight,
    width: document.getElementById("box").offsetWidth
    };
    const drone1ref = document.getElementById("drone1");
    const drone2ref = document.getElementById("drone2");

    let drone1speed = speed
    let drone2speed = speed

    function updatePosition() {
    let modif = 1;
    if (drone1.left < 0 + droneSize ||
        drone1.top < 0 + droneSize ||
        drone1.top > box.height - droneSize ||
        drone1.left > box.width - droneSize) {
        drone1speed = -drone1speed;
        resetPosition()
    }
    if (drone2.left < 0 + droneSize ||
        drone2.top < 0 + droneSize ||
        drone2.top > box.height - droneSize ||
        drone2.left > box.width - droneSize) {
        drone2speed = -drone2speed;
        resetPosition()

    }

    if (Math.sqrt(Math.pow(Math.abs(drone1.left - drone2.left), 2) + Math.pow(Math.abs(drone1.top - drone2.top), 2)) < 100) {
        modif = -1;
        console.log('collision')
    }

console.log(drone1speed, drone2speed)

    drone1ref.style.left = drone1.left + drone1speed + 'px';
    drone1ref.style.top = drone1.top - drone1speed * modif + 'px';
    drone2ref.style.left = drone2.left - drone2speed + 'px';
    drone2ref.style.top = drone2.top + drone2speed * modif + 'px';

    drone1.top += drone1speed * modif;
    drone1.left -= drone1speed;
    drone2.top -= drone2speed * modif;
    drone2.left += drone2speed;
}
    let interval = null;
    document.getElementById('start-button').onclick = () => {
        interval = setInterval(updatePosition, 100);
    }
    document.getElementById('stop-button').onclick = () => {
        clearInterval(interval);
    }
    
    function resetPosition() {
        //update dron position to initial position
        drone1ref.style.left = drone1.leftInit + 'px';
        drone1ref.style.top = drone1.topInit + 'px';
        drone2ref.style.left = drone2.leftInit + 'px';
        drone2ref.style.top = drone2.topInit + 'px';
        //change backend position values
        drone1.top = drone1.topInit;
        drone1.left = drone1.leftInit;
        drone2.top = drone2.topInit;
        drone2.left = drone2.leftInit;
    }
    document.getElementById('reset-button').onclick = () => {
        resetPosition();
    }
    resetPosition();
        document.getElementById("position-form").addEventListener('submit', evt => {
        evt.preventDefault();
        newTop = document.getElementById("posTop").value;
        newLeft = document.getElementById("posLeft").value;
        speed = document.getElementById("speed").value;
        clearInterval(interval);
        resetPosition()
        drone1speed = speed
        drone2speed = speed
        console.log(drone1ref.style.left, drone1ref.style.top)
        console.log(drone2ref.style.left, drone2ref.style.top)

    })

});
