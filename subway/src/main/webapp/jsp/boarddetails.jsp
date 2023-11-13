
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시물 상세 정보</title>
	<link href="/subway/css/boarddetails.css" rel="stylesheet">
     <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>-->
</head>
<body>
	
	<%@include file = "header.jsp" %>

	
	
	<div class="bdwrap">
	
		<h1>게시물 상세 정보</h1>
		<div class="board">
		    <h2 class="info btitle"></h2>
		    <div class="board_contents">
			    <div class="info bno"></div>
			    <div class="info id"></div>
			    <div class="info bdate"></div>
			    <div class="content bcontent"></div>
			    <div class="info hits"></div>
			    <div class="info pname"></div>
			    <div class="info stars"></div>
			</div>
		    <div class="btn-group">
		    </div>
	    </div>
	    
	    <div class="comments">
	    	<div class="comment_write">
	    		<input class="commentinput" type="text" placeholder="댓글을 남겨주세요!">
	    		<button class="btn btn-comment" onclick="commentWrite()">작성</button>
	    	</div>
	    	<div class="comment_view">

<!-- 	    	
	    		<div class="comment_box">
		    		<div class="comment_top">
		    			<span class="mno">작성자</span>
		    		</div> 
		    		<div class="content">
		    			내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
		    		</div>
		    		<div class="cdate">
		    			2023-11-11
		    		</div>
	    		</div> -->
	    		
	    	</div>
	    </div>
	</div>
	
	<%@include file = "footer.jsp" %>
	
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/subway/js/boarddetils.js" type="text/javascript"></script>
	
</body>
</html>