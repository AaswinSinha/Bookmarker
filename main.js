//listener for form submit
document.getElementById('myform').addEventListener('submit',savebookmark);
//function savebookmark
function savebookmark(e)
{   //var for holding sitename and siteurl
	var siteName=document.getElementById('sitename').value;
	var siteUrl=document.getElementById('siteurl').value;
  if(!validateForm(siteName,siteUrl)){
       return false;
  }
	var bookmark={
		name:siteName,
		url:siteUrl
	}
	/*	
	localStorage.setItem('test', 'hello world!!');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
*/
//test if bookmark is null
     if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else
  {
  	//get bookmarks from array
  	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  	//add bookmarks to array 
  	bookmarks.push(bookmark);
  	//back to local storage
  	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }
     //clear form
     document.getElementById('myForm').reset();

   fetchBookmarks();

		//prevent from from submitting
	e.preventDefault();
}
//delete bookmarks
 function deleteBookmarks(url){
  //get bookmarks from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop throughout the bookmarks
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url==url){
        bookmarks.splice(i,1);
    }
  }
  //re set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //re call fetchbookmarks()
  fetchBookmarks();

 }
 function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //console.log(bookmarks)
  //get output id
  var bookmarksResult=document.getElementById('bookmarksResult');
  //build output
  bookmarksResult.innerHTML ='';
  for(var i=0; i<bookmarks.length; i++)
  {
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;
    bookmarksResult.innerHTML+= '<div class="well">'+
                                      '<h3>' +name+
                                      '<a class="btn btn-default" target="_blank" href="'+url+'">VISIT</a>' +
                                      '<a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">DELETE</a>' +
                                      '</h3>' +
                                      '</div>';
  }

}
function validateForm(siteName,siteUrl)
{
  if(!siteName || !siteUrl){
      alert(" please enter the required fields");
      return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
   alert("Please enter a valid URL");
   return false;
  }
  return true;
}
