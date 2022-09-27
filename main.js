function getData(url) {
  let fetchOptions = {
      method: "GET",
      mode: "cors",
      cache: "no-cache"
  }

  return fetch(url, fetchOptions).then(
      response => response.json(),
      err => console.error(err)
  );
}

function click() {
  getData("http://localhost:3000/users").then(
      data => fillDataTable(data, "table")
  );
}
document.querySelector("#btn").addEventListener("click", click);

function fillDataTable(data, tableID) {
  let table = document.querySelector(`#${tableID}`);
  if (!table) {
      console.error(`Table "${tableID}" is not found.`);
      return;
  }

  let tBody = table.querySelector("tbody");
  for (let row of data) {
      let tr = createAnyelement("tr");
      for (let k in row) {
          let td = createAnyelement("td");
          td.innerHTML = row[k];
          tr.appendChild(td);
      }
      let btnGroup = createBtnGroup();
      tr.appendChild(btnGroup);
      tBody.appendChild(tr);
  }
}

function createAnyelement(name, attributes) {
  let element = document.createElement(name);
  for (let k in attributes) {
      element.setAttribute(k, attributes[k]);
  }
  return element;
}

function createBtnGroup() {
  let group = createAnyelement("div", { class: "group" });
  let infoBtn = createAnyelement("button", { class: "infoBtn", onclick: "getInfo(this)"});
  infoBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden:"true"></i>'
  let delBtn = createAnyelement("button", { class: "delBtn", onclick: "delRow(this)"});
  delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden:"true"></i>'

  group.appendChild(infoBtn);
  group.appendChild(delBtn);

  let td = createAnyelement("td");
  td.appendChild(group);
  return td;
}

function delRow(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
  let id = tr.querySelector("td:first-child").innerHTML;
  let fetchOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache"
  };

  fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
      resp => resp.json(),
      err => console.error(err)
  ).then(
      data => {
          click();
      }
  );
}