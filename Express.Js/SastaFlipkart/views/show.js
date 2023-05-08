async function onSignUp(event) {
  event.preventDefault();

  const name = event.target.Name.value;
  const category = event.target.Category.value;

  myObj = {
    name,
    category,
  };

  if (name && category) {
    const response = await axios.post("http://localhost:7676/createItem", myObj);
    console.log(response);
    event.target.reset();
    onScreenFunction(response.data);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get("http://localhost:7676/getItems");
  console.log(response);
  response.data.forEach((element) => {
    onScreenFunction(element);
  });
});

async function onScreenFunction(upprWala) {
  const ul = document.getElementById("onScreenList");

  const li = document.createElement("li");
  li.innerHTML = `Name: ${upprWala.name} Category: ${upprWala.category}`;

  const delBtn = document.createElement("input");
  delBtn.value = "Delete";
  delBtn.type = "button";
  delBtn.onclick = async () => {
    await axios.delete(`http://localhost:7676/deleteItem/${upprWala.id}`);
    ul.removeChild(li);
  };

  const editBtn = document.createElement("input");
  editBtn.value = "Edit";
  editBtn.type = "button";
  editBtn.onclick = async () => {
    await axios.delete(`http://localhost:7676/deleteItem/${upprWala.id}`);
    ul.removeChild(li);

    document.getElementById("Name").value = upprWala.name;
    document.getElementById("Category").value = upprWala.category;
  };

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}
