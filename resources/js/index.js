$(document).ready(function () {

    var questions = [{
            question: "What was the name of Pam's fiance before Jim?",
            correctAnswer: "Roy",
            answerOne: "Emmanuel",
            answerTwo: "Randy",
            answerThree: "David ",
            gif: "./resources/gifs/roy.gif",

        },
        {
            question: "Where does The Office take place?",
            answerOne: "New York, NY",
            answerTwo: "Dublin, Ireland",
            correctAnswer: "Scranton, PA",
            answerThree: "Denver, CO",
            gif: "./resources/gifs/scranton.gif",

        },
        {
            question: "Where did Andy Bernard go to school?",
            answerOne: "Pratt Institute",
            answerTwo: "Harvard",
            answerThree: "Princeton",
            correctAnswer: "Cornell",
            gif: "./resources/gifs/cornell.gif",

        },

        {
            question: "What pet did Angela keep in the offfice?",
            correctAnswer: "cat",
            answerOne: "dog",
            answerTwo: "bear",
            answerThree: "deer",
            gif: "./resources/gifs/cat.gif",

        },

        {
            question: "What did Michael's mug say in the intro?",
            answerOne: "Happy Birthday",
            answerTwo: "Best Dad",
            correctAnswer: "World's Best Boss",
            answerThree: "Dunder Mifflin",
            gif: "./resources/gifs/mug.gif",

        },
        {
            question: "Who did Michael move to Colorado with?",
            correctAnswer: "Holly",
            answerOne: "Pam",
            answerTwo: "Angela",
            answerThree: "Kevin",
            gif: "./resources/gifs/holly.gif",

        },
        {
            question: "What department did Toby work for?",
            answerOne: "Fire Department",
            answerTwo: "Accounting Department",
            correctAnswer: "HR Department",
            answer: "Marketing Department",
            gif: "./resources/gifs/toby.gif"
        },
    ]

    var userChoice;
    var answerClicked = false;
    // var windowClicked = false
    var questionIndex = 0;
    var wins = 0;
    var loses = 0;
    var counter;
    var startGameClicked = false;
    var valueOfBtn;
    var interval;
    var noAnswerCounter = 0;

    //*********************************************************************
    //SET UP
    //*********************************************************************

    function setUp() {


        startGameClicked = false;
        answerClicked = false;
        counter = 20;
        $("#question").text(questions[questionIndex].question);
        //Dynamically populates the answers
        // console.log(questionIndex);
        $.each(questions[questionIndex], function (key, val) {
            if (key !== "question" && key !== "gif") {
                // console.log(key + " //there is a value of " + val);
                $("#timer").text(counter)
                $("#answers").append('<button class="one-answer" value="' + val + '">' + val + '</button>');
            }
        })

        $(".one-answer").click(function () {
            //console.log("anwer button was clicked");
            answerClicked = true;
            valueOfBtn = $(this).val();
            if (answerClicked) {
                if (valueOfBtn === questions[questionIndex].correctAnswer) {
                    // console.log("its a match!");
                    //clearInterval(interval);
                    wins++;
                    showResult();
                    $(".immediate-result-screen").append('<p id="correct"> CORRECT! </p> ')
                    $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                    setTimeout(function () {
                        nextQuestion();
                    }, 4000)
                    //console.log("wins are: " + wins);
                } else {
                    loses++;
                    showResult();
                    $(".immediate-result-screen").append('<p id="incorrect"> INCORRECT! </p> ')
                    $(".immediate-result-screen").append('<p id="correct-answer"> answer was : ' + questions[questionIndex].correctAnswer + '</p> ')
                    $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                    setTimeout(function () {
                        nextQuestion();
                    }, 4000)
                    //console.log("loses are: " + loses);

                }
            }
        });
    }

    function timer() {
        interval = setInterval(function () {
            $("#timer").text(counter)
            // console.log(counter);
            counter--;
            // Display 'counter' wherever you want to display it.
            if (counter === 0) {
                noAnswerCounter++;
                console.log(noAnswerCounter);
                showResult();
                $(".immediate-result-screen").append('<p id="incorrect"> INCORRECT! </p> ')
                $(".immediate-result-screen").append('<p id="correct-answer"> answer was:' + questions[questionIndex].correctAnswer + '</p> ')
                $(".immediate-result-screen").append('<img id="gif" src=' + questions[questionIndex].gif + '>');
                setTimeout(function () {
                    nextQuestion();
                }, 4000)
            }
        }, 1000);
    }

    function nextQuestion() {
        $(".container-game").css("display", "block");
        $(".immediate-result-screen").removeClass("display");
        clearInterval(interval);
        timer();
        // if (answerClicked) {
        //     clearInterval(interval);
        // }
        // console.log(questionIndex)
        if (questionIndex < questions.length - 1) {
            questionIndex = questionIndex + 1;
        } else {
            clearInterval(interval);
            showResult();
            $(".immediate-result-screen").append('<p id="how-well"> How well did you do? </p>');
            $(".immediate-result-screen").append('<p> Correct Answers : ' + wins + '</p>');
            $(".immediate-result-screen").append('<p> Incorrect Answers : ' + loses + '</p>');
            $(".immediate-result-screen").append('<p> Unanswered Questions : ' + noAnswerCounter + '</p>');
        }
        $("#answers").text("");
        setUp();
    }


    $("#start").click(function () {
        if (!startGameClicked) {
            timer();
            setUp();
            startGameClicked = true;
            $("#footer").css("display","flex");
            $("#start").hide();
        }
    })

    function showResult() {
        $(".container-game").css("display", "none");
        $(".immediate-result-screen").addClass("display");
        $(".immediate-result-screen").empty();
    }






});