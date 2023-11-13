console.log(" join JS 실행")

/* 샘플 회원 */
memberList = [ // 관리자의 회원번호 0 !
	{ mno: 0, id: 'admin', password: '0000', name: '관리자', birthdate: '', 	gender: 'x',  address : "대한민국", phone: 0000000000,  mil : 0},
];

/* 로그인 화면 먼저 노출되게 함수 호출 */
showLoginForm()
/* 메인 페이지로 돌아가는 함수 선언 */
function goToMain(){ location.href = "main.jsp"; }



/* -------------------------------------- 로그인 폼 출력 -------------------------------------- */
function showLoginForm() {
	//restRead()
    let contentDiv = document.querySelector(".content");
    let HTML = ` <h2>LOGIN</h2>
    <p>써브웨이 회원으로 로그인하시면 제공하는<br/>
	다양한 서비스를 이용할 수 있습니다.</p>
    <div class="contentSignUp">
        <div class="inputBox"> <h5> 아이디 </h5>
        <input type="text" class="idLogin id" ><br></div>
        <div class="inputBox"> <h5> 비밀번호 </h5>
        <input type="password" class="passwordLogin password" ><br></div>
        <div class="buttonBox">
	        <button onclick="login()" class="button buttonMain">로그인</button>
	        <button onclick="showSignUpForm()" class="button">회원가입</button>  <br/>
	        <button onclick="find_id_Form()" class="findId">아이디찾기</button> <span>|</span>
        	<button onclick="find_pw_Form()" class="findPw">비밀번호찾기</button>
        </div>
     </div>
    `;
    contentDiv.innerHTML = HTML;
}// showLoginForm e

/* -------------------------------------- 로그인 처리 -------------------------------------- */
function login() {
    let id = document.querySelector(".idLogin").value;
    let password = document.querySelector(".passwordLogin").value;
    
    	//유효성 검사 1
 		if( id == '' || password == ''){
			alert('[로그인실패] 회원 정보를 모두 입력해주세요.')
			return;
		 }
		 
    	// 객체로 묶기
		let loginData = {
			id : id,
			password : password
		}
		// loginData 객체를 서블릿에게 보내주고 회원 DB와 일치한지 결과 반환 받기 
		$.ajax({
			url : "/subway/MemberController" ,
			method : 'get' ,
			data : loginData ,
			success: function(r){ 
				if( r == "true"){
				console.log( '로그인 성공' );
				alert('[로그인성공]');
				goToMain(); 
				return;
				} else {alert('[로그인실패] 회원정보가 일치하지 않습니다.'); return; }
			},
		})
    

		/*//유효성 검사 2
		for( let i = 0; i<memberList.length; i++){
			if( id == memberList[i].id ){
				if( password == memberList[i].password ){
					alert('[로그인성공]');
					goToMain(); 
					return;
				} else {alert('[로그인실패] 비밀번호가 맞지 않습니다.'); return; }
			}
		}
		alert('[로그인실패] 회원정보가 없습니다.')*/
		
} // login e



/* -------------------------------------- 회원가입 폼 출력 -------------------------------------- */
function showSignUpForm() { // showSignUpForm s
    let contentDiv = document.querySelector(".content");
    let HTML =`<h2>회원가입</h2>
    <div class="contentSignUp">
        <div class="inputBox"><h5> 아이디 <span class="idText"></span></h5>
        	<input type="text" class="id"><br></div>
        <div class="inputBox"><h5> 비밀번호 <span class="passwordText"></span></h5>
        	<input type="password" class="password"><br></div>
        <div class="inputBox"><h5> 비밀번호확인 <span class="confirmPasswordText"></span></h5>
        	<input type="password" class="confirmPassword"><br></div>
        <div class="inputBox"><h5> 이름 </h5>
        	<input type="text" class="name"><br><div>
        <div class="inputBox"><h5> 생년월일 </h5>
       	 <input type="text" class="birthdate" placeholder="(YYYYMMDD) -제외"><br></div>
       	 
        <div class="inputBox">
		    <h5> 성별 </h5>
		    <div class="genderBox"> 
		        <input type="radio" class="gender" id="maleRadio" name="gender" value="남">
		        <label for="maleRadio">남성</label>
		        <input type="radio" class="gender" id="femaleRadio" name="gender" value="여">
		        <label for="femaleRadio">여성</label>
		        <br>
		    </div>
		</div>

        <div class="inputBox"><h5> 주소 </h5>
	        <input type="text" class="sample6_postcode address" placeholder="우편번호">
			<input type="button" class="phoneButton" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
			<input type="text" class="sample6_address address" placeholder="주소"><br>
			<input type="text" class="sample6_detailAddress address" placeholder="상세주소">
			<input type="text" class="sample6_extraAddress address" placeholder="참고항목">
        <br></div>
        <div class="inputBox"><h5> 휴대폰 번호 <span class="makePhoneKey"></span></h5>
        <select class="phone0">
		  	<option> 010 </option>
		  	<option> 011 </option>
		  	<option> 070 </option>
	 	 </select>
        <input type="text" class="phone1" maxlength="4"><input type="text" class="phone2" maxlength="4">
        <button onclick="makePhoneKey()" class="phoneButton">인증번호 받기</button>
        <br></div>
       	 <div class="inputBoxPhone"></div>
        <div class="buttonBox">
	        <button onclick="register()" class="button register">가입하기</button>
        </div>
    </div>
    `;
    contentDiv.innerHTML = HTML;
} //  showSignUpForm e

