package com.dili.jmsf.common;

import java.io.Serializable;
import java.util.List;

/**
* bootstrap table list 返回封装model
* @ClassName: TableResult
* @author shaofan
* @date 2020-07-08 13:59
*/
public class TableResult<T> implements Serializable {

	private static final long serialVersionUID = 1L;
	private  Integer page;
    private Long total;
    private List<T> rows;
    private Object extendData;
 
 
    public TableSplitResult() {
    }
 
    public TableSplitResult(Integer page, Long total, List<T> rows) {
        this.page = page;
        this.total = total;
        this.rows = rows;
    }
 
    public Integer getPage() {
        return page;
    }
 
    public void setPage(Integer page) {
        this.page = page;
    }
 
    public Long getTotal() {
        return total;
    }
 
    public void setTotal(Long total) {
        this.total = total;
    }
 
    public List<T> getRows() {
        return rows;
    }
 
    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public Object getExtendData() {
        return extendData;
    }

    public void setExtendData(Object extendData) {
        this.extendData = extendData;
    }
}
