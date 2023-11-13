package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.member.MemberDao;
import model.member.MemberDto;

/*
 	Servlet implementation class MemberController
 
 	기능 : 로그인, 회원가입, 아이디찾기, 비밀번호 찾기, 회원탈퇴, 회원수정
 */

@WebServlet("/MemberController")
public class MemberController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public MemberController() {
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    // 로그인 ------------
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 요청
		String id = request.getParameter("id");				
		System.out.println(id);
		String password = request.getParameter("password");	
		System.out.println(password);
		
		// Dao 에게 전달
		boolean r = MemberDao.getInstance().MemberLogin(id, password);
		
		// 응답하기
		response.getWriter().print(r);
		
		request.getSession().setAttribute( "id", id ); 
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
	// 회원가입 -------------
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// 요청
		String id = request.getParameter("id");	System.out.println(id);
		String password = request.getParameter("password");	System.out.println(password);
		String name = request.getParameter("name");	System.out.println(name);
		String birthdate = request.getParameter("birthdate");	System.out.println(birthdate);
		String gender = request.getParameter("gender");	System.out.println(gender);
		String address = request.getParameter("address");	System.out.println(address);
		String phone = request.getParameter("phone");	System.out.println(phone);
		
		// Dao 에게 전달
		boolean r = MemberDao.getInstance().MemberSignUp(id, password, name, birthdate, gender, address, phone);
		
		// 응답
		response.getWriter().print(r);
		
	}

}
