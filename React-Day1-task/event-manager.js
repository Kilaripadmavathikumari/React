var eventNames = []
function addEvent()
{
  var input = document.getElementById("eventInput")
  var eventName = input.value.trim()
  if (eventName == "")
  {
    alert("Please enter event name")
    return
  }
  eventNames.push(eventName)
  input.value = ""
  showEvents()
}
function showEvents()
{
  var list = document.getElementById("eventList")
  list.innerHTML = ""
  for (var i = 0; i < eventNames.length; i++)
  {
    var item = document.createElement("li")
    item.innerHTML = eventNames[i] + " "
    item.innerHTML += "<button onclick='editEvent(" + i + ")'>Edit</button> "
    item.innerHTML += "<button onclick='deleteEvent(" + i + ")'>Delete</button>"
    list.appendChild(item)
  }
}
function editEvent(index)
{
  var newName = prompt("Edit event name", eventNames[index])
  if (newName == null || newName.trim() == "") return
  eventNames[index] = newName.trim()
  showEvents()
}
function deleteEvent(index)
{
  eventNames.splice(index, 1)
  showEvents()
}
