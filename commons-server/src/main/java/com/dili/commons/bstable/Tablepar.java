package com.dili.commons.bstable;

import java.util.Map;

/**
 * boostrap table post 参数
 * @author shaofan
 *
 */
public class Tablepar {
	private int pageNum;//页码
	private int pageSize;//数量
	private String sortName;//排序字段
	private String sortOrder;//排序字符 asc desc
	private Map metadata; // metadata
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Map getMetadata() {
		return metadata;
	}

	public void setMetadata(Map metadata) {
		this.metadata = metadata;
	}
}
