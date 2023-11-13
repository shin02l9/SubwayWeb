package model.order;

import java.util.List;

//목적 : 데이터 모델링
public class OrderDto { // 주문 정보 Dto

	//1. 필드
		// 주문 정보
	private int ono; 		// 주문번호 
	private int mno;		// 주문자(회원번호)
	private String odate;	// 주문일
	private int ostatus;	// 주문상태
	
	private int ototalpaid;	// 총 주문금액
	private String mname;	// 주문자 명
	private String phone;	// 주문자 휴대폰
	private String address;	// 주문자 주소
	
	
	
		public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public void setBread(int bread) {
		this.bread = bread;
	}

	public void setDetails(OrderDto details) {
		this.details = details;
	}

	public void setCustoms(List<OrderDto> customs) {
		this.customs = customs;
	}



	// 주문 상세정보
	private int odno;		// 주문상세번호
	private int pno;		// 상품번호
	private String pname;	// 상품이름
	private int bread;		// 커스텀( 빵 )
	private int cheese;		// 커스텀( 치즈 )
	private int toasting;	// 커스텀( 토스팅 )
	private List<String> vegetable;	// 커스텀( 야채제외 )
	private int sauce;		// 커스텀( 소스 )
	
	//2. 생성자
	public OrderDto() {
		super();
	}

	public OrderDto(int ono, int mno, String odate, int ostatus, int odno, int pno, int bread, int cheese, int toasting,
			List<String> vegetable, int sauce) {
		super();
		this.ono = ono;
		this.mno = mno;
		this.odate = odate;
		this.ostatus = ostatus;
		this.odno = odno;
		this.pno = pno;
		this.bread = bread;
		this.cheese = cheese;
		this.toasting = toasting;
		this.vegetable = vegetable;
		this.sauce = sauce;
	}
	
	
	
	// 커스텀 출력하려고 만든거
	
	public OrderDto(int ono, int odno, int pno, 
			String pname, int bread, int cheese, int toasting,
			List<String> vegetable, int sauce) {
		super();
		this.ono = ono;
		this.odno = odno;
		this.pno = pno;
		this.pname = pname;
		this.bread = bread;
		this.cheese = cheese;
		this.toasting = toasting;
		this.vegetable = vegetable;
		this.sauce = sauce;
	}

	// 전체 주문내역 출력할떄 사용하는 생성자
	public OrderDto(int ono, int mno, String odate, int ostatus, int ototalpaid, String mname, String phone) {
		super();
		this.ono = ono;
		this.mno = mno;
		this.odate = odate;
		this.ostatus = ostatus;
		this.ototalpaid = ototalpaid;
		this.mname = mname;
		this.phone = phone;
	}
	
	public OrderDto(int pno, int bread, int cheese, int toasting, List<String> vegetable, int sauce) {
		super();
		this.pno = pno;
		this.bread = bread;
		this.cheese = cheese;
		this.toasting = toasting;
		this.vegetable = vegetable;
		this.sauce = sauce;
	}
	
	// 개별 상품 출력을 위한 생성자
	
	public OrderDto(int mno, 
			String mname, 
			String phone,
			String address, 
			int ono, 
			String odate, 
			int ostatus, 
			int ototalpaid) {
		super();
		this.mno = mno;
		this.mname = mname;
		this.phone = phone;
		this.address = address;
		this.ono = ono;
		this.odate = odate;
		this.ostatus = ostatus;
		this.ototalpaid = ototalpaid;
	}

	
	
	private OrderDto details;
    private List<OrderDto> customs;

    public OrderDto(OrderDto details, 
    		List<OrderDto> customs) {
        this.details = details;
        this.customs = customs;
    }

    public OrderDto getDetails() {
        return details;
    }

    public List<OrderDto> getCustoms() {
        return customs;
    }
    
    
    
	//3. 메소드
	public int getOno() {
		return ono;
	}

	public void setOno(int ono) {
		this.ono = ono;
	}

	public int getMno() {
		return mno;
	}

	public void setMno(int mno) {
		this.mno = mno;
	}

	public String getOdate() {
		return odate;
	}

	public void setOdate(String odate) {
		this.odate = odate;
	}

	public int getOstatus() {
		return ostatus;
	}

	public void setOstatus(int ostatus) {
		this.ostatus = ostatus;
	}

	public int getOdno() {
		return odno;
	}

	public void setOdno(int odno) {
		this.odno = odno;
	}

	public int getPno() {
		return pno;
	}

	public void setPno(int pno) {
		this.pno = pno;
	}

	public int getBread() {
		return bread;
	}

	public void setBraed(int bread) {
		this.bread = bread;
	}

	public int getCheese() {
		return cheese;
	}

	public void setCheese(int cheese) {
		this.cheese = cheese;
	}

	public int getToasting() {
		return toasting;
	}

	public void setToasting(int toasting) {
		this.toasting = toasting;
	}

	public List<String> getVegetable() {
		return vegetable;
	}

	public void setVegetable(List<String> vegetable) {
		this.vegetable = vegetable;
	}

	public int getSauce() {
		return sauce;
	}

	public void setSauce(int sauce) {
		this.sauce = sauce;
	}

	public int getOtotalpaid() {
		return ototalpaid;
	}

	public void setOtotalpaid(int ototalpaid) {
		this.ototalpaid = ototalpaid;
	}

	public String getMname() {
		return mname;
	}

	public void setMname(String mname) {
		this.mname = mname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "OrderDto [ono=" + ono + ", mno=" + mno + ", odate=" + odate + ", ostatus=" + ostatus + ", ototalpaid="
				+ ototalpaid + ", mname=" + mname + ", phone=" + phone + ", address=" + address + ", odno=" + odno
				+ ", pno=" + pno + ", pname=" + pname + ", bread=" + bread + ", cheese=" + cheese + ", toasting="
				+ toasting + ", vegetable=" + vegetable + ", sauce=" + sauce + ", details=" + details + ", customs="
				+ customs + "]";
	}

	




}
