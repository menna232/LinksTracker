let myLinks = []
const inputText = document.getElementById("input-text")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const tabBtn = document.getElementById("tab-btn")


if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <button id='remove-btn'></button>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

let removeBtn = document.querySelectorAll("#remove-btn");
        for(let i=0; i<removeBtn.length;i++){
            removeBtn[i].onclick=function(){
                let tobeRemoved = this.parentElement.innerText
                myLinks = myLinks.filter(link => link !== tobeRemoved);
                localStorage.setItem("myLinks", JSON.stringify(myLinks));
                console.log(tobeRemoved)
                this.parentNode.remove()
            }
        }



deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})



saveBtn.addEventListener("click", function() {
    if(inputText.value!=""){
    myLinks.push(inputText.value)
    inputText.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks) )
    render(myLinks)
    }
    else {
        return false
    }
})