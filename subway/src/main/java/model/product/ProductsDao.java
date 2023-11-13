package model.product;

import java.util.ArrayList;

import model.Dao;
import model.board.BoardDao;

/*
기능 : 
	[R] : 카테고리에 따른 출력, 카테고리+상세카테고리에 따른 출력, 제품 개별 출력, 제품 전체 출력
*/

public class ProductsDao extends Dao {
	private static ProductsDao productsDao = new ProductsDao();
	public static ProductsDao getInstance() { return productsDao;}
	private ProductsDao() {}
	
	// 카테고리 ALL
	public ArrayList<ProductsDto> getListAll(int cateno) {
		
		ArrayList<ProductsDto> list = new ArrayList<>();
		
		try {
			System.out.println("cateno" + cateno);
			String sql = "select * from products where cateno = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1,cateno);
			rs = ps.executeQuery();
			while(rs.next()) {
				ProductsDto productsDto = new ProductsDto(
						rs.getInt("cateno"),
						rs.getInt("pno"), rs.getString("pname"), 
						rs.getString("pimg"), rs.getString("pname_e"), 
						rs.getInt("category"), rs.getInt("pprice"));
				list.add(productsDto);
			}
		}catch(Exception e) {
			System.out.println("getListAll DB 오류 발생 : " + e);
		}
		
		return list;
	}
	
	// 카테고리 Another
	public ArrayList<ProductsDto> getListSelect(int cateno,int category) {
		ArrayList<ProductsDto> list = new ArrayList<>();
		
		try {
			System.out.println("cateno" + cateno);
			String sql = "select * from products where cateno = ? and category = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1,cateno);
			ps.setInt(2, category);
			rs = ps.executeQuery();
			while(rs.next()) {
				ProductsDto productsDto = new ProductsDto(
						rs.getInt("cateno"),
						rs.getInt("pno"), rs.getString("pname"), 
						rs.getString("pimg"), rs.getString("pname_e"), 
						rs.getInt("category"), rs.getInt("pprice"));
				list.add(productsDto);
			}	
			
		}catch(Exception e) {
			System.out.println("getListSelect DB 오류 발생 : " + e);
		}
		
		return list;
	}
	
	// 제품 개별 출력 
	public ProductsDto getInfo(int pno) {
		System.out.println("pno : " + pno);
		try {
			String sql = "select * from products where pno = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1,pno);
			rs = ps.executeQuery();
			if(rs.next()) {
				ProductsDto productsDto = new ProductsDto(
						rs.getInt("cateno"),
						rs.getInt("pno"), rs.getString("pname"), 
						rs.getString("pimg"), rs.getString("pname_e"), 
						rs.getInt("category"), rs.getInt("pprice"));
				return productsDto;
			}	
			
		}catch(Exception e) {
			System.out.println("getInfo DB 오류 발생 : " + e);
		}
		
		return null;
	}
	
	// 제품 전체 출력
	public ArrayList<ProductsDto> getProductAll() {
		
		ArrayList<ProductsDto> list = new ArrayList<>();
		
		try {
			String sql = "select * from products";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new ProductsDto(
						rs.getInt("cateno"),
						rs.getInt("pno"), rs.getString("pname"), 
						rs.getString("pimg"), rs.getString("pname_e"), 
						rs.getInt("category"), rs.getInt("pprice"))
						);			
			}
		}catch(Exception e) {
			System.out.println("productAll DB 오류 발생 : " + e);
		}
		
		return list;
	}
}
