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
    is_load = 0;
    is_display = 0;
    is_error = 0;

if (video){
  var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  // input.disabled = true;
  // take.disabled = true;
  getVideo();

  function getVideo() {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(localMediaStream => {
      is_load = 1;
      video.srcObject = localMediaStream;
      video.play();
      }).catch(err => console.log());
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
    filter_64.value = select_photo.value;
  }

  function changesubimg($id){
      id = $id;
      var img = document.getElementById($id);
      canvassize(img, 75, 75);
      click = 1;
      input.disabled = false;
      take.disabled = false;
  }

  //take photo button

  function takephoto(){
    if (input.files[0]){
      var img = document.getElementById(id);
      if (click === 1)
        canvassize(img, imgWidth / 6.6, imgHeight / 5);
    }else{
      if (click === 1){
        if (is_load === 1){
            snap();
            //input hidden
            img64.value = canvas.toDataURL().substring(22);
            filter_64.value = select_photo.value;
        }else
          alert("Please choose a stickers 1");
      }else
        alert("Please choose a stickers 2");
    }
  }
}
//display input image


function display(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    // if (reader.result === null){
      // is_display = 1;
      reader.onload = function(event) {
        // var i = ;
        if (reader.result.search("image") > -1){
          console.log(reader.result.search("image"));
          // is_display = 1;
          // is_error = 1;
          var img = document.createElement('img');
          img.setAttribute('id', "imgP");
          img.setAttribute('src',event.target.result);
          img.style.filter = select_photo.value;
          photo.innerHTML = '';
          photo.insertBefore(img, photo.firstChild);
          input.filter = select_photo.value;
        }
        else
          // is_error = 1;
          //is_display = 1;
          alert("Plz Choose a good file.");
        // }
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
    // if (click === 1){
      display(input);
      ch();
      take.disabled = false;
    // }
    // else
      // alert("Please choose a stickers");
  });
}

//file
function ch(){
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#file-js .file-name');
    fileName.textContent = fileInput.files[0].name;
  }
  console.log(is_display);
  console.log(is_error);
  if (is_display === 1)
    display_vedio.style.display = "none";
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

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://10.12.100.72/Camagru/posts/add_like/"+id, true);
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
    var comment = document.getElementById('comment_text'+j).value.trim();
    var params = "comment="+comment;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.12.100.72/Camagru/posts/add_comment/"+id, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
      if (comment && comment.length < 100){
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
    //delete elemet
    elem_dlt.parentNode.removeChild(elem_dlt);
    //decrement nbr
    var r = +p - +1;
    p0.innerHTML = "&nbsp" + r;
  }
  xhr.send();
}

//delete image from galery

function dlt_g_ajax(id, j){
  var elem_dlt = document.getElementById("img_dlt"+j);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://10.12.100.72/Camagru/cameras/delete_preview/"+id, true);
  xhr.onload = function(){
        elem_dlt.parentNode.removeChild(elem_dlt);
  }
  xhr.send();
}