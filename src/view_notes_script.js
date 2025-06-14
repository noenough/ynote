var db=null;
const indexedDB=
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;
var allstyle=document.getElementById("all_style");
var darklight=document.getElementById("darklight");
var addnote=document.getElementById("add_button");
var card=document.getElementById("kart");
var cardgosmak=document.getElementById("cardgosmak");
var gozleg=document.getElementById("gozleg");


addnote.addEventListener("click",add_note_click);
function add_note_click(){
var data={
  title:"",
  text:"",
}
  sessionStorage.setItem('maglumat',JSON.stringify(data));
  window.location.href="./not-gosmak.html";
window.location.href="./not-gosmak.html";
}
window.addEventListener('DOMContentLoaded',()=>{
  
  if (localStorage.getItem("darklightmode")===null)
    localStorage.setItem("darklightmode","./style.css");
  allstyle.href=localStorage.getItem("darklightmode");


    var request=indexedDB.open("ynotedb",6);
    request.onupgradeneeded=e=>{
      db=e.target.result;
      alert("upgrate");
    db=e.target.result;
    if (!db.objectStoreNames.contains("ynotes"))
    var ynotes=db.createObjectStore("ynotes",{keyPath:"title"}); 
    }
    request.onsuccess=e=>{
    db=e.target.result;
   
    }
    setTimeout(()=>{
    var tx=db.transaction("ynotes","readonly");
    tx.onerror=(e)=>{alert("erorchhik:"+e.target.result)};
    var notes=tx.objectStore("ynotes");
    
    var cursor=notes.openCursor();
    cursor.onsuccess=e=>{
        var cursordata=e.target.result;     
      if (cursordata)
      {
        let cards=document.createElement('div');
        let cardstitle=document.createElement('span');
        let cardscyzyk=document.createElement('span');
        let cardstext=document.createElement('span');
        cards.id='kart';
        cards.className='card'; 
        
        
        cardstitle.id='title_id';
        cardstitle.textContent=cursordata.key;
        cardstitle.className='title-style';
        
        cardscyzyk.id='cyzyk_id';
        cardscyzyk.className='cyzyk';

        cardstext.id='text_id';
        cardstext.textContent=cursordata.value.text;
        cardstext.className='note-style';
        cards.append(cardstitle);
        cards.append(cardscyzyk);
        cards.append(cardstext);
        cardgosmak.append(cards);
        cards.addEventListener('click',()=>kart_click(cardstitle.textContent,cardstext.textContent));
        cursordata.continue();
      
      }
    }
    },300)
    
})
var gozlegtext="";
gozleg.addEventListener("keydown",(e)=>{

setTimeout(()=>{
     cardgosmak.innerHTML="";
gozlegtext=gozleg.value;
  var tx=db.transaction("ynotes","readonly");
var ynotes=tx.objectStore("ynotes");
var request=ynotes.openCursor();

request.onsuccess=(e)=>{
      
      var cursordata=e.target.result;
      var str=cursordata.value.title.toString();
      if (cursordata)
      {
        if (str.indexOf(gozlegtext)>-1){
        let cards=document.createElement('div');
        let cardstitle=document.createElement('span');
        let cardscyzyk=document.createElement('span');
        let cardstext=document.createElement('span');
        cards.id='kart';
        cards.className='card'; 
        
        cardstitle.id='title_id';
        cardstitle.textContent=cursordata.key;
        cardstitle.className='title-style';
        
        cardscyzyk.id='cyzyk_id';
        cardscyzyk.className='cyzyk';

        cardstext.id='text_id';
        cardstext.textContent=cursordata.value.text;
        cardstext.className='note-style';
        cards.append(cardstitle);
        cards.append(cardscyzyk);
        cards.append(cardstext);
        cardgosmak.append(cards);
        cards.addEventListener('click',()=>kart_click(cardstitle.textContent,cardstext.textContent));
        }
         cursordata.continue();
      }
          
}},500);
})

function kart_click(atitle,atext){
var data={
  title:atitle,
  text:atext,
}
  sessionStorage.setItem('maglumat',JSON.stringify(data));
  window.location.href="./not-gosmak.html";
}

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