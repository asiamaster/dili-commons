package com.dili.demo.service.impl;

import com.dili.demo.dao.CustomerMapper;
import com.dili.demo.domain.Customer;
import com.dili.demo.glossary.EnabledStateEnum;
import com.dili.demo.service.CustomerService;
import com.dili.ss.base.BaseServiceImpl;
import com.dili.ss.domain.BaseOutput;
import com.dili.ss.dto.DTOUtils;
import org.springframework.stereotype.Service;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2019-12-27 14:43:13.
 */
@Service
public class CustomerServiceImpl extends BaseServiceImpl<Customer, Long> implements CustomerService {

    public CustomerMapper getActualDao() {
        return (CustomerMapper)getDao();
    }

    @Override
    public BaseOutput updateEnable(Long stationId, Boolean enable) {
        Customer customer = DTOUtils.newDTO(Customer.class);
        customer.setId(stationId);
        if (enable) {
            customer.setState(EnabledStateEnum.ENABLED.getCode());
        } else {
            customer.setState(EnabledStateEnum.DISABLED.getCode());
        }
        getActualDao().updateByPrimaryKey(customer);
        return BaseOutput.success();
    }
}