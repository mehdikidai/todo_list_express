import "./style.scss";
import axios, { all } from "axios";

let list = document.getElementById("list");

function td(el) {
    return `<li class="li_list">
  <div class="content">

      <input type="text" data-id="${el.id}" value="${el.content}" class="${el.done ? "done" : ""}" readonly>
      
  </div>
  <div class="actions">
      <button class="delete_todo" data-id="${el.id}">
          <i class="material-symbols-outlined"> delete </i>
      </button>
      <button>
          <i class="material-symbols-outlined"> edit_document </i>
      </button>
      <button class="done_todo" data-id="${el.id}">
          <i class="material-symbols-outlined"> ${el.done ? 'close' : 'done'}  </i>
      </button>
  </div>
</li>`;
}

const form = document.getElementById("form");
let todo_text = document.getElementById("todo_text");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (todo_text.value.trim() !== "" || todo_text.value.trim() === null) {
        axios
            .post("http://localhost:3000/todo", { content: todo_text.value })
            .then((res) => {
                getData().then((r) => {
                    showData(r.data);
                });
            })
            .finally(() => {
                todo_text.value = "";
            });
    } else {
        alert("null");
    }
});

async function getData() {
    const a = await axios("http://localhost:3000");
    return a;
}

getData().then((res) => {
    showData(res.data);
});

function showData(arr) {
    list.innerHTML = "";

    arr.forEach((el) => {
        list.innerHTML += td(el);
    });
}

function deletTodo(id) {
    console.log(id);
    axios.delete(`http://localhost:3000/todo/${id}`).then((res) => {
        console.log(res);
        getData().then((r) => {
            showData(r.data);
        });
    });
}

function doneTodo(id) {
  console.log(id);
  axios.put(`http://localhost:3000/todo`,{id:id}).then((res) => {
      console.log(res);
      getData().then((r) => {
          showData(r.data);
      });
  });
}

const observer = new MutationObserver((obs) => {
    document
        .querySelectorAll(".delete_todo")
        .forEach((el) =>
            el.addEventListener("click", (t) => deletTodo(t.target.dataset.id))
        );
    document
        .querySelectorAll(".done_todo")
        .forEach((el) =>
            el.addEventListener("click", (t) => doneTodo(t.target.dataset.id))
        );

    //console.log(obs.length - 1);
});

observer.observe(list, { childList: true });
