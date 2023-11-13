package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.member.MemberDao;
import model.member.MemberDto;

/**
 * Servlet implementation class MemberInfoController
 */
@WebServlet("/MemberInfoController")
public class MemberInfoController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public MemberInfoController() {
        // TODO Auto-generated constructor stub
    }
    
    // 로그인된 회원정보 호출하기
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 세션에서 아이디 가져오기
		Object object = request.getSession().getAttribute("id");
		//System.out.println(object);
		if( object != null ) {
			String mid = (String) object;
			
			// 이걸 안해서 오류 떴었음
			ObjectMapper objectMapper = new ObjectMapper();
			
			MemberDto result = MemberDao.getInstance().getMemberInfo(mid);
			String jsonArray = objectMapper.writeValueAsString(result);
			System.out.println(jsonArray);
			response.setContentType("application/json;charset=UTF-8");
	        response.getWriter().print(jsonArray);
		
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

	// 비밀번호 수정하기 
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doPut 도착");
		// 요청
		int mno = Integer.parseInt(request.getParameter("mno"));
		String pw = request.getParameter("pw");
		System.out.println(mno);
		System.out.println(pw);
		

		//DAO에 전달 및 결과
		boolean r = MemberDao.getInstance().updateNewPw(mno,pw);
		
		// 응답
		response.getWriter().print(r);
		
	}

	// 회원탈퇴하기
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("회원 탈퇴 및 삭제 기능 doDelete 입장");
		int mno = Integer.parseInt(request.getParameter("mno"));
		System.out.println("mno : " +mno);
		boolean r = MemberDao.getInstance().deleteinfo(mno);
		response.getWriter().print(r);
	}

}
