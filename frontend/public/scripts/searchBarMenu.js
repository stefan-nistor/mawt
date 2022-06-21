

const searchBar = () =>{
    

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown");
    aTag = ul.getElementsByTagName('a');

    

    let ok=0;
    for (i = 0; i < aTag.length; i++) {
      a = aTag[i].textContent;
      
      if (a.toUpperCase().indexOf(filter) > -1) {
        aTag[i].style.display = "";
        
      } else {
        aTag[i].style.display = "none";
      }
    }
    
    
}




