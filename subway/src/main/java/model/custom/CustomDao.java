package model.custom;

import java.util.ArrayList;

import model.Dao;

public class CustomDao extends Dao{
	private static CustomDao customDao = new CustomDao();
	public static CustomDao getInstance() { return customDao;}
	private CustomDao() {}
	
	// 커스텀 아이템들 가져오기
	public ArrayList<CustomDto> customItemList(ArrayList<Integer> ccnoList) {
		
		ArrayList<CustomDto> list = new ArrayList<>();
		
		String str = "(";
		for(int i = 0; i < ccnoList.size(); i++ ) {
			str += "?";
			if(i != ccnoList.size()-1) {
				str += ",";
			}
		}
		str += ")";
		try {
			String sql;
			sql = " select * from custom_list where ccno in " + str;
			System.out.println("sql : " + sql);
			ps = conn.prepareStatement(sql);
			for(int i = 0; i < ccnoList.size(); i++ ) {
				ps.setInt(i+1, ccnoList.get(i));
			}
			rs = ps.executeQuery();
			
			while(rs.next()) {
				CustomDto dto = new CustomDto(rs.getInt("ccno"), rs.getString("customitemname"), rs.getInt("customitemno"));
				list.add(dto);
			}
		}catch(Exception e) {
			System.out.println("customItemList DB 오류 : " + e);
		}
		
		return list;
	}

}
