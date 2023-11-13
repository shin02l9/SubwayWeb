
console.log(" mypage JS 실행")

showmyinfo()
// 초기화면 출력 (회원정보, 마일리지) ------------------------------------
function showmyinfo() { // showmyinfo s

	$.ajax({
		url : "/subway/MemberInfoController",
		method : "get",
		success : function f(r){;
			console.log(r)
			let contentDiv = document.querySelector(".content");
		    let HTML = `
		    <div class="infoBox"> <!-- 회원정보 -->
				<h3> 안녕하세요. </h3>
				<p> <span class="infospan"> ${r.name} </span>님</p>
				<button onclick="infoManage()" class="mypage_btn info_btn" > 회원정보변경 </button>
			</div> <!-- 회원정보 end -->
			
			<div class="milBox"> <!-- 마일리지 -->
				<h3> 마일리지 </h3>
				<p> <span class="milspan"> 0 </span>원</p>
				<button onclick="milManage()" class="mypage_btn mil_btn" > 마일리지관리 </button>
			</div> <!-- 마일리지 end -->
		    `;
		    contentDiv.innerHTML = HTML;
	    } ,
		error : function f(r){ console.log("오류" +r)}
	})

    
} //  showmyinfo e


// 회원정보 출력 (+ 수정, 탈퇴 버튼 출력) ------------------------------------
function infoManage() { // infoManage s
	console.log('infoManage JS 입장')
	$.ajax({
		url : "/subway/MemberInfoController",
		method : "get",
		success : function f(r){
			console.log(r)
			console.log(r.id)
			
			let contentDiv = document.querySelector(".content");
		    let HTML = `
		    <div> <!-- 회원정보 -->
				<div class="infoBtnBox">
					<span class="infotitle"> 회원정보 </span>
					<button onclick="updateNewPwView(${r.mno},${r.pw})" class="infoPwBtn IB" type="button"> 비밀번호변경</button>
					<button onclick="deleteinfoView(${r.mno},${r.pw})" class="infoDeleteBtn IB" type="button"> 회원탈퇴 </button>
				</div>
					<div class="infoValBox1">
						<div class="val"><span class="infoId valTitle"> 아 이 디  </span> 
						<span class="infoId value">${r.id}</span>
					</div>
				</div>
				<div class="infoValBox2">
					<div class="val valB"><span class="infoName valTitle"> 이  름  </span>	
					<span class="infoId value">${r.name}</span> 
					</div>
					<div class="val valB"><span class="infoBirthday valTitle"> 생년월일  </span> 
					<span class="infoId value">${r.birthdate}</span> 
					</div>
					<div class="val valB updatePhoneBox"><span class="infoPhone valTitle"> 전화번호  </span>
					<span class="infoId value">${r.phone}</span> 
					</div>
				</div>
				<div class="BTN"> <button onclick="showmyinfo()" class="backBtn" type="button"> 뒤로가기 </button> </div>
			</div> <!-- 회원정보 end-->
		    `;
		    contentDiv.innerHTML = HTML;
		} ,
		error : function f(r){ console.log(r)}
	})
	
	console.log(r.mno);

} //  infoManage e

/*// 전화번호 변경폼 출력 ------------------------------------
function updatePhoneView(){
	let updatePhone = document.querySelector(".updatePhoneBox");
    let HTML = `
    <span class="infoPhone valTitle"> 전화번호  </span> 
	<span class="infoId value"><input class="updatePhone infoinput " type="text"></span> 
	<span class="infoPw valTitle"> 비밀번호  </span> 
	<span class="infoId value"><input class="updatePw infoinput " type="text"></span> 
    `;
    updatePhone.innerHTML = HTML;
    
    let updatePhonebtn = document.querySelector(".BTN");
    let HTML2 = `
    <button onclick="updatePhone()" class="backBtn" type="button"> 확인 </button>
    `;
    updatePhonebtn.innerHTML = HTML2;

}*/

