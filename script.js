const start = document.getElementById("start");
const count = document.getElementById("count");
const temp = document.getElementById("temp_card");
const place = document.getElementById("cards");
let nums = [];
start.addEventListener('click', e => {
    for (let i = 0; i < count.value; i++) {
        nums.push(i);
    }
    nums.forEach(e => {
        nums.push(e);
    });
    nums = shuffle(nums);
    if(typeof count.value !== "number" && count.value <= 1 && count.value > 20) {
        count.value = "";
        count.placeholder = "ВВЕДИТЕ ЧИСЛО!"
    } else {
        for (let i = 0; i < count.value * 2; i++) {
            card = temp.content.cloneNode(true);
            card.querySelector("h1").textContent = nums[i];
            place.appendChild(card);
        }
    }
    time()
    game()
})
function game() {
    let first = -1
    let is = true;
    let count = 0;
    let time = [null, null]
        document.querySelectorAll(".up").forEach(e => {
            e.addEventListener('click', event1);
            function event1() {
                if (count < 2) {
                count++;
                e.classList.remove("inv");
                time[count] = setTimeout(addInv, 3000);
                function addInv() {
                    if(is) {
                        e.classList.add("inv");
                        first = -1;
                        count = 0;
                        return;
                    }
                    clearTimeout(time[0]);
                    clearTimeout(time[1]);
                    is = true;
                }
                }
            }
        })
    
    document.querySelector('body').addEventListener('click', e =>{
        if(find(e.target.classList, "up") && first < 0) {
            first = parseInt(e.target.parentNode.querySelector('h1').textContent);
        } else if (find(e.target.classList, "up") && parseInt(e.target.parentNode.querySelector('h1').textContent) == first && count <= 2) {
            is = false;
            e.target.remove();
        } 
    })
    
}
function time() {
    let time = 6000;
    const timer = document.getElementById("time");
    timer.classList.remove("invs");
    const stop_game = setInterval(isStop, 100);
    const stopp = setInterval(set, 1000);
    function set() {
        time--;
        timer.textContent = `Времени осталось: ${time}с`
        if (time < 0) {
            clearInterval(stopp);
            alert("")
        }
    }
    function isStop() {
        const l = document.getElementsByClassName("inv").length;
        if (l == 0) {
            clearInterval(stop_game);
            clearInterval(stopp);
            alert("Поздравляю, вы прошли игру");
        }
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}
function find(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            return true;
        }
    }
    return false;
}
/*j => {
            j.target.classList.remove("inv");
            setTimeout(addInv, 3000);
            function addInv() {
                if(is && temp) {
                    j.target.classList.add("inv");
                    first = -1;
                    return;
                }
                is = true;
                temp = true;
            }
        })*/