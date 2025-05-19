
document.querySelector('#boyBtn').addEventListener('click', switchBPage )
document.querySelector('#girlBtn').addEventListener('click', switchGPage )

function switchBPage(){
    window.location.href = 'blue/bluePage.html'
}


function switchGPage(){
    window.location.href = 'pink/pinkPage.html'
}