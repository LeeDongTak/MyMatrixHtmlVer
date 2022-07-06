function goUrl(url){ 
	if(url=="index"){
		location.href="./index.html";
	}else if(url=="signin"){
		location.href="./signin.html";
	}else if(url=="signup"){
		location.href="./signup.html";
	}else {
		return false;
	}
}	