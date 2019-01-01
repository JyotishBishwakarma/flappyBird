$(function () {

    //saving dom objects to variables
    var container = $('#container');
    var container_restart = $('#container_restart');
    var bird = $('#bird');
    var pole = $('.pole');
    var nextpole = $('.nextpole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var pole_3 = $('#pole_3');
    var pole_4 = $('#pole_4');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var nextpole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole_2.css('height'));
    var nextpole_initial_height = parseInt(pole_4.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 25;

    //some other declarations
    var go_up = false;
    var score_updated = false;
    var game_over = false;
    var icount = 0;
    var nextpoleflag = false;
    var nextpolemove = false;


    var the_game = setInterval(function () {
       
        if (collision(bird, pole_1) || collision(bird, pole_2) || collision(bird, pole_3) || collision(bird, pole_4) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
           
           stop_the_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));
            var nextpole_current_position = parseInt(nextpole.css('right'));

            //update the score when the poles have passed the bird successfully
            if (pole_current_position > container_width - bird_left || nextpole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            //start second pole
             if (pole_current_position > container_width / 2) {
                if (nextpoleflag === false) //to change second pole hight only once while starting second pole
                var new_height = parseInt(Math.random() * 80);
                
                pole_3.css('top', -80 + new_height);
                pole_4.css('height', pole_initial_height - new_height);
                               
                nextpoleflag = true; //flag to check the height of second pole has been set              
                nextpole.css('right', nextpole_current_position + (speed)); //to move second pole to the middle
            }

            //restarting second pole after going outside boundry
            if (nextpole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 80); 

                pole_3.css('top', -80 + new_height);
                pole_4.css('height', pole_initial_height - new_height);

                //increase speed
                speed = (speed + 1);
                speed_span.text(speed);
                
                nextpoleflag = false;
                score_updated = false;

                nextpole_current_position = nextpole_initial_position; //to reset second pole to starting point after crossing border
            }

            //restarting first pole after crossing boundry
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 80);
               
                pole_1.css('top', -80 + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                //increase speed
                speed = (speed + 1);
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position; //to reset first pole to starting point after crossing border
                nextpolemove = true; //flag to move second pole while it is in the middle
            }

            //move the poles
            pole.css('right', pole_current_position + speed);

            if (nextpolemove === true) //second pole came to the middle
            nextpole.css('right', nextpole_current_position + speed); //to move second pole from middle to the border

            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    //pressing space key to fly up the bird
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 35);
        }
    });

    //releasing space key
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    //pressing enter key to restart the game
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 13 && game_over == true) {
        restart_btn.click(); 
        }
    });

    //gravity
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 12);
    }

    //moving bird up
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 15);
    }

    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        container_restart.show();
    }

    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});
