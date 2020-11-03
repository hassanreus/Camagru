document.addEventListener('DOMContentLoaded', () => {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get all "navbar" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

////webcam

//All glob variable have the same type var
var video = document.getElementById('video'),
    photo = document.getElementById('photo'),
    select_photo = document.getElementById("photo-filter"),
    take = document.getElementById('take'),
    img64 = document.getElementById('img64'),
    sticker64 = document.getElementById('sticker64'),
    filter_64 = document.getElementById('filter'),
    input = document.getElementById('inpFile'),
    fileInput = document.querySelector('#file-js input[type=file]'),
    display_vedio = document.getElementById('display_vedio'),
    title_filter = document.getElementById('title_filter'),
    imgHeight = 0,
    imgWidth = 0,
    id,
    click = 0;

if (video){
  var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  input.disabled = true;
  take.disabled = true;
  getVideo();

  function getVideo() {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(localMediaStream => {      
      video.srcObject = localMediaStream;
      video.play();
      }).catch(err => console.error(err));
  }

  ///filter

  function ch_filter(){
      video.style.filter = select_photo.value;
      title_filter.innerHTML = "";
  }


  function snap(){
    // vedio with canvas
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      ctx.drawImage(video, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
      canvas.style.visibility = "hidden";
      canvas.style.position = "absolute";
  }

  //camera preview

  function canvassize(img, w, h){
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);
    canvas.style.visibility = "hidden";
    canvas.style.position = "absolute";
    sticker64.value = canvas.toDataURL().substring(22);
  }

  function changeSubImg($id){
      id = $id;
      var img = document.getElementById($id);
      canvassize(img, 75, 75);
      click = 1;
      input.disabled = false;
      take.disabled = false;
  }

  //take photo button

  function takephoto(){
    if (click === 1){
      if (input.files[0]){
        var img = document.getElementById(id);
        canvassize(img, imgWidth / 6.6, imgHeight / 5)
      }else{
        snap();
        //input hidden
        img64.value = canvas.toDataURL().substring(22);
        filter_64.value = select_photo.value;
      }
    }else
      alert("Please choose a stickers");
  }
}

// Dark mode
//TO CONTINUE
function setDark() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  // if (prefersDarkScheme)
   const theme = document.body.classList.toggle("dark-theme");
    document.cookie = "theme=" + theme;
}

//display input image

function display(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = document.createElement('img');
        img.setAttribute('id', "imgP");
        img.setAttribute('src',event.target.result);
        img.style.filter = select_photo.value;
        photo.innerHTML = '';
        photo.insertBefore(img, photo.firstChild);
        input.filter = select_photo.value;
    }
    reader.readAsDataURL(input.files[0]);
   }
}

// input security
if (input){
  fileInput.addEventListener("change", () => {
    var _URL = window.URL || window.webkitURL;
    if (file = input.files[0]) {
      img = new Image();
      img.onload = function() {
        imgHeight = this.height;
        imgWidth = this.width;
      };
      img.src = _URL.createObjectURL(file);
    }
    if (click === 1)
      ch();
    else
      alert("Please choose a stickers");
  });
}

//file
function ch(){
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-js .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
  display_vedio.style.display = "none";
  display(input);
}

/// display like && comment

var like = document.getElementById('like');
if (like)
  like.style.display = "none";
var btn_display_like = document.getElementById('btn_display_like');
var btn_display_comment = document.getElementById('btn_display_comment');
var comment = document.getElementById('comment');
if (comment)
  comment.style.display = "none";
var form_comment = document.getElementsByName('form_comment');
for (i = 0; i < form_comment.length; i++){
  form_comment[i].style.display = "none";
}
  

function display_like(){
  if (like.style.display == "none"){
    like.style.display = "block";
    comment.style.display = "none";
  }
  else
    like.style.display = "none";
}

function display_comment(){
  if (comment.style.display == "none"){
    comment.style.display = "block";
    like.style.display = "none";
  }
  else
    comment.style.display = "none";
}

function display_comment_post(j){
    if (form_comment[j].style.display == "none")
      form_comment[j].style.display = "block";
    else
      form_comment[j].style.display = "none";
}


// like and comment and buuton dlt in show view with help of ajax

function like_ajax_post(id, j){
  var p0 = document.getElementById('like_p'+j);
  var p = document.getElementById('like_p'+j).innerHTML;
  p = p.substring(6);

  var xhr = new XMLHttpRequest();http:
  //10.12.100.72/Camagru/cameras
  xhr.open("GET", "http://10.12.100.72/Camagru/posts/add_like/"+id, true);
  xhr.onload = function(){
      var r = +p + +this.responseText;
      p0.innerHTML = "&nbsp" + r;
  }
  xhr.send();
}

  function t_c(id, j){
    var p0 = document.getElementById('comment_p'+j);
    var p = document.getElementById('comment_p'+j).innerHTML;
    p = p.substring(6);
    var comment = document.getElementById('comment_text'+j).value;
    var params = "comment="+comment;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.12.100.72/Camagru/posts/add_comment/"+id, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
      if (comment && comment.length < 55){
          document.getElementById('comment_text'+j).value = "";
          var r = +p + +1;
          p0.innerHTML = "&nbsp" + r;
      }else
        alert('Plz enter a normal comment.');
    }
    xhr.send(params);
  }

//delete comment ajax

function dlt_f_ajax(id, j){
  var p0 = document.getElementById('all_comment_p');
  var p = p0.innerHTML;
  p = p.substring(6);
  var elem_dlt = document.getElementById("elem_to_dlt"+j);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://10.12.100.72/Camagru/posts/delete_comment/"+id, true);
  xhr.onload = function(){
      if (this.responseText != 1){
        //delete elemet
        elem_dlt.parentNode.removeChild(elem_dlt);
        //decrement nbr
        var r = +p - +1;
        p0.innerHTML = "&nbsp" + r;
      }
  }
  xhr.send();
}