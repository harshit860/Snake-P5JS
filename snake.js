

var s;
var tail = 40;
var food;

let go = document.getElementById("snake")
console.log(go)


flag = true

if (flag) {
    function setup() {

        createCanvas(screen.availWidth - 30, screen.availHeight - 300)
        frameRate(10)
        s = new Snake()
        getloc()
        let score = document.getElementById("score")


    }
    function getloc() {
        let cols = floor(width / tail)
        let row = floor(height / tail)

        food = createVector(floor(random(cols)), floor(random(row)))
        food.mult(tail)
    }


    function draw() {
        background(40)

        if (s.eat(food)) {
            getloc()
        }
        s.death()
        s.update()
        s.show()


        fill(222, 19, 0)
        rect(food.x, food.y, tail, tail)
    }

    function keyPressed() {
        if (keyCode == UP_ARROW) {
            s.movesnake(0, -1)
        }
        else if (keyCode == DOWN_ARROW) {
            s.movesnake(0, 1)
        }
        else if (keyCode == LEFT_ARROW) {
            s.movesnake(-1, 0)
        }
        else if (keyCode == RIGHT_ARROW) {
            s.movesnake(1, 0)
        }
    }


    function Snake() {
        this.x = 0
        this.y = 0
        this.xspeed = 1
        this.yspeed = 0
        this.total = 0
        this.realtail = [

        ]

        this.death = () => {
            for (var i = 0; i < this.realtail.length; i++) {
                var pos = this.realtail[i]
                let d = dist(this.x, this.y, pos.x, pos.y)
                if (d < 10) {
                    this.total = 0
                    this.realtail = []
                    alert('You died')
                }
            }

        }

        this.eat = (pos) => {
            var d = dist(this.x, this.y, pos.x, pos.y)

            if (d < 10) {
                this.total += 1;
                score.textContent = this.total
                // console.log(this.total)
                return true
            }
            else {
                return false
            }
        }



        this.update = () => {
            if (this.total === this.realtail.length) {
                for (let a = 0; a < this.realtail.length - 1; a++) {
                    this.realtail[a] = this.realtail[a + 1]
                }
            }
            // console.log(this.realtail)


            this.realtail[this.total - 1] = createVector(this.x, this.y)

            this.x = this.x + this.xspeed * tail
            this.y = this.y + this.yspeed * tail


            this.x = constrain(this.x, 0, width - tail)
            this.y = constrain(this.y, 0, height - tail)


        }

        this.show = () => {
            fill(255)
            for (var i = 0; i < this.realtail.length; i++) {
                rect(this.realtail[i].x, this.realtail[i].y, tail, tail)
            }

            rect(this.x, this.y, tail, tail)

        }

        this.movesnake = (x, y) => {
            this.xspeed = x
            this.yspeed = y
        }
    }
}