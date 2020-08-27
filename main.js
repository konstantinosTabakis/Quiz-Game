"use strict"
let choise=""
let index = 0;
let points=0
let category=document.querySelectorAll(".category")
let category_check=""
const ending=document.querySelector(".ending")
let btn_exist=false

 
for (const cat of category) {
        cat.addEventListener("click", function(){
            category_check=this.textContent
            console.log(category_check)
            gameStart()
        }  ) 
}

let score = document.querySelector('.score')
score.textContent=points 
let difficulty = document.querySelector(".diff")

let correct="";
const app = document.querySelector('.app')
let answer_div

function nextQuestion(questions) {
    index= 0
    console.log(category_check)
    
    let answerArr=[]
    if(category_check!=="Random"){
        while (category_check!==questions[index].category){
            index= Math.floor(Math.random()*questions.length)
        }}else{
            index= Math.floor(Math.random()*questions.length)

        }
    difficulty.textContent=questions[index].difficulty
    choise=""
    app.innerHTML = ''
    const q = document.createElement('h2')
    q.innerHTML = questions[index].question

    app.append(q)

     
    for (let answer of questions[index].incorrect_answers) {
        answerArr.push(answer) 
    }
    answerArr.push(questions[index].correct_answer)  
    answerArr.sort(() => 0.5 - Math.random())
     
    
    for (let i in answerArr){
        answer_div = document.createElement('div')
        answer_div.innerHTML=answerArr[i]
        app.append(answer_div)
   
     
        answer_div.addEventListener('click', function() {
               
        choise =  this.innerText
        console.log(choise)
            document.querySelectorAll('.app div').forEach(x => x.style.color = "black")
            document.querySelectorAll('.app div').forEach(x => x.style.fontWeight = "normal")
            this.style.color = "#05dfd7"
            this.style.fontWeight = "bold"
        })
     }     
     
    const btn = document.createElement('button')
    btn.innerHTML = "Next"
    app.append(btn)
    
    btn.addEventListener('click', function() { 
         
        if (choise==questions[index].correct_answer){ 
            console.log("good job")
            if (questions[index].difficulty=='hard'){
                points+=3
            }else if(questions[index].difficulty=="medium"){
                points+=2
           }else {
                points++
           }

        }else if(choise==""){
            console.log("pass")

        }else {
            console.log("try again")
            points--
             
        }
        score.textContent=points
        nextQuestion(questions)

    })
    
    
        const stop =document.createElement('button')
        stop.innerHTML="Save Score and Reset"
        if (!btn_exist){
             btn_exist=true
             
             ending.append(stop)
         }

        stop.addEventListener('click',function(){
            alert("Your final score is "+points )
            points=0

            score.textContent=points 

            btn_exist=false
            
             
            document.querySelector('.app button').remove()
            document.querySelector('.app h2').remove()
            document.querySelectorAll('.app div').forEach(x => x.remove())
            document.querySelectorAll('.ending button').forEach(x => x.remove())
             
            
    })
}


 

function gameStart(){
    fetch ( "data.json" )
    .then(res => res.json())
    .then(questions => {
        nextQuestion(questions)
    })
    .catch(err => console.log(err))
}