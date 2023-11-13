<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<title>admin</title>
	<link href="/subway/css/admin.css" rel="stylesheet">
	
	</head>
	
<body>
	<!-- 헤더 JSP 파일 호출 -->
	<%@ include file="./header.jsp" %>

		<div class="admin_wed"> <!-- 관리자 페이지 전체 레이아웃 s -->
			<div class="admin_wed2">
				<div class="menu_L_box">  <!-- 관리자 페이지 왼쪽 메뉴 s ------------------------------> 
					<h2> 관리자 </h2> <br/>
						<ul>
							<li><button onclick="order_status_view(1,0)" class="order_status menu_btn menu_L_btn"> 		   주문현황 </button></li>
							<li><button onclick="member_management_view(1)" class="member_management menu_btn menu_L_btn"> 회원관리 </button></li>
							<li><button onclick="review_management_view(1)" class="review_management menu_btn menu_L_btn"> 리뷰관리 </button></li>
						</ul>
						
				</div> <!-- 관리자 페이지 왼쪽 메뉴 e -->
					
		
			
				<div class="menu_R_box"> <!-- 관리자 페이지 오른쪽 출력 s ------------------------------>
					<!-- innerHTML -->
				
				</div> <!-- 관리자 페이지 오른쪽 출력 e -->
			</div>	
		</div> <!-- 관리자 페이지 전체 레이아웃 e -->




	<!-- 푸터 JSP 파일 호출 -->
	<%@ include file="./footer.jsp" %>
	<!-- 해당 페이지 JS 호출 -->
	<script src="/subway/js/admin.js" type="text/javascript"></script>
	<!-- Java 서블릿이랑 통신하기위해 호출했음 -->
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>

</body>
</html>