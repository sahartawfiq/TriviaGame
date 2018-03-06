window.onload = (function (){

	$("#quizSection").hide();
	$("#result").hide();

	$("#start-button").on("click", function() {

	   $("#start-area").fadeOut();
	   $("#quizSection").show();
	   $("#timerId").text("01:00");
	   $("#timerId").append("<h2>Time Left!</h2>");
	   timer.timerStart();
	   quiz();
       selectAnswer();
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
                result();
   			 }
  		},
   		reset: function() {
    		timer.time = 59;
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
         "choices": ["two dozons", "five dozens", "five eggs"],
         "ans": 1
     },
     {
         "question": "What time does the royal ball start in Cinderella?",
         "choices": ["nine pm", "eight pm", "twelve am"],
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
   // a function to display the questions and choices radio buttond
   function quiz(){
    if (timer.time===0) {
            timer.stop();
            timer.reset();
            result();
    }
    //create an array of forms for the questions and an array of buttons for the choices
    var button = [];
    var createForm = [];
    for (var i = 0; i < questions.length; i++) {
        createForm[i] = $("<form>");
        createForm[i].text(questions[i].question);
        createForm[i].addClass("questionLine")
        // console.log("i" + i);
        if (i===0) {
            $("#questionsArea").after(createForm[i]);
        }else {
            createForm[i-1].after(createForm[i]);
        }
        
        var n = i.toString();
        // console.log(n);
        var buttonHolder = []; 
        buttonHolder[i]= $("<div>");
        buttonHolder[i].addClass("holder");
        buttonHolder[i].text(i+1);
        
        for (var j = 0; j < questions[i].choices.length; j++) {
            
            button[j] = $("<input type='radio' name=n>");
            button[j].text (questions[i].choices[j]);
            button[j].addClass("radioButton");
            button[j].val(j);
            buttonHolder[i].append(button[j]);
            createForm[i].append(buttonHolder[i]); 
        }
    }
}
  
        function selectAnswer(){
            $("#submit").on("click", function(){
            result();
            return;

            });
            $(".radioButton").on("click", function() {
                var userChoice = $(this).attr("value"); 
                console.log(userChoice);
                userChoice = parseInt(userChoice);
                x = $(this).parent();
                var number = x.text();
                number = parseInt(number);
                var questionNo = number -1;
                console.log("question no" + questionNo);
                // console.log(questions[questionNo].ans);
            // Is it the correct answer?
                if (userChoice === questions[questionNo].ans) {
                    noOfCorrect++;
                    console.log(noOfCorrect);    
                } else {
                    noOfIncorrect++;
                }

            });
        }
        //function to display the results
     function result() {
     	$("#start-area").hide();
        $("#result").fadeIn();
        $("#quizSection").fadeOut();
        $("#options").hide();
        $("#timerId").hide();
        noOfUnAnswered = questions.length - (noOfCorrect + noOfIncorrect);
        $("#result").append("<h4>Total Correct Answers: " + noOfCorrect + "</h4>");
        $("#result").append("<h4>Total Incorrect Answers: " + noOfIncorrect + "</h4>");
        $("#result").append("<h4>Total Unanswered: " + noOfUnAnswered + "</h4>");
    }  
       
    function reset(){
        $("#quizSection").hide();
        $("#result-area").hide();
        $("#start-area").fadeIn();
        $("#questionsArea").empty();
        $("#result").empty();
        $("#reStart-button").hide();   
    }
    
 });