// 비밀번호 변경폼 출력 ------------------------------------
function updateNewPwView(mno, pw){
	let updateNewPw = document.querySelector(".infoValBox2");
    let HTML = `
	    <div class="val valB"><span class="beforePwTit valTitle"> 전 비밀번호  </span>	
		<span class="infoId value"><input class="updateForPw beforePw" type="password"></span> 
		</div>
		<div class="val valB"><span class="newPwTit valTitle"> 새로운 비밀번호  </span> 
		<span class="infoId value"><input class="updateForPw newPw" type="password"></span> 
		</div>
		<div class="val valB updatePhoneBox"><span class="confirmPwTit valTitle"> 비밀번호 확인  </span>
		<span class="infoId value"><input class="updateForPw confirmPw" type="password"></span> 
		</div>
	    `;
    updateNewPw.innerHTML = HTML;
    let updatePhonebtn = document.querySelector(".BTN");
    let HTML2 = `
	    <button onclick="updateNewPw(${mno},${pw})" class="backBtn" type="button"> 확인 </button>
	    `;
    updatePhonebtn.innerHTML = HTML2;

}

// 비밀번호 변경 로직
function updateNewPw(mno, pw){
	console.log('비밀번호 변경 JS 도착')
	let beforePw = document.querySelector('.beforePw');
	let newPw = document.querySelector('.newPw');
	let confirmPw = document.querySelector('.confirmPw');
	console.log(beforePw.value)
	console.log(newPw.value)
	console.log(confirmPw.value)
	
	console.log(mno)
	
	if( beforePw.value == pw ){
		if( newPw.value == confirmPw.value ){
			$.ajax({
				url : "/subway/MemberInfoController",
				data : { 'mno' : mno, 'pw' : newPw.value },
				method : "put",
				success : function f(r){
					if(r){
						alert('[ 수정 성공 ]'); 
						showmyinfo();
					}else{
						alert('[ 수정 실패 ]');
					}
				}
			});	
		} else  { alert('[ 비밀번호 확인란 불일치 ]') }
	} else { alert('[ 현재 비밀번호 불일치 ]') }

}


// 회원탈퇴 폼 출력 ------------------------------------
function deleteinfoView(mno, id, pw){
	let updateNewPw = document.querySelector(".infoValBox2");
    let HTML = `
	</div>
	<div class="val valB"><span class="deleteinfoTit valTitle"> 비밀번호 입력 </span> 
	<span class="infoId value"><input class="deleteinfoPw deletePw" type="password"></span> 
	</div>
	<div class="val valB updatePhoneBox"><span class="deleteinfoTit valTitle"> 비밀번호 확인  </span>
	<span class="infoId value"><input class="deleteinfoPw deleteconfirmPw" type="password"></span> 
	</div>
	<div><p class="deleteConfirmMessage"> 소지한 마일리지 또한 모두 삭제됩니다. <br/> 정말 회원을 탈퇴 하시겠습니까? </p></div>
    `;
    updateNewPw.innerHTML = HTML;
    let updatePhonebtn = document.querySelector(".BTN");
    let HTML2 = `
    <button onclick="deleteinfo(${mno},${id},${pw})" class="backBtn" type="button"> 확인 </button>
    `;
    updatePhonebtn.innerHTML = HTML2;
}

// 회원탈퇴 로직
function deleteinfo(mno, pw){
	let deletePw = document.querySelector('.deletePw');
	let deleteconfirmPw = document.querySelector('.deleteconfirmPw');
	console.log(deletePw.value)
	console.log(deleteconfirmPw.value)
	console.log(mno)
	if( pw == deleteconfirmPw.value){
		if( deletePw.value == deleteconfirmPw.value){
			$.ajax({
				url : "/subway/MemberInfoController",
				data : { 'mno' : mno },
				method : "delete",
				success : function f(r){
					if(r){
						alert('[ 회원탈퇴 성공 ]'); 
						location.href = "/subway/jsp/main.jsp";
					}else{
						alert('[ 회원탈퇴 실패 ]');
					}
				}
			});	
		}
	} else {alert('[ 비밀번호 불일치 ]')}
}

// 마일리지 적립 사용 현황 출력 ------------------------------------
function milManage() { // milManage s

} //  milManage e