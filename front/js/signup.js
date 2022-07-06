// #### 토큰검사

const token = localStorage.getItem("x-access-token");
if(token){
    alert("로그아웃 후 이용해 주세요.");
    location.href = "./index.html";
}

// 입력값 유효성 검사

// 이메일
const inputEmail = document.getElementById('email');
const emailMessage = document.querySelector('div.email_message');
inputEmail.addEventListener("input", isValidEmail);

// 비밀번호
const inputPassword = document.getElementById('password');
const passwordMessage = document.querySelector('div.password_message');
inputPassword.addEventListener("input", isValidPassword);

// 비밀번호 확인 
const inputPasswordConfirm = document.getElementById('password_confirm');
const passwordConfirmMessage = document.querySelector("div.password_confirm_message");
inputPasswordConfirm.addEventListener("input", isValidPasswordConfirm);

// 닉네임 
const inputNickname = document.getElementById('nickname');
const nicknameMessage = document.querySelector("div.nickname_message");
inputNickname.addEventListener("input", isValidNickname);


// 이메일 형식 검사
function isValidEmail(event){
    const currentEmail = inputEmail.value;
    const emailReg = 
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if(!emailReg.test(currentEmail)){
        emailMessage.style.visibility = "visible";
        return false;
    }
    emailMessage.style.visibility = "hidden";
    return true;
}

// 비밀번호 형식 검사
function isValidPassword(event){
    const currentPassword = inputPassword.value;
    const passwordReg = 
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if(!passwordReg.test(currentPassword)){
        passwordMessage.style.visibility = "visible";
        return false;
    }
    passwordMessage.style.visibility = "hidden";
    return true;
}

// 비밀번호 확인 검사
function isValidPasswordConfirm(event){
    const currentPassword = inputPassword.value;
    const currentPasswordConfirm = inputPasswordConfirm.value;

    if(currentPassword !== currentPasswordConfirm){
        passwordConfirmMessage.style.visibility = "visible";
        return false;
    }
    passwordConfirmMessage.style.visibility = "hidden";
    return true;
}

// 닉네임 형식 검사
function isValidNickname(event){
    const currentNickname = inputNickname.value;
    if(currentNickname.length < 2 || currentNickname.length > 10){
        nicknameMessage.style.visibility = "visible";
        return false;
    }
    nicknameMessage.style.visibility = "hidden";
    return true;
}

// ##########  회원가입 API 요청
const buttonSignup = document.getElementById('signup');
buttonSignup.addEventListener("click", signup);

async function signup(event){
    const isVaildReq = 
        isValidEmail() &&
        isValidPassword() &&
        isValidPasswordConfirm() &&
        isValidNickname();

    if(!isVaildReq){
        alert("회원 정보를 확인해 주세요");
    }
    
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    const currentNickname = inputNickname.value;

    const config = {
        method: "post",
        url: url + "/user",
        data: {
            email: currentEmail,
            password: currentPassword,
            nickname: currentNickname
        }
    }
    try {
        const res = await axios(config);
       
        if(res.data.code === 400){
            alert(res.data.message);
            location.reload();
            return false;
        }
        if(res.data.code === 200){
            alert(res.data.message);
            location.href = './signin.html';
            return true;
        }
        
    } catch (err) {
        console.error(err);
    }
}
