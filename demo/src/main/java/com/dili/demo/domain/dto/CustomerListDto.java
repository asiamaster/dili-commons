package com.dili.demo.domain.dto;

import com.dili.demo.domain.Customer;
import com.dili.ss.domain.annotation.Like;
import com.dili.ss.domain.annotation.Operator;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;

public interface CustomerListDto extends Customer {

    @Column(name = "`created`")
    @Operator(Operator.GREAT_EQUAL_THAN)
    Date getCreatedStart();
    void setCreatedStart(Date createdStart);

    @Column(name = "`created`")
    @Operator(Operator.LITTLE_EQUAL_THAN)
    Date getCreatedEnd();
    void setCreatedEnd(Date createdEnd);

    @Operator(Operator.IN)
    @Column(name = "code")
    List<String> getCodes();
    void setCodes(List<String> codes);

    @Operator(Operator.IN)
    @Column(name = "id")
    List<String> getIds();
    void setIds(List<String> ids);

    /**
     * 昵称模糊查询
     * @return
     */
    @Column(name = "nickname")
    @Like
    String getLikeNickname();
    void setLikeNickname(String likeNickname);
}
