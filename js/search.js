/**function googleSearch() {
    const searchTerm = document.getElementById("search_input").value; 
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank"); 
     return false;
     }**/
const googleSearch=()=>{
    const searchTerm = document.getElementById("search_input").value; 
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank"); 
     return false;
}