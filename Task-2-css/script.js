var events = [];
var editingIndex = -1;
function addEvent() {
  var input = document.getElementById("eventInput");
  var error = document.getElementById("errorMessage");
  var name = input.value.trim();
  error.textContent = "";
  if (name === "") {
    error.textContent = "Please enter event name.";
    return;
  }
  events.push(name);
  input.value = "";
  editingIndex = -1;
  showEvents();
}
function clearError() {
  document.getElementById("errorMessage").textContent = "";
}
function makeButton(className, text, onClick) {
  var button = document.createElement("button");
  button.className = className;
  button.textContent = text;
  button.onclick = onClick;
  return button;
}
function showEvents() {
  var list = document.getElementById("eventList");
  list.innerHTML = "";
  for (let i = 0; i < events.length; i++) {
    var li = document.createElement("li");
    var controls = document.createElement("span");
    controls.className = "actions";

    if (editingIndex === i) {
      li.className = "editing";
      var editInput = document.createElement("input");
      editInput.id = "editInput";
      editInput.className = "edit-input";
      editInput.type = "text";
      editInput.value = events[i];
      editInput.placeholder = "Edit event name";
      editInput.oninput = clearError;
      li.appendChild(editInput);
      controls.appendChild(makeButton("save", "Save", function () { saveEdit(i); }));
      controls.appendChild(makeButton("cancel", "Cancel", cancelEdit));
    } else {
      var text = document.createElement("span");
      text.className = "event-text";
      text.textContent = events[i];
      li.appendChild(text);
      controls.appendChild(makeButton("edit", "Edit", function () { editEvent(i); }));
      controls.appendChild(makeButton("delete", "Delete", function () { deleteEvent(i); }));
    }
    li.appendChild(controls);
    list.appendChild(li);
  }
  if (editingIndex !== -1) {
    var activeInput = document.getElementById("editInput");
    if (activeInput) {
      activeInput.focus();
      activeInput.select();
    }
  }
}
function editEvent(i) {
  editingIndex = i;
  document.getElementById("errorMessage").textContent = "";
  showEvents();
}
function saveEdit(i) {
  var error = document.getElementById("errorMessage");
  var editInput = document.getElementById("editInput");
  if (!editInput) {
    return;
  }
  var name = editInput.value.trim();
  if (name === "") {
    error.textContent = "Please enter a valid event name.";
    return;
  }
  events[i] = name;
  editingIndex = -1;
  showEvents();
}
function cancelEdit() {
  editingIndex = -1;
  document.getElementById("errorMessage").textContent = "";
  showEvents();
}
function deleteEvent(i) {
  events.splice(i, 1);
  editingIndex = -1;
  showEvents();
}