/* -------------------------------------- 다음 주소 API -------------------------------------- */
 function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.querySelector(".sample6_extraAddress").value = extraAddr;
            
            } else {
                document.querySelector(".sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.querySelector('.sample6_postcode').value = data.zonecode;
            document.querySelector(".sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.querySelector(".sample6_detailAddress").focus();
            
            // 주소 합치기 위함
			let address01 = document.querySelector('.sample6_postcode').value;
			let address02 = document.querySelector('.sample6_address').value;
			let address03 = document.querySelector('.sample6_detailAddress').value;
			let address04 = document.querySelector('.sample6_extraAddress').value;
			addressValue = `${address01} ${address02} ${address03} ${address04}`; 
        }
    }).open();
}// sample6_execDaumPostcode e
let addressValue = "";

/* ------------------------------ 인증번호 4자리를 위한 난수 생성하기 ------------------------------*/
let result;
function makePhoneKey(){ // makePhoneKey s

	let selectValue = document.querySelector('.phone0').value;
	let input1Value = document.querySelector('.phone1').value;
	let input2Value = document.querySelector('.phone2').value;
	
	if( selectValue != "" && input1Value != "" && input2Value != ""){
		document.querySelector(".inputBoxPhone").innerHTML = `
		<div class="inputBox"><h5> 인증번호 <span class="phoneKeyText"></span> </h5><input type="text" class="phoneKey" maxlength="4"><br><div>
		`;
		let min = 0;
	 	let max = 9999;
		let phoneKey = Math.floor(Math.random() * (max - min + 1)) + min;
		let makePhoneKey = document.querySelector(".makePhoneKey");
		makePhoneKey.innerHTML = '';
		
		// pad는 좌우에 특정한 문자열로 채우는 기능 padStart(자리수, 채울문자)
		result = String(phoneKey).padStart(4, '0')
		console.log (result)
		return;
	} else {
		let makePhoneKey = document.querySelector(".makePhoneKey");
		makePhoneKey.innerHTML = '빈칸을 입력 후 (인증번호 받기)를 눌러주세요.';
		}
		
	
}// makePhoneKey e

