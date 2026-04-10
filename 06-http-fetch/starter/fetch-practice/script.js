const loadButton = document.querySelector("#load-button");
const postList = document.querySelector("#post-list");

async function loadPosts() {
  postList.innerHTML = "<p>데이터를 불러오는 중입니다...</p>";

  const response = await fetch("https://koreandummyjson.vercel.app/api/posts");
  const data = await response.json();

  const postCards = data.posts
    .slice(0, 7)
    .map(function (post) {
      return `
        <article class="post-card">
          <h2>${post.title}</h2>
        </article>
        `;
    })
    .join("");

  postList.innerHTML = postCards;
}

loadButton.addEventListener("click", loadPosts);
