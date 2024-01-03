const enterBtn = document.getElementById("enter-btn");
const user = document.getElementById("user");
const allMoney = document.getElementById("all-money");
const userName = document.querySelector(".user-name");
const userMoney = document.querySelector(".user-money");
const enterDate = document.querySelector(".enter-date");
const addInfoForm = document.querySelector(".add-infoForm");
const addBtn = document.getElementById("add");
const changeMoney = document.getElementById("change-money");
const typeMoney = document.getElementById("type-money");
const comment = document.getElementById("comment");
const allCheck = document.getElementById("all-check");
const check = document.getElementsByClassName("check");
const checkDelete = document.getElementById("check-delete");
const moneyList = document.querySelector(".money-list");
const filterEarning = document.getElementById("filter-earning");
const filterOutlay = document.getElementById("filter-outlay");
const filterAll = document.getElementById("filter-all");

const newDate = new Date();
let SumEarning = 0;
let SumOutlay = 0;

//--------------- modal start ---------------------
let myModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {}
);

document.onreadystatechange = function () {
  enterDate.innerText = newDate.toLocaleDateString();
  document.querySelector(".money-list-date").innerText =
    newDate.toLocaleDateString();
  myModal.show();
};

enterBtn.addEventListener("click", function () {
  if (user.value == "" || allMoney.value == "") {
    alert("Iltimos barcha maydonlarni to'ldiring!");
  } else {
    if (isNaN(allMoney.value)) {
      alert("Iltimos summa maydoniga son kiriting!");
      allMoney.value = "";
    } else {
      userName.innerText = user.value;
      userMoney.innerText = allMoney.value + " so'm";
      myModal.hide();
    }
  }
});
//--------------- modal end ---------------------

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (changeMoney.value == "" || comment.value == "") {
    alert("Iltimos barcha maydonlarni to'ldiring!");
  } else {
    const newLi = document.createElement("li");
    newLi.classList.add(
      "list-group-item",
      "filter-list",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mx-3",
      "py-3"
    );
    if (typeMoney.value == "earning") {
      SumEarning += parseFloat(changeMoney.value);
      document.querySelector(".account-earning").innerText = SumEarning;
      allMoney.value =
        parseFloat(allMoney.value) + parseFloat(changeMoney.value);
      userMoney.innerText = allMoney.value;
      document.querySelector(".money-list-earning").innerText =
        "+ " + SumEarning;
      let liChild = `<div class="filters d-flex align-items-center">
          <div class="form-check me-2">
            <input class="check list-check form-check-input" type="checkbox" value="">
          </div>
          <i class="bi bi-arrow-bar-down filterIcon d-inline-block me-3 bg-success text-white rounded"></i>
          <div>
            <p class="account-earning m-0">${comment.value}</p>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="filters text-end me-2">
            <p class="account-earning text-success m-0">${changeMoney.value}</p>
            <span class="money-comment">${newDate.toLocaleDateString()}</span>
          </div>
          <a href="#" class="p-2"><i class="bi bi-trash-fill h3 text-danger"></i></a>
        </div>`;
      newLi.innerHTML = liChild;
      moneyList.appendChild(newLi);
    } else {
      if (parseFloat(allMoney.value) < parseFloat(changeMoney.value)) {
        alert("Hamyoningizda mablag' yetarli emas!");
      } else {
        SumOutlay += parseFloat(changeMoney.value);
        document.querySelector(".account-outlay").innerText = SumOutlay;
        allMoney.value =
          parseFloat(allMoney.value) - parseFloat(changeMoney.value);
        userMoney.innerText = allMoney.value;
        document.querySelector(".money-list-outlay").innerText =
          "- " + SumOutlay;
        let liChild = `<div class="filters d-flex align-items-center">
        <div class="form-check me-2">
          <input class="check list-check form-check-input" type="checkbox" value="">
        </div>
        <i class="bi bi-arrow-bar-up filterIcon d-inline-block me-3 bg-warning text-white rounded"></i>
        <div>
          <p class="account-outlay m-0">${comment.value}</p>
        </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="filters text-end me-2">
            <p class="account-outlay text-warning m-0">${changeMoney.value}</p>
            <span class="money-comment">${newDate.toLocaleDateString()}</span>
          </div>
          <a href="#" class="p-2"><i class="bi bi-trash-fill h3 text-danger"></i></a>
        </div>`;
        newLi.innerHTML = liChild;
        moneyList.appendChild(newLi);
      }
    }
    document.querySelector(".all-account").innerText = SumEarning + SumOutlay;
  }
  //----------------------Delete button bosilishi------------
  checkDelete.addEventListener("click", function () {
    for (let i = 0; i < check.length; i++) {
      if (
        check[i].checked &&
        check[i].closest("li").classList.contains("d-flex")
      ) {
        check[i].closest("li").remove();
      }
    }
    allCheck.checked = false;
  });
  const filterIcon = document.getElementsByClassName("filterIcon");
  //----------------------filter earning------------
  filterEarning.addEventListener("click", function () {
    for (let i = 0; i < filterIcon.length; i++) {
      filterIcon[i].closest("li").classList.replace("d-none", "d-flex");
      if (filterIcon[i].classList.contains("bi-arrow-bar-up")) {
        filterIcon[i].closest("li").classList.replace("d-flex", "d-none");
      }
    }
  });
  //----------------------filter outlay------------
  filterOutlay.addEventListener("click", function () {
    for (let i = 0; i < filterIcon.length; i++) {
      filterIcon[i].closest("li").classList.replace("d-none", "d-flex");
      if (filterIcon[i].classList.contains("bi-arrow-bar-down")) {
        filterIcon[i].closest("li").classList.replace("d-flex", "d-none");
      }
    }
  });
  
  //----------------------filter All---------------
  filterAll.addEventListener("click", function () {
    for (let i = 0; i < filterIcon.length; i++) {
      filterIcon[i].closest("li").classList.replace("d-none", "d-flex");
    }
  });
});

moneyList.addEventListener("click", function (e) {
  if (e.target.classList.contains("bi-trash-fill")) {
    e.target.closest("li").remove();
  }
});

allCheck.addEventListener("change", function () {
  if (allCheck.checked) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].closest("li").classList.contains("d-flex")) {
        check[i].checked = true;
      }
    }
  } else {
    for (let i = 0; i < check.length; i++) {
      check[i].checked = false;
    }
  }
});
