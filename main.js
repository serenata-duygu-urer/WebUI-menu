var menuTrigger = function(){
  var menuDetails = document.getElementById('menu-details');
  console.log(menuDetails);
  if (menuDetails.style.display === ''){
    menuDetails.style.display = 'none';
  }else{
    menuDetails.style.display = '';
  }
}