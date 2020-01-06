package com.dili.demo.service;

import com.dili.demo.domain.City;
import com.dili.demo.domain.dto.CityListDto;
import com.dili.ss.base.BaseService;

import java.util.List;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2020-01-06 17:35:09.
 */
public interface CityService extends BaseService<City, Long> {
    /**
     * 城市关键字查询
     * @param cityListDto
     * @return
     */
    List<City> listCityByCondition(CityListDto cityListDto);
}