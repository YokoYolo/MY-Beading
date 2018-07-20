


document.getElementById('dropdownMenuButton')

$("#dropdownMenuButton, .dropdown-menu").hover(function(){
  $('.dropdown-menu').toggleClass('show') 
  console.log('hello');
})

var myIndex = 0;
carousel();
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 4000); // Change image every 4 seconds
}


function myFunction() {
    // Declare variables
    var input, filter, h4, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    h4 = document.getElementById("h4");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < h4.length; i++) {
        a = h4[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            h4[i].style.display = "";
        } else {
            h4[i].style.display = "none";
        }
    }
}



// $('.dropdown-menu').hover(function(){
//   $('.dropdown-menu').toggleClass('show') 
//   console.log('hello');
// })
