window.onload = (function (){
	$("#quizSection").hide();
	$("#result").hide();

	$("#start-button").on("click", function() {
	// console.log("hello");
		$("#start-area").fadeOut();
		$("#quizSection").show();
		$("#timerId").text("01:00");
		$("#timerId").append("<h2>Time Left!</h2>");
		timer.timerStart();
		start();
	})
	var noOfCorrect = 0;
	var noOfIncorrect = 0;
	var noOfUnAnswered = 0;

//  setting the timer
	var intervalId;
	var timer = {
  		time: 59,
  		timerStart: function() {
    // SetInterval to start the count here and set the clock to running.
        intervalId = setInterval(timer.count, 1000);
  		},
  		stop: function() {
    // ClearInterval to stop the count here and set the clock to not be running.
    	clearInterval(intervalId);
  		},
  		count: function() {
    		timer.time--;
    		$("#timerId").text("00:" + timer.time);
    		if (timer.time == 0) {
    			timer.stop();
   			 }
  		},
   		reset: function() {
    		timer.time = 59;
    // timer.lap = 1;
    		$("#timerId").text("01:00"); 
  		},
	};
// Array of objects holding the questions, choices and the correct answer
 	var questions = [
     {
        "question": "What is the name of the original novel that inspired the full length feature animation: The Hunchback of Notre Dame?",
        "choices": ["Notre Dame", "Notre Dame de Paris", "Beauty and the Beast "],
        "ans": 1
     },
    {
        "question": "In The Sword in the Stone, what does Merlin call The Greatest Force on Earth?",
        "choices": ["Love", "Wealth", "Evil Spirit"],
        "ans": 0
        },
     {
        "question": "When does Mary Poppins say she will leave the Banks’ house?",
        "choices": ["When the Wind Changes", "When the moon is full", "Never"],
        "ans": 0
     },
     {
        "question": "In the Lion King, where does Mufasa and his family live?",
        "choices": ["Black Rock", "Congolese Forest", "Pride Rock"],
        "ans": 2
     },
     {
       	"question": "In Dumbo, where is Mrs. Jumbo when the stork delivers her baby?",
        "choices": ["In the circus Train", "In the circus Tent", "Parade"],
        "ans": 0
     },
     {
         "question": "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
         "choices": ["2 dozons", "5 dozens", "5 eggs"],
         "ans": 1
     },
     {
         "question": "What time does the royal ball start in Cinderella?",
         "choices": ["9 pm", "8 pm", "12 am"],
         "ans": 1
     },
     {
         "question": "Which Disney princess wears pants rather than a dress?",
         "choices": ["Jasmine", "Tiana", "Rapunzel"],
         "ans": 0
     },
     {
         "question": "Who was the first Disney princess based on a real historical figure?",
         "choices": ["Blondie", "Jasmine", "Pocahontas"],
         "ans": 2
     },
   ];
   	// var questionNo = 0;
    function displayQuestion(questionNo) {

        if (questionNo < questions.length) {
            $("#questions").empty();
            $(".option").empty();
            timer.count();
            var newDivOne = $("<div>");
            newDivOne.addClass("queArea").text(questions[questionNo].question);
            console.log(questions[questionNo].question);

            $("#questions").append(newDivOne);
            for (var i = 0; i < questions[questionNo].choices.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("option").attr("value", i).text(questions[questionNo].choices[i]);
                $("#options").append(newDiv);
            }

        } else {
            reset(); 
        }
    }
        function selectAnswer(){
        $(".option").on("click", function() {
            var userChoice = $(this).attr("value"); 
            userChoice = parseInt(userChoice);

            // Is it the correct answer?
            if (userChoice === questions[questionNo].ans) {
                noOfCorrect++;
                questionNo++;
                
            } else {
                noOfIncorrect++;
                questionNo++;

            }
            displayQuestion(questionNo);
        })
    }
    function start() {
        $("quizSection").show();
        $("#questions").show();
        $("#options").show();
        $("#timerId").show();
// Initialize counters
        var noOfCorrect = 0;
		var noOfIncorrect = 0;
		var noOfUnAnswered = 0;
        questionNo = 0;
// Start displaying 
        displayQuestion(questionNo);

    }
     function reset() {
     	$("#start-area");
        $("#result").show();
        $("#quizSection").hide();
        $("#options").hide();
        $("#timerId").hide()
        noOfUnAnswered = 9 - (noOfCorrect + noOfIncorrect);
        $("#result").append("<h4>Total Correct Answers: " + noOfCorrect + "</h4>");
        $("#result").append("<h4>Total Incorrect Answers: " + noOfIncorrect + "</h4>");
        $("#result").append("<h4>Total Unanswered: " + noOfUnAnswered + "</h4>");
// Restart the game in ten seconds
        setTimeout(start, 1000 * 10);

    }
 });