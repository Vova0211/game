const start = document.getElementById("start");
const count = document.getElementById("count");
const temp = document.getElementById("temp_card");
const place = document.getElementById("cards");
let nums = [];
start.addEventListener('click', e => {
    let value = parseInt(count.value);
    for (let i = 0; i < value; i++) {
        nums.push(i);
    }
    nums.forEach(e => {
        nums.push(e);
    });
    nums = shuffle(nums);
    if(typeof value == "number" && value >= 1 && value <= 8) {
        for (let i = 0; i < value * 2; i++) {
            card = temp.content.cloneNode(true);
            card.querySelector('div').dataset.id = nums[i];
            place.appendChild(card);
        }
        document.getElementById("start_game").remove();
        game()
        time()
    }
    
})
function game() {
    let is = true;
    let temp;
    let mem = -1;
    let count = 0;
        document.querySelectorAll(".up").forEach(e => {
            e.addEventListener('click', event1);
            function event1() {
                if (count < 2) {
                count++;
                e.classList.remove("inv");
                e.parentNode.classList.add("trns");
                }
            }
        })
    
    document.querySelector('body').addEventListener('click', e =>{
        if(find(e.target.classList, "up") && count == 1) {
            mem = parseInt(e.target.parentNode.dataset.id);
            temp = e.target;
        } else if (find(e.target.classList, "up") && parseInt(e.target.parentNode.dataset.id) == mem && count <= 2 && is) {
            e.target.remove();
            temp.remove();
            count = 0;   
            mem = -1;
        } else if (find(e.target.classList, "up") && count <= 2) {
            is = false;
            setTimeout(add, 2000);
        }
        function add() {
            e.target.classList.add("inv");
            e.target.parentNode.classList.remove("trns");
            temp.parentNode.classList.remove("trns");
            temp.classList.add("inv")    
            count = 0;   
            mem = -1;
            temp = "";
            is = true;
        }
    })
    
}
function time() {
    const timer = document.getElementById("time");
    timer.classList.remove("invs");
    let time = count.value * 10;
    timer.textContent = `Времени осталось: ${time}с`
    const stopp = setInterval(set, 1000);
    function set() {
        time--;
        timer.textContent = `Времени осталось: ${time}с`
        if (time <= 0) {
            clearInterval(stopp);
            alert("Время вышло!");
            count.value = "";
            location.reload();
        }
        const l = document.getElementsByClassName("inv").length;
        if (l == 0) {
            clearInterval(stopp);
            alert("Поздравляю, вы прошли игру");
            count.value = "";
            location.reload()
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