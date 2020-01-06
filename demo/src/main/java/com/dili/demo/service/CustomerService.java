package com.dili.demo.service;

import com.dili.demo.domain.Customer;
import com.dili.ss.base.BaseService;
import com.dili.ss.domain.BaseOutput;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2019-12-27 14:43:13.
 */
public interface CustomerService extends BaseService<Customer, Long> {
    /**
     * 根据用户ID，操作启禁用 货站
     * @param stationId 货站ID
     * @param enable 是否启用(true-启用，false-禁用)
     * @return
     */
    BaseOutput updateEnable(Long stationId, Boolean enable);
}