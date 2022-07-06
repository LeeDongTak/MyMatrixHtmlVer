// #### 토큰검사

const token = localStorage.getItem("x-access-token");
if(token){
    alert("로그아웃 후 이용해 주세요.");
    location.href = "./index.html";
}

const buttonSignin = document.getElementById('signin');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

buttonSignin.addEventListener("click", signin);

async function signin(event){
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    if(!currentEmail || !currentPassword){
        alert("아이디/ 페스워드가 입력돠지 얺았습니다. ");
        return false;
    }

    // 로그인 API 요청
    const config = {
        method: "post",
        url: url + "/signin",
        data: {
          email: currentEmail,
          password: currentPassword  
        }
    }
    try {
        const res = await axios(config);
        
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }
        localStorage.setItem("x-access-token", res.data.result.token);
        location.href = "./index.html";
        return true;
    } catch (err) {
        console.error(err);
    }
}