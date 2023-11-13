package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.board.CommentsDao;
import model.board.CommentsDto;
import model.member.MemberDao;

/*
기능 : 
	[C] : 해당 게시물에 대한 댓글 가져오기 
	[R] : 댓글 달기
	[D] : 댓글 삭제
*/
@WebServlet("/CommentsController")
public class CommentsController extends HttpServlet {
	private static final long serialVersionUID = 1L;


    public CommentsController() {
    }

    // 해당 게시물에 대한 댓글 가져오기 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int bno = Integer.parseInt(request.getParameter("bno"));
		
		ArrayList<CommentsDto> result = CommentsDao.getInstance().showComment(bno);
		
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonArray = objectMapper.writeValueAsString(result);
		System.out.println("doget : " + jsonArray);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(jsonArray);
	}

	// 댓글 달기
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int mno = -1;
		Object object = request.getSession().getAttribute("id");
		if( object != null ) {
			mno = MemberDao.getInstance().getMno((String)object);
		}
		
		int bno = Integer.parseInt(request.getParameter("bno"));
		
		String content = request.getParameter("content");
		
		response.setContentType("application/json;charset=UTF-8");
		
		if(mno == -1) { // 비로그인이라면 false 반환
			response.getWriter().print(false);	
		}else {
			boolean result = CommentsDao.getInstance().writeComment(mno, content, bno);
			response.getWriter().print(result);	
		}
	}
	
	// 댓글 삭제 - 본인만 가능
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int cno = Integer.parseInt(request.getParameter("cno")); 
		
		boolean result = CommentsDao.getInstance().deleteComment(cno);
		
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(result);
	}
}
