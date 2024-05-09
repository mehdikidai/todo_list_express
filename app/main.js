import "./style.scss";
import axios from "axios";
import { z } from "zod";
import moment from "./node_modules/moment/dist/moment.js";

let list = document.getElementById("list");

const contentSchema = z.string().min(2).max(40).trim();

function td(el) {
    return `<li class="li_list">
  <div class="${el.done ? "date_todo done" : "date_todo"}">
  <span>${moment(el.date).fromNow()}</span>
  </div>
  <div class="content">
      <span class="${el.done ? "done" : ""}"></span>
      <input type="text" data-id="${el.id}" value="${el.content}" class="${
        el.done ? "done input_content_show" : "input_content_show"
    }" readonly>
      
  </div>
  <div class="actions">
      <button class="delete_todo" data-id="${el.id}">
          <i class="material-symbols-outlined"> delete </i>
      </button>
      <button class="${el.done ? "done_todo active" : "done_todo"}" data-id="${
        el.id
    }">
          <i class="material-symbols-outlined"> ${
              el.done ? "bookmark" : "done"
          }  </i>
      </button>
  </div>
</li>`;
}

const form = document.getElementById("form");
let todo_text = document.getElementById("todo_text");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (contentSchema.safeParse(todo_text.value).success) {
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
        swal({
            title: "mkin walo ?",
            text:"Lorem Ipsum is simply dummy",
            button: {
                text: "Close",
            },
        });
    }
});

async function getData() {
    const a = await axios("http://localhost:3000/");
    return a;
}

getData().then((res) => {
    showData(res.data);
});

function showData(arr) {
    list.innerHTML = "";

    console.log(arr);

    arr.forEach((el) => {
        list.innerHTML += td(el);
    });
}

function deletTodo(id) {
    console.log(id);
    swal({
        title: "Are you sure?",
        text: "Lorem Ipsum is simply dummy text of the",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://localhost:3000/todo/${id}`).then((res) => {
                console.log(res.data.affectedRows);
                if (res.data.affectedRows === 1) {
                    getData().then((r) => {
                        showData(r.data);
                        //swal("Good job", "Lorem Ipsum is simply dummy text of the");
                    });
                }
            });
        }
    });
}

function doneTodo(id) {
    console.log(id);
    axios.put(`http://localhost:3000/todo`, { id: id }).then((res) => {
        //console.log(res);
        getData().then((r) => {
            showData(r.data);
        });
    });
}

function updateTodo(el, id) {
    el.target.removeAttribute("readonly");
    console.log(el.target);
}

function sendUpdateTodo(el, id) {
    el.target.setAttribute("readonly", "");
    //console.log(el.target.value);
    const content = el.target.value;
    if (contentSchema.safeParse(content).success) {
        axios
            .post(`http://localhost:3000/update/todo`, {
                id: id,
                content: content,
            })
            .then((res) => {
                console.log(res);
                getData().then((r) => {
                    showData(r.data);
                });
            });
    } else {
        swal({
            text: "Short text",
            button: {
                text: "Close",
            },
        });
        getData().then((r) => {
            showData(r.data);
        });
    }
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

    document
        .querySelectorAll(".input_content_show")
        .forEach((el) =>
            el.addEventListener("click", (t) =>
                updateTodo(t, t.target.dataset.id)
            )
        );
    document
        .querySelectorAll(".input_content_show")
        .forEach((el) =>
            el.addEventListener("blur", (t) =>
                sendUpdateTodo(t, t.target.dataset.id)
            )
        );
});

observer.observe(list, { childList: true });
