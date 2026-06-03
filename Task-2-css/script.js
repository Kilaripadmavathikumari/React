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
function showEvents() {
  var list = document.getElementById("eventList");
  list.innerHTML = "";
  for (let i = 0; i < events.length; i++) {
    var li = document.createElement("li");
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
      var controls = document.createElement("span");
      controls.className = "actions";
      var saveBtn = document.createElement("button");
      saveBtn.className = "save";
      saveBtn.textContent = "Save";
      saveBtn.onclick = function () { saveEdit(i); };
      var cancelBtn = document.createElement("button");
      cancelBtn.className = "cancel";
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = cancelEdit;
      controls.appendChild(saveBtn);
      controls.appendChild(cancelBtn);
      li.appendChild(controls);
    } else {
      var text = document.createElement("span");
      text.className = "event-text";
      text.textContent = events[i];
      li.appendChild(text);
      var controls = document.createElement("span");
      controls.className = "actions";
      var editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.textContent = "Edit";
      editBtn.onclick = function () { editEvent(i); };
      var deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = function () { deleteEvent(i); };
      controls.appendChild(editBtn);
      controls.appendChild(deleteBtn);
      li.appendChild(controls);
    }
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
