package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/header")
public class header extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public header() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		System.out.println(type);
		if( type.equals("info") ) {
			Object id = request.getSession().getAttribute("id");
			System.out.println(id);
			response.getWriter().print(id);
		} else if ( type.equals("logout") ) {
			request.getSession().setAttribute("id", null);
		}
		
	}
}
