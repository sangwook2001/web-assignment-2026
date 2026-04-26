// TODO:
// 자신의 Supabase 프로젝트 URL과 anon key를 입력해보세요.
const SUPABASE_URL = "https://ouvhytoclxrvizbpxzjd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmh5dG9jbHhydml6YnB4empkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMTM3NTQsImV4cCI6MjA5MjY4OTc1NH0.isTb9SaoZSwoFMIRGCzqb9CoL6EyJ5LtJP7fIVXaoMs";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

function renderTodos(todos) {
  const todoItems = todos
    .map(function (todo) {
      return `
        <li>
          <strong>${todo.content}</strong>
          <div>완료 여부: ${todo.is_done ? "완료" : "진행 중"}</div>
          <div>생성일: ${todo.created_at}</div>
        </li>
      `;
    })
    .join("");

  todoList.innerHTML = todoItems;
}

async function loadTodos() {
  const { data, error } = await client
    .from("todo")
    .select("id, content, is_done, created_at")
    .order("created_at", { ascending: false }); // 최신순 정렬 추가

  if (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error.message);
    return;
  }

  renderTodos(data);
}

async function addTodo(event) {
  event.preventDefault();

  const content = todoInput.value.trim();

  if (!content) {
    alert("할 일을 입력해주세요.");
    return;
  }

  const { error } = await client
    .from("todo")
    .insert([{ content: content, is_done: false }]);

  if (error) {
    console.error("데이터 추가 중 오류 발생:", error.message);
    alert("추가에 실패했습니다.");
  } else {
    todoInput.value = "";

    await loadTodos();
  }
}

todoForm.addEventListener("submit", addTodo);

document.addEventListener("DOMContentLoaded", loadTodos);
