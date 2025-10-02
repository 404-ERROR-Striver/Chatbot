let prompt= document.querySelector("#prompt")
let chatContainer= document.querySelector(".chat-container")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCFXCMnEXv1XyG2G9ItefbDk4q0dbx16ZY"

let user={
    data:null,
}

async function generateResponse(aiChatBox){

let text= aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "contents":[
                {"parts":[{"text":user.data}
                ] 
            }]
        })
    }
    try{
    let Response =await fetch(Api_Url,RequestOption)
    let data = await Response.json()
    let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error);
    }}
  

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}
function handlechatResponse(message){
    user.data=message
    let html=`<img src="user.png" alt ="" id="userImage" width ="50">
                <div class="user-chat-area">
                ${user.data}
                </div>`
                prompt.value=""
let userChatBox = createChatBox(html,"user-chat-box")
chatContainer.appendChild(userChatBox)

setTimeout(()=>{
     let html=` <img src="ai.png" alt ="" id="aiImage" width ="70">
                <div class="ai-chat-area">
                <img src="loading.gif" alt="" class="load" width="100px"> 
                </div>`
                let aiChatBox=createChatBox(html,"ai-chat-box")
                chatContainer.appendChild(aiChatBox)
                generateResponse(aiChatBox)
},10)

}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
    handlechatResponse(prompt.value)
    }
})