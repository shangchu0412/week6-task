let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then((res)=>{
  data = res.data.data
  init(data)
})

//套票卡片區
const ticketCardArea = document.querySelector('.ticketCard-area');
const searchResultNum = document.querySelector('#searchResult-text');

//data資料渲染
function init(data) {
  let list = "";
  data.forEach((item) => {
    list += `<li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src="${item.imgUrl}" alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>`
  })
  ticketCardArea.innerHTML = list;
  searchResultNum.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
}
init(data);

//篩選區
const regionSearch = document.querySelector('.regionSearch');
const cantFind = document.querySelector('.cantFind-area');

//篩選選項切換
regionSearch.addEventListener('change', function (e) {
  const filterData = data.filter((item) => {
    if (e.target.value === item.area) {
      return item
    } else if (e.target.value === "") {
      return item
    }
  })
  init(filterData);
})

//新增套票
const form = document.querySelector(".addTicket-form");
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');
const addBtn = document.querySelector('.addTicket-btn')

//監聽星級有無在區間內
ticketRate.addEventListener('input', function () {
  const rateValue = parseInt(ticketRate.value);
  if (isNaN(rateValue) || rateValue < 1 || rateValue > 10) {
    Swal.fire({
      title: "輸入錯誤",
      text: "請輸入1到10之間的數字",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "確認"
    });
    ticketRate.value = "";
  }
})

//監聽有無填寫
const inputElements = form.querySelectorAll('input,select, textarea')
const messages = document.querySelectorAll('.alert-message');
inputElements.forEach((item, index) => {
  item.addEventListener('blur', function () {
    const message = messages[index];
    if (item.value.trim() === '') {
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  })
})

//新增套票
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (ticketName.value === '' || ticketImgUrl.value === '' || ticketRegion.value === '' || ticketDescription.value === '' || ticketNum.value === '' || ticketPrice.value === '' || ticketRate.value === '') {
    inputElements.forEach((item, index) => {
      const message = messages[index];
      if (item.value.trim() === '') {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
      }
    })
    Swal.fire({
      title: "未輸入",
      text: "還有資料尚未輸入",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "確認"
    });
  } else {
    let str = {};
    str.id = data.length;
    str.name = ticketName.value;
    str.imgUrl = ticketImgUrl.value;
    str.area = ticketRegion.value;
    str.description = ticketDescription.value;
    str.group = ticketNum.value;
    str.price = ticketPrice.value;
    str.rate = ticketRate.value;
    data.push(str);
    init(data);
    form.reset();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "新增成功",
      showConfirmButton: false,
      timer: 1500
    });
  }
});
