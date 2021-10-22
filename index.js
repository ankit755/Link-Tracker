
var inputEl = document.getElementById("input-el")
var linkArray = []

let saveEl = document.getElementById("save-el")
let ulEL = document.getElementById("ul-el")
let deleteEl = document.getElementById("del-el")
let tabEl = document.getElementById("tab-el")

let fromLocalStorage = JSON.parse(localStorage.getItem("listArray"))

if(fromLocalStorage)
{
	linkArray = fromLocalStorage
	renderDisplay()
}




saveEl.addEventListener("click", function displayLinks(){
	linkArray.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("listArray",JSON.stringify(linkArray))
	renderDisplay()
}) 

tabEl.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        linkArray.push(tabs[0].url)
        localStorage.setItem("listArray", JSON.stringify(linkArray) )
        renderDisplay()
        
   })
})

function renderDisplay(){
	let listITEMS = ""
		for(let i=0;i<linkArray.length;i++){
			listITEMS +=
			`
            <li>
                <a target='_blank' href='${linkArray[i]}'>
                    ${linkArray[i]}
                </a>
            </li>
        `
		}

		ulEL.innerHTML= listITEMS
}

deleteEl.addEventListener("dblclick", function deletelinks(){
	localStorage.clear()
	linkArray = []
	renderDisplay()
})
