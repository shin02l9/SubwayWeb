package model.product;


// 목적 : 데이터 모델링
public class ProductsDto { // 상품 정보 Dto
	
	//1. 필드
		// 카테고리 
	private int cateno;		  // 상품 카테고리 넘버
	private String catename;  // 상품 카테고리 이름
	    // 상품
	private int pno;		  // 상품 넘버
	private String pname;	  // 상품 이름
	private String pimg; 		// 상품 이미지 이름
	private String pname_e; 	// 상품 영문 이름
	private int category;	// 상세 카테고리
	private int pprice; // 상품 가격
	    
	//2. 생성자
    public ProductsDto() {
		super();
	}

	public ProductsDto(int cateno, String catename, int pno, String pname, String pimg, String pname_e, int category, int pprice) {
		super();
		this.cateno = cateno;
		this.catename = catename;
		this.pno = pno;
		this.pname = pname;
		this.pimg = pimg;
		this.pname_e = pname_e;
		this.category = category;
		this.pprice = pprice;
	}

	public ProductsDto(int cateno, int pno, String pname, String pimg, String pname_e, int category, int pprice) {
		super();
		this.cateno = cateno;
		this.pno = pno;
		this.pname = pname;
		this.pimg = pimg;
		this.pname_e = pname_e;
		this.category = category;
		this.pprice = pprice;
	}
	//3. 메소드
	
	public String getPimg() {
		return pimg;
	}


	public void setPimg(String pimg) {
		this.pimg = pimg;
	}


	public String getPname_e() {
		return pname_e;
	}


	public void setPname_e(String pname_e) {
		this.pname_e = pname_e;
	}


	public int getCategory() {
		return category;
	}


	public void setCategory(int category) {
		this.category = category;
	}

	
	
	public int getCateno() {
		return cateno;
	}
	public void setCateno(int cateno) {
		this.cateno = cateno;
	}
	public String getCatename() {
		return catename;
	}
	public void setCatename(String catename) {
		this.catename = catename;
	}
	public int getPno() {
		return pno;
	}
	public void setPno(int pno) {
		this.pno = pno;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	
	
	public int getPprice() {
		return pprice;
	}

	public void setPprice(int pprice) {
		this.pprice = pprice;
	}

	@Override
	public String toString() {
		return "ProductsDto [cateno=" + cateno + ", catename=" + catename + ", pno=" + pno + ", pname=" + pname
				+ "]";
	}
	    
	    
	    
	    
	 
}



