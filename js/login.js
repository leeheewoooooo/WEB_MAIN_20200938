

const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
   if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
   alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
    }
    // Sanitized된 값 반환
   return sanitizedInput;
    };
    
    const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
     // check_xss 함수로 비밀번호 Sanitize
    if (!sanitizedEmail) {
    // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
    // Sanitize된 비밀번호 사용
        return false;
    }
    if (emailValue.length < 5) {
        alert('아이디는최소5글자이상입력해야합니다.');
        return false;
        }
        if (passwordValue.length < 12) {
        alert('비밀번호는반드시12글자이상입력해야합니다.');
        return false;
        }
        const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
        if (!hasSpecialChar) {
        alert('패스워드는특수문자를1개이상포함해야합니다.');
        return false;
        }
        const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
        const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
        if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는대소문자를1개이상포함해야합니다.');
        return false;
        }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    session_set();
    loginForm.submit();
    };
    document.getElementById("login_btn").addEventListener('click', check_input);

    const idsave_check = document.getElementById('idSaveCheck');

    if(idsave_check.checked == true){
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1);
        alert("쿠키 값 :" + emailValue);
    }
    else{
        setCookie("id", emailValue.value, 0);
    }

    function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
        const emailInput = document.getElementById('typeEmailX');
         const idsave_check = document.getElementById('idSaveCheck');
         let get_id = getCookie("id");
         if(get_id) {
            emailInput.value = get_id;
            idsave_check.checked = true;
            }
            session_check(); // 세션 유무 검사
         }
         

         function session_set() { //세션 저장
            let session_id = document.querySelector("#typeEmailX");
            if (sessionStorage) {
                sessionStorage.setItem("Session_Storage_test", session_id.value);
            } else {
                alert("로컬 스토리지 지원 x");
                }
         }

         function session_get(){ //세션 읽기
            if (sessionStorage) {
                return sessionStorage.getItem("Session_Storage_test");
                } else {
                alert("세션 스토리지 지원 x");
                }
         }

         function session_check() { //세션 검사
            if (sessionStorage.getItem("Session_Storage_test")) {
             alert("이미 로그인 되었습니다.");
             location.href='../login/index_login.html'; // 로그인된 페이지로 이동
            }
        }
        