/* -------------------------------------- 회원가입 처리 -------------------------------------- */
function register() { 
	// 저장할 회원정보들 변수에 넣어두기
	let id = document.querySelector(".id").value;
    let password = document.querySelector(".password").value;
    let confirmPassword = document.querySelector(".confirmPassword").value;
    let name = document.querySelector(".name").value;
    let birthdate = document.querySelector(".birthdate").value;
	    let genderInput = document.querySelector('input[name="gender"]:checked');
		let gender = null;
		if (genderInput) {
		  gender = genderInput.value;
		}
    let address = document.querySelectorAll(".address").value;
    let selectValue = document.querySelector('.phone0').value;
	let input1Value = document.querySelector('.phone1').value;
	let input2Value = document.querySelector('.phone2').value;
    let phone = `${selectValue}${input1Value}${input2Value}`;
    	let phoneKeyInput = document.querySelector(".phoneKey");
    	let phoneKey = null;
    	if( phoneKeyInput != null ){
	    	if (phoneKeyInput.value != "") {
			  phoneKey = phoneKeyInput.value;
			}
		}
    let idLogin = false;
    let passwordLogin = false;
    let confirmPasswordLogin = false;
    let phoneKeyLogin = false;
    
    // ---------------------- 유효성 검사 (4가지)------------------------- 
    // 모든 빈칸
    if (id == "" || password == "" || name == "" || birthdate == "" || gender == null || address == "" || phone == "") {
        alert("모든 필드를 입력해주세요.");
        return;
    }
    // 1. 아이디 중복확인하기
    for( let i = 0; i<memberList.length; i++){
		console.log("for문 입장")
		if( id == memberList[i].id ){
			document.querySelector(".idText").innerHTML = '이미 사용중인 아이디입니다.'; idLogin = false; break;
		} else { document.querySelector(".idText").innerHTML = ''; idLogin = true;}
	}
	// 2. 비밀번호 4자리 이상 체크
    if ( password.length < 4 ){
		document.querySelector(".passwordText").innerHTML = '비밀번호를 4글자 이상 작성해주세요.'; passwordLogin = false; 
	} else { document.querySelector(".passwordText").innerHTML = ''; passwordLogin = true;}
	// 3. 비밀번호란과 확인란이 동일한지 체크하기
	if ( password != confirmPassword ){
		document.querySelector(".confirmPasswordText").innerHTML = '비밀번호가 다릅니다.'; confirmPasswordLogin = false; 
	} else { document.querySelector(".confirmPasswordText").innerHTML = ''; confirmPasswordLogin = true; }
	
	// 4. 인증번호 맞는지 확인하기
	if( phoneKey != result ){
		document.querySelector(".phoneKeyText").innerHTML = '인증번호가 틀렸습니다.';  phoneKeyLogin = false; 
	} else { document.querySelector(".phoneKeyText").innerHTML = ''; phoneKeyLogin = true; }
	
    // --------- 회원가입 정보 저장하고 가입 완료 페이지로 이동-------------------
    console.log("유효성검사 id : " +idLogin)
    console.log("유효성검사 pw : " +passwordLogin)
    console.log("유효성검사 comfPw : " +confirmPasswordLogin)
    console.log("유효성검사 pwKay : " +phoneKeyLogin)

    if( idLogin == true && passwordLogin == true && confirmPasswordLogin == true && phoneKeyLogin == true ) { //유효성 검사 모두 통과해야함
			// 세션에 있는 값 배열에 넣어놓고 그 이후에 받는 입력값을 저장해서 누적시키기
		memberList = JSON.parse(sessionStorage.getItem('memberList'))
		 if ( memberList == null ) { memberList = [] }
	    	// 회원 객체 만들기
	    let member = { 
						// mno: memberList.length == 0 ? 1 :  memberList[memberList.length-1].mno +1, 
	    			   id : id,
	    			   password : password,
	    			   name : name,
	    			   birthdate : birthdate,
	    			   gender : gender,
	    			   address : addressValue,
	    			   phone : phone,
	    			   mil : 0 
	    			   }
	    	
	    	// 회원객체를 서블릿에게 보내기 
	    	$.ajax({
				url : "/subway/MemberController" ,
				method : 'post' ,
				data :  member ,
				success: function(r){ 
					if( r == "true"){
						console.log( "회원가입 성공" );
						// 회원객체를 회원리스트배열에 푸쉬 및 세션에 올리기
					    //memberList.push(member); console.log (member);
					    //sessionStorage.setItem('memberList', JSON.stringify(memberList));
				    
					    let contentDiv = document.querySelector(".content");
					    let HTML = `
					    	<img class="checkImg" src="/subway/img/green-check.png">
					        <h2>환영합니다!</h2>
					        <p>가입이 완료되었습니다.<br/>로그인 화면으로 돌아가려면 아래 버튼을 클릭하세요.</p>
					        <div class="buttonBox"> 
					        	<a><button onclick="goToMain()" class="button buttonMain">홈으로</button>
					        	<button onclick="showLoginForm()" class="button">로그인 화면으로</button>
					        </div>
					    `;
					    contentDiv.innerHTML = HTML;
					    console.log (memberList)
					}else {
						
					}
					 }
			});
	

    }
} // register e


