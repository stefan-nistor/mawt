

const myFunction = () =>{
    

    document.getElementById("dropdownHidro").style.display="block";
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("hidroInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdownHidro");
    li = ul.getElementsByTagName('li');

    

    let ok=0;
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        if(ok===0){
           localStorage.setItem("hidro", txtValue);ok=1;}
      } else {
        li[i].style.display = "none";
      }
    }
    console.log("din local " + localStorage.getItem("hidro") + " aici");
    
}



const dissapear = () =>{

    input = document.getElementById("hidroInput");
    input.value=localStorage.getItem("hidro");
    
    document.getElementById("dropdownHidro").style.display="none";
     location.reload();
    
}


