var quiz = (function(){
   var exports = {};

   //booleans for using either localStorage or parseStorage

   var localStorageBoolean = false;
   var parseStorageBoolean = false;
   
   var questions = [{question_text:"What is the Air Speed of an Unladen Swallow?", answers:["32 mph", "42 kph","16 m/s","african or european?"], solutionIndex:3},
   {question_text:"What is capital of Estonia?", answers:["Riga", "Talinn","Pristina","Budapest"], solutionIndex:1},
      {question_text:"Who won the 2008 World Series", answers:["Red Sox", "Yankees","Phillies","Rays"], solutionIndex:2}];
   //Holds a DOM object  with the question text, 
   //ex. question.question_text="what is the air speed of an unladen swallow?" 
   //    question.answers=["32 mph", "42 kph","16 m/s","african or european?"]
   //    question.solutionIndex=4;]

   console.log(questions[1].question_text);
   
   var answers = [];
   //holds the answers of the student for comparison
   
   var score=0;

   var currentQuestionIndex = 0;
   // function to check answer, takes in 
   //q, question index
   //a, student answe index
   //returns boolean, true if answer is correct, false otherwise. 
   function checkCorrect(q, a){
       return getCurrentQuestion().solutionIndex==a;
   };
   
   function useLocalStorage(){
    if (localStorage['score']==null){
      localStorage['score']=0;
    }

    if(localStorage['currentQuestionIndex']==null){
      localStorage['currentQuestionIndex']=0;
    }

   }

   function incrementScore(){
    if (localStorageBoolean){
    localStorage['score']++;
  }
     return score++;  
   };

   function getCurrentScore(){
    if (localStorageBoolean){
    var current_score = localStorage['score'];
  }
    return current_score;
   }

   function getCurrentQuestionIndex(){
    if (localStorageBoolean){
    if(localStorage['currentQuestionIndex'] != null){
    localStorage['currentQuestionIndex'] = currentQuestionIndex;
  }
  }
    return currentQuestionIndex;
   }

   function incrementIndex(){
    if (localStorageBoolean){}
          localStorage['currentQuestionIndex']++;
      }
          currentQuestionIndex++;
        }

   function clearLocalStorage(){
    localStorage.clear();
   }     
   
   function setup(){
       // var abc = localStorage.getItem('currentQuestion');
       // if (abc){
       //  currentQuestionIndex = abc;
       // }
       if (localStorageBoolean){
       clearLocalStorage();
       useLocalStorage();
     }
     if (parseStorageBoolean){;
     }
    displayQuestion();
  }


   function getCurrentQuestion(){
    return questions[getCurrentQuestionIndex()];

   }
   function displayQuestion(){
       
       var wrapperDiv=$('<form></form>', {class:'questionWrapper'});
       
       
           var questionDiv=$('<div></div>', {class:'questionDiv'});
           var questionObj=getCurrentQuestion();
           var questionIndex=getCurrentQuestionIndex()+1;
           questionDiv.append(questionIndex+'. '+questionObj.question_text);
           var questionName = 'question'+String(questionIndex);
           questionDiv.append('<br>');
           for (var y = 0; y<questionObj.answers.length;y++ ){
               var answerInp=$('<input></input>', {class:'answerInput', type:'radio', name:questionName, value:questionObj.answers[y], data_index:y});
               questionDiv.append(answerInp, " "+answerInp.attr('value'),' <br>' );
               
                
                console.log(answerInp.attr('value'));
           }
           wrapperDiv.append(questionDiv);
           
       
       $('.quizDiv').append(wrapperDiv);

       var buttonDiv = $('<div/>');
       var checkButton=$('<button/>', {class:'checkAnswer'});
       checkButton.append('check answer');
       buttonDiv.append(checkButton)
       checkButton.on('click', checkAnswer);
       function checkAnswer(event){
           var userSelect=$('input[name='+questionName+']:checked');
           
           var correct=checkCorrect(currentQuestionIndex, userSelect.attr('data_index'));
           console.log(correct);
           if(correct){
               incrementScore();               
               userSelect.parent().append('<span class=\'correctAnswer>\'>Correct!<\span>');
               console.log(userSelect.html());
               checkButton.disabled = true;

           }else
           {
               userSelect.parent().append('<span class=\'incorrectAnswer>\'>incorrect!<\span>');
               console.log(userSelect.html());
           }
       }

       var nextButton = $('<button/>');
       nextButton.append('Next Question');
       buttonDiv.append(nextButton);
       nextButton.on("click",function(){
        if (getCurrentQuestionIndex()+1==questions.length){
          $('.quizDiv').html('YOU ARE DONE!!!!!!!!!. YOU GOT A SCORE OF: '+(getCurrentScore()/3)*100+" percent.");
        }
        else{
        incrementIndex();        
        $('.quizDiv').html('');
        displayQuestion();
      }
       });
       
       $('.quizDiv').append(buttonDiv);
       $('.quizDiv').append("score: "+score);
       
       console.log('questions have been displayed');
       
       // localStorage.setItem('currentQuestion', 1);

       
   }
   exports.setup=setup;
   
   return exports;
  
   
})();

$(document).ready(
    function (){
        quiz.setup();
    }
);