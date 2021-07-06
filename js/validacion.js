document.getElementById("fboton").addEventListener("click",validar);

 function validarnom(name) {
  const exprecionRegular = /^[A-Za-z\s]+$/;
  if (exprecionRegular.test(String(name))) {
    console.log("nombre valido");
    return true;
  } else {
    console.log("nombre invalido");
    return false;
  }
}
function valmail(ema) {
  const exprecionRegular = /^([a-zA-Z0-9_\.\-])+\@(([a-z\-])+\.)+([a-z]{2,4})+$/;
  if (exprecionRegular.test(String(ema))) {
    console.log("email valido");
    return true;
  } else {
    console.log("email invalido");
    return false;
  }
}
function  validar() {
var control=0;
var name=document.f1.nombre.value;
 var ema=document.f1.mail.value;
 var msg=document.f1.mensaje.value;


if (name==""||!(validarnom(name)) ){

        	document.getElementById("fnombre").style.background="#FC220D";
          control=1;
        	
	
	}else{
		document.getElementById("fnombre").style.background="white";
	}

	if(ema==""||!(valmail(ema))){
        	
        		document.getElementById("fmail").style.background="#FC220D";
        	control=1;

        }else{
        	document.getElementById("fmail").style.background="white";
        }

    if (msg=="") {
    	document.getElementById("fmensaje").style.background="#FC220D";
    	console.log("no dejo ningun mensaje");
      control=1;
        	

    }else{
    	document.getElementById("fmensaje").style.background="white";
    }
    if (control==0) {
    document.getElementById("fcont").submit();
  }else{
    return
  }
 
   
}
