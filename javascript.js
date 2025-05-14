
document.querySelector('#boyBtn').addEventListener('click', switchBPage )
document.querySelector('#girlBtn').addEventListener('click', switchGPage )

function switchBPage(){
    window.location.href = 'boy/boyPage.html'
}


function switchGPage(){
    window.location.href = 'girl/girlPage.html'
}