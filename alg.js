
function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}

function translate( elementsArray, x, y ) {
  let s = 0;
  elementsArray.forEach(function(elem,i) {
    if(i === 0 ) return
    else {
    s= s+1
    console.warn(s)
    var left = parseInt( css( elem, 'left' ), 10 ),
        top = parseInt( css( elem, 'top' ), 10 ),
        dx = left - x,
        dy = top - y,
        i = 1,
        count = 20,
        delay = 20;
    
    function loop() {
        if ( i >= count ) { return; }
        i += 1;
        elem.style.left = ( left - ( dx * i / count ) ).toFixed( 0 ) + 'px';
        elem.style.top = ( top - ( dy * i / count ) ).toFixed( 0 ) + 'px';
        setTimeout( loop, delay );
    }
    
    loop();
    }
  }, this);
}

document.addEventListener("DOMContentLoaded",(e)=>{
    let speed = 5;
    const drones = [];
    const box = {
      ref: document.getElementById("box"),
      height: document.getElementById("box").offsetHeight,
      width: document.getElementById("box").offsetWidth
    };

    document.getElementById("position-form").addEventListener('submit', evt => {
        evt.preventDefault();
        const size = document.getElementById("size").value
        const left = document.getElementById("posLeft").value
        const top = document.getElementById("posTop").value
        drones.push({
          top, left, topInit: top, leftInit: left, speed: document.getElementById("speed").value, size
        })
        const node = document.createElement("img");
        node.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/98172-200.png";
        node.style.width = size
        node.style.height = size
        node.style.left = left
        node.style.top = top
        box.ref.appendChild(node)
    })

    document.getElementById('start-button').onclick = () => {
      const img = box.ref.childNodes
      let  speed = 2
      interval = setInterval(() =>{ 
        speed += 5;
        console.warn(speed)
        translate(img, speed, speed)
      }, 500);
    }
    document.getElementById('stop-button').onclick = () => {
      clearInterval(interval);
    }
});
