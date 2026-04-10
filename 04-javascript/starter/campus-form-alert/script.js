const clubForm = document.querySelector("#club-form");
const studentNameInput = document.querySelector("#student-name");
const studentIdInput = document.querySelector("#student-id");
const studentEmailInput = document.querySelector("#student-email");
const clubNameInput = document.querySelector("#club-name");
const partSelect = document.querySelector("#part");
const reasonInput = document.querySelector("#reason");

function createAlertMessage() {
  const studentName = studentNameInput.value;
  const studentId = studentIdInput.value;
  const studentEmail = studentEmailInput.value;
  const clubName = clubNameInput.value;
  const part = partSelect.value;
  const reason = reasonInput.value;

  return `${studentName}님의 동아리 지원서가 성공적으로 제출되었어요 😎

이름: ${studentName}
학번: ${studentId}
이메일: ${studentEmail}
관심 동아리: ${clubName}
지원 분야: ${part}
지원 이유: ${reason}`;
}

clubForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const idValue = studentIdInput.value;

  if (idValue === "" || isNaN(idValue)) {
    alert("학번에는 숫자만 입력해 주세요");
    studentIdInput.focus();
    return;
  }

  const message = createAlertMessage();
  alert(message);
});

const idWarning = document.querySelector("#id-warning");

studentIdInput.addEventListener("input", function() {
  const value = this.value;

  if (/[^0-9]/.test(value)) {
    idWarning.style.display = "block";
  } else {
    idWarning.style.display = "none";
  }
});
