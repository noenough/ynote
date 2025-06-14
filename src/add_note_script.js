var db=null;
const indexedDB=
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

var allstyle=document.getElementById("all_style");
var darklight=document.getElementById("darklight");
var yzabutton=document.getElementById("yza_button");
var donebutton=document.getElementById("donebutton");

var ady=document.getElementById("ady");
var yazgy=document.getElementById("yazgy");

let recdata=JSON.parse(sessionStorage.getItem('maglumat'));
donebutton.addEventListener("click",done_click);
yzabutton.addEventListener("click",yzabutton_click);
function yzabutton_click(){
    window.location.href="./index.html";
}

function done_click(){
    if (ady.value.indexOf(' ')>-1)
        alert("Don't space in title");
else if (ady.value==="" || yazgy.value==="")
alert("require title or note spaces");
else{
var flag=0,flag1=0;
var tx=db.transaction("ynotes","readonly");
var ynotes=tx.objectStore("ynotes");
var request=ynotes.openCursor();

request.onsuccess=(e)=>{
    var data=e.target.result;
    if (data)
    {
        if (data.key===ady.value)
            flag1=1;
    if (data.key==recdata.title)
    {    
    var tx1=db.transaction("ynotes","readwrite")
    var ynotes2=tx1.objectStore("ynotes");
    let getreq=ynotes2.get(data.key);
    getreq.onsuccess=()=>{
    var edata=getreq.result;
    if (edata)
    {
    var kl=localStorage.getItem("ynotes_titles");
    edata.title=ady.value;
    edata.text=yazgy.value;
    ynotes2.put(edata).onsuccess=()=>{
if (kl.indexOf(ady.value)>-1)
    alert("successfuly UPDATED");
    else
    {
    alert("successfuly CREATED");
    localStorage.setItem("ynotes_titles",`${localStorage.getItem("ynotes_titles")} ${ady.value}`)
    
    }
    flag=1;
    window.location.href="./index.html";
    
    
    }    
    }
    }
        
    }
    else
    data.continue();  
    }
    else
    {
    if (flag1===1)
    alert("title name is already taken");
    if (flag===0){

var tx=db.transaction("ynotes","readwrite");
tx.onerror=(e)=>alert("ERROR:"+e.target.error);
var ynotes1=tx.objectStore("ynotes");
var data={
    title:ady.value,
    text:yazgy.value,
}
ynotes1.add(data).onsuccess=()=>{
    alert("successfuly CREATED");
    
    if (localStorage.getItem("ynotes_titles")==null)localStorage.setItem("ynotes_titles","");
    localStorage.setItem("ynotes_titles",`${localStorage.getItem("ynotes_titles")} ${data.title}`)
    window.location.href="./index.html";
};   

}

}
} 
}  
}
window.addEventListener("DOMContentLoaded",()=>{

    var request=indexedDB.open("ynotedb",6);

     if (localStorage.getItem("darklightmode")===null)
    localStorage.setItem("darklightmode","./style.css");
    allstyle.href=localStorage.getItem("darklightmode");
    ady.value=recdata.title;
    yazgy.value=recdata.text;

    request.onupgradeneeded=(e)=>{
    alert("upgrate");
    db=e.target.result;
    var ynotes=db.createObjectStore("ynotes",{keyPath:"title"}); 
    }
request.onsuccess=(e)=>{
db=e.target.result;
}
}
)


darklight.addEventListener('click',darklight_click);

function darklight_click(){ 
if (localStorage.getItem("darklightmode")==="./style.css")
{
localStorage.setItem("darklightmode","./style_dark.css");
allstyle.href=localStorage.getItem("darklightmode");
}
else
{
localStorage.setItem("darklightmode","./style.css");
allstyle.href=localStorage.getItem("darklightmode");
}
}