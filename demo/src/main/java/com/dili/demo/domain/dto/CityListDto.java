package com.dili.demo.domain.dto;

import com.dili.demo.domain.City;
import com.dili.demo.domain.Customer;
import com.dili.ss.domain.annotation.Like;
import com.dili.ss.domain.annotation.Operator;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;

public interface CityListDto extends City {

    /**
     * 昵称模糊查询
     * @return
     */
    @Column(name = "keyword")
    @Like
    String getKeyword();
    void setKeyword(String keyword);
}