// 아이디 찾기 화면 출력 ------------------------------------------
function find_id_Form(){
	console.log('find_id  실행')
	let contentDiv = document.querySelector(".content");
    let HTML = ` <h2> 아이디 찾기 </h2>
    <div class="contentSignUp">
        <div class="inputBox"> <h5> 이름 </h5>
        <input type="text" class="idLogin name idorname" ><br></div>
        <div class="inputBox"><h5> 휴대폰 번호 <span class="makePhoneKey"></span></h5>
        <select class="phone0">
		  	<option> 010 </option>
		  	<option> 011 </option>
		  	<option> 070 </option>
	 	 </select>
        <input type="text" class="phone1" maxlength="4"><input type="text" class="phone2" maxlength="4">
        <button onclick="makePhoneKey()" class="phoneButton">인증번호 받기</button>
        <br></div>
       	 <div class="inputBoxPhone"></div>
        <div class="buttonBox">
	        <button onclick="find(1)" class="button register findid"> 아이디 찾기 </button>  <br/>
	        <button onclick="showLoginForm()" class="findId"> 뒤로가기 </button> <span>|</span>
	        <button onclick="find_pw_Form()" class="findId">비밀번호 찾기</button>
        </div>
     </div>
    `;
    contentDiv.innerHTML = HTML;
}

// 비밀번호 찾기 화면 출력 ------------------------------------------
function find_pw_Form(){
	console.log('find_pw  실행')
	let contentDiv = document.querySelector(".content");
    let HTML = ` <h2> 비밀번호 찾기 </h2>
    <div class="contentSignUp">
        <div class="inputBox"> <h5> 아이디 </h5>
        <input type="text" class="idLogin id idorname" ><br></div>
        <div class="inputBox"><h5> 휴대폰 번호 <span class="makePhoneKey"></span></h5>
        <select class="phone0">
		  	<option> 010 </option>
		  	<option> 011 </option>
		  	<option> 070 </option>
	 	 </select>
        <input type="text" class="phone1" maxlength="4"><input type="text" class="phone2" maxlength="4">
        <button onclick="makePhoneKey()" class="phoneButton">인증번호 받기</button>
        <br></div>
       	 <div class="inputBoxPhone"></div>
        <div class="buttonBox">
        	<button onclick="find(2)" class="button register"> 비밀번호 찾기 </button> <br/>
	        <button onclick="showLoginForm()" class="findId"> 뒤로가기 </button> <span>|</span>
	        <button onclick="find_id_Form()" class="findId">아이디 찾기</button>
        </div>
     </div>
    `;
    contentDiv.innerHTML = HTML;
}

// 찾기 버튼을 누른 후 ---------------------------------------------------
function find(findtype){
	let idorname = document.querySelector(".idorname").value;
    let phone0 = document.querySelector(".phone0").value;
    let phone1 = document.querySelector(".phone1").value;
    let phone2 = document.querySelector(".phone2").value;
    let phone = `${phone0}${phone1}${phone2}`;
    	let phoneKeyInput = document.querySelector(".phoneKey");
    	let phoneKey = null;
    	if( phoneKeyInput != null ){
	    	if (phoneKeyInput.value != "") {
			  phoneKey = phoneKeyInput.value;
			}
		}
    
    	//유효성 검사
 		if( idorname == '' || phone0 == '' || phone1 == '' || phone2 == ''){
			alert('[경고] 정보를 모두 입력해주세요.')
			return;
		 }
		 
	 // 객체로 묶기
	let findData = {
		findtype : findtype,
		idorname : idorname,
		phone : phone
	}
	$.ajax({
		url : "/subway/FindMemberControllerGet",
		data : findData,
		mathod : "post",
		success : function 함수명(r){
			console.log('회원정보 찾기 결과 : '+r)
			let contentDiv = document.querySelector(".content");
		    let HTML = `
		    <img class="checkImg" src="/subway/img/green-check.png">
	        <h2> 요청하신 회원정보를 찾았습니다.</h2>
	        <p> <span class="findData">"${r}"</span> 입니다.
	        <br/>로그인 화면으로 돌아가려면 아래 버튼을 클릭하세요.</p>
	        <div class="buttonBox"> 
	        	<a><button onclick="goToMain()" class="button buttonMain">홈으로</button>
	        	<button onclick="showLoginForm()" class="button">로그인 화면으로</button>
	        </div>
		    `;
		    contentDiv.innerHTML = HTML;
			},
	})
}

//---------------------------------------------------------------

