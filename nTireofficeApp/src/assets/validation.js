function validateemail(emailid){

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(emailid) == false)
  {
     return false;
  }
  else{
      return true;
  }
}

exports.validateemail=validateemail;
