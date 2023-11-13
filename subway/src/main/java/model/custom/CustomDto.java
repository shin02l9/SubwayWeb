package model.custom;

public class CustomDto {// 커스텀 아이템 정보 Dto
	
	
	private int ccno; // 커스텀 카테고리 넘버
	private String ccname; // 커스텀 카테고리 이름
	private int customitemno; // 커스텀 아이템 넘버
	
	public CustomDto() {
		// TODO Auto-generated constructor stub
	}

	public CustomDto(int ccno, String ccname, int customitemno) {
		super();
		this.ccno = ccno;
		this.ccname = ccname;
		this.customitemno = customitemno;
	}

	
	public int getCcno() {
		return ccno;
	}

	public void setCcno(int ccno) {
		this.ccno = ccno;
	}

	public String getCcname() {
		return ccname;
	}

	public void setCcname(String ccname) {
		this.ccname = ccname;
	}

	public int getCustomitemno() {
		return customitemno;
	}

	public void setCustomitemno(int customitemno) {
		this.customitemno = customitemno;
	}
	
	
}
