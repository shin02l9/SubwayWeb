package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.product.ProductsDao;
import model.product.ProductsDto;

/*
기능 : 
	[R] : 카테고리, 상세카테고리에 해당하는 제품 출력, 식별번호에 해당되는 제품 출력, 원하는 상품 리스트의 정보 반환
*/
@WebServlet("/ProductController")
public class ProductController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public ProductController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doGet");
		String type = request.getParameter("type");
		
		ObjectMapper objectMapper = new ObjectMapper();
		String json = "";
		
		if(type.equals("productPrint")) { // 카테고리, 상세카테고리에 해당하는 제품 출력
			int cateno = Integer.parseInt(request.getParameter("cateno"));		// 카테고리
			int category = Integer.parseInt(request.getParameter("category"));	// 상세 카테고리
			if(category == 0) {
				ArrayList<ProductsDto> result = ProductsDao.getInstance().getListAll(cateno);
				json = objectMapper.writeValueAsString(result);
				
			}else {
				ArrayList<ProductsDto> result = ProductsDao.getInstance().getListSelect(cateno, category);
				json = objectMapper.writeValueAsString(result);
			}
		}else if(type.equals("productInfo")) { // pno에 해당되는 제품 출력
			
			int pno = Integer.parseInt(request.getParameter("pno"));
			
			
			ProductsDto result = ProductsDao.getInstance().getInfo(pno);
			json = objectMapper.writeValueAsString(result);
		}else if(type.equals("productsInfo")) { // 원하는 pnoList의 정보 반환
			
			// Ajax 요청에서 전달된 JSON 문자열을 읽어서 ArrayList로 변환
			String pnoListJson = request.getParameter("pnoList");
			ArrayList<String> pnoList = new ArrayList<>();
			ArrayList<ProductsDto> list = new ArrayList<>();
			
			try {
			    pnoList = objectMapper.readValue(pnoListJson, ArrayList.class);
			    System.out.println("pnoList : " + pnoList);
			    
			} catch (IOException e) {
			    e.printStackTrace();
			}
				
			
			for(int i = 0 ; i < pnoList.size(); i++) { 
				System.out.println(pnoList.get(i));
				ProductsDto dto =
						ProductsDao.getInstance().getInfo(Integer.parseInt(pnoList.get(i))); 
				list.add(dto); 
			}
			 
			
			json = objectMapper.writeValueAsString(list);
		}else if(type.equals("productAll")) { // 제품 전체 출력
			ArrayList<ProductsDto> result = ProductsDao.getInstance().getProductAll();
			json = objectMapper.writeValueAsString(result);
		}
		
		
		System.out.println("json : " + json);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(json);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
