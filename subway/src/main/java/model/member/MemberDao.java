package model.member;

import model.Dao;


public class MemberDao extends Dao{
	private static MemberDao memberDao = new MemberDao();
	public static MemberDao getInstance() { return memberDao;}
	private MemberDao() {}
	
	// 회원가입 --------------------------------------------------------------------------------
	public boolean MemberSignUp(String id, String password, String name, String birthdate, String gender, String address, String phone) {

		try {
			System.out.println("MemberSignUp 도착");
			String sql = "insert into subway_member(id, pw, mname, birthdate, gender, address, phone) values(?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			ps.setString(2, password);
			ps.setString(3, name);
			ps.setString(4, birthdate);
			ps.setString(5, gender);
			ps.setString(6, address);
			ps.setString(7, phone);
			ps.executeUpdate();
			return true;
		} catch ( Exception e ) { System.out.println(e);}
		return false;
	}	
	// 회원가입 end --------------------------------------------------------------------------------
	
	// 로그인 --------------------------------------------------------------------------------
	public boolean MemberLogin(String id, String password) {
		try {
			System.out.println("MemberLogin 도착");
			String sql = "select id, pw from subway_member where id = ? and pw = ? ;";
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			ps.setString(2, password);
			ps.executeQuery();
			rs = ps.executeQuery();
		        if (rs.next()) {return true;} // 로그인 성공
		        else { return false; } // 로그인 실패
		} catch ( Exception e ) { System.out.println(e); return false;}
	}
	
	
	// 로그인 end --------------------------------------------------------------------------------

	// 아이디찾기 --------------------------------------------------------------------------------
	public String findId(String name, String phone) {
		try {
			System.out.println("findId Dao 도착");
			String sql = "select id from subway_member where mname = ? and phone = ? ;";
			ps = conn.prepareStatement(sql);
			ps.setString(1, name);
			ps.setString(2, phone);
			ps.executeQuery();
			rs = ps.executeQuery();
		        if (rs.next()) {return rs.getString(1);} // ()안에는 검색된 필드의 순서 번호
		        else { return null; } 
		} catch ( Exception e ) { System.out.println(e);}
		 return null;
	}
		
		
	// 아이디찾기 end --------------------------------------------------------------------------------
	
	// 비밀번호찾기 --------------------------------------------------------------------------------
	public String findPw(String id, String phone) {
		try {
			System.out.println("findPw Dao 도착");
			String sql = "select pw from subway_member where id = ? and phone = ?;";
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			ps.setString(2, phone);
			ps.executeQuery();
			rs = ps.executeQuery();
		        if (rs.next()) {return rs.getString(1); }// ()안에는 검색된 필드의 순서 번호
		        else { return null; } 
		} catch ( Exception e ) { System.out.println(e);}
		 return null;
	}
		
	// 비밀번호찾기 end --------------------------------------------------------------------------------
			
	// 회원정보 가져오기 --------------------------------------------------------------------------------
	public MemberDto getMemberInfo(String mid) {
		try {
			String sql = "select mno,id,pw,mname,birthdate,phone,mil from subway_member where id = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, mid);
			rs = ps.executeQuery();
			if( rs.next() ){
				MemberDto dto = new MemberDto(
						rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4),
						rs.getInt(5),rs.getString(6),rs.getInt(7) 
						);	
				return dto;
			}
		}catch(Exception e) {System.out.println(e);}
		return null;
	}
	
	
	// 회원정보 가져오기 end--------------------------------------------------------------------------------
	
	// mno 가져오기 --------------------------------------------------------------------------------
	public int getMno(String id) {
		try {
			String sql = "select mno from subway_member where id = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, id);
			rs = ps.executeQuery();
			if(rs.next()) return rs.getInt(1);
		}catch(Exception e) {
			System.out.println("getMno 오류 : " + e);
		}
		return -1;
	}
	
	// mno 가져오기 end --------------------------------------------------------------------------------

	// 비밀번호 변경하기 --------------------------------------------------------------------------------
	public boolean updateNewPw(int mno, String pw) {
		System.out.println("비밀번호 변경 DAO 도착");
		try {
			String sql = "update subway_member set pw = ? where mno = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, pw);
			ps.setInt(2, mno);
			int row = ps.executeUpdate();
			if(row == 1) {return true;}
		}catch(Exception e) {
			System.out.println(e);
		}
		return false;

	}
	// 비밀번호 변경하기 end--------------------------------------------------------------------------------
	
	// 회원탈퇴하기 --------------------------------------------------------------------------------
	public boolean deleteinfo(int mno) {
		try {
			String sql ="delete from subway_member where mno = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, mno);
			int row = ps.executeUpdate();
			if(row == 1) {return true;}
		}catch(Exception e) {System.out.println(e);}
		
		return false;
	}
	
	// 회원탈퇴하기 end--------------------------------------------------------------------------------



}	


