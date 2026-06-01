var events=[];
function addEvent(){
  var input=document.getElementById("eventInput");
  var name=input.value.trim();
  if(name==""){
    alert("Please enter event name");
    return;
  }
  events.push(name);
  input.value="";
  showEvents();
}
function showEvents(){
  var list=document.getElementById("eventList");
  list.innerHTML="";
  for(var i=0;i<events.length;i++){
    list.innerHTML+=
      "<li><span class='event-text'>"+events[i]+"</span>"+
      "<span class='actions'>"+
      "<button class='edit' onclick='editEvent("+i+")'>Edit</button>"+
      "<button class='delete' onclick='deleteEvent("+i+")'>Delete</button>"+
      "</span></li>";
  }
}
function editEvent(i){
  var name=prompt("Edit event name",events[i]);

  if(name!=null&&name.trim()!=""){
    events[i]=name.trim();
    showEvents();
  }
}
function deleteEvent(i){
  events.splice(i,1);
  showEvents();
}
