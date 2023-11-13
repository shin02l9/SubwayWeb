package model.member;


// 목적 : 데이터 모델링
public class MemberDto {// 회원 정보 Dto

	//1. 필드
	private int mno;
	private String id;		// 회원 아이디
	private String pw;		// 회원 비밀번호
	private String name;	// 회원 이름
	private int birthdate;	// 회원 생일
	private String gender;	// 회원 성별
	private String address;	// 회원 주소
	private String phone;	// 회원 전화번호 
	private int mil = 0;	// 회원 마일리지 ( 기본값 0에서 시작 )
	
	
	
	//2. 생성자
	public MemberDto() {
		super();
	}
	public MemberDto(String id, String pw, String name, int birthdate, String gender, String address, String phone,
			int mil) {
		super();
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.birthdate = birthdate;
		this.gender = gender;
		this.address = address;
		this.phone = phone;
		this.mil = mil;
	}

	
	public MemberDto(int mno, String id, String name, String phone, int mil) {
		super();
		this.mno = mno;
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.mil = mil;
	}
	public MemberDto(int mno, String id, String name, int birthdate, String gender, String address, String phone,
			int mil) {
		super();
		this.mno = mno;
		this.id = id;
		this.name = name;
		this.birthdate = birthdate;
		this.gender = gender;
		this.address = address;
		this.phone = phone;
		this.mil = mil;
	}
	public MemberDto(int mno, String id, String pw, String name, int birthdate, String phone, int mil) {
		super();
		this.mno = mno;
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.birthdate = birthdate;
		this.phone = phone;
		this.mil = mil;
	}
	
	//3.메소드
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(int birthdate) {
		this.birthdate = birthdate;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getMil() {
		return mil;
	}
	public void setMil(int mil) {
		this.mil = mil;
	}
	public int getMno() {
		return mno;
	}
	public void setMno(int mno) {
		this.mno = mno;
	}
	@Override
	public String toString() {
		return "MemberDto [mno=" + mno + ", id=" + id + ", pw=" + pw + ", name=" + name + ", birthdate=" + birthdate
				+ ", gender=" + gender + ", address=" + address + ", phone=" + phone + ", mil=" + mil + "]";
	}

	
	
}	