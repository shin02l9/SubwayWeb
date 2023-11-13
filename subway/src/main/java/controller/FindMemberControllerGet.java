package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.member.MemberDao;

/**
 * Servlet implementation class FindMemberControllerGet
 */
@WebServlet("/FindMemberControllerGet")
public class FindMemberControllerGet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FindMemberControllerGet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 요청
		String findtypeParam = request.getParameter("findtype");
		int findtype = 0;

		if (findtypeParam != null && !findtypeParam.isEmpty()) {
		    try {
		        findtype = Integer.parseInt(findtypeParam);
		    } catch (NumberFormatException e) {
		    }
		}	
		String idorname = request.getParameter("idorname");				
		String phone = request.getParameter("phone");	
		System.out.println(findtype);
		System.out.println(idorname);
		System.out.println(phone);
		
		// Dao 에게 전달
		String r = null;
		if( findtype == 1 ) {
			r = MemberDao.getInstance().findId(idorname, phone);
		} else if( findtype == 2 ) {
			r = MemberDao.getInstance().findPw(idorname, phone);
		}
		
		// 응답
		response.getWriter().print(r);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
