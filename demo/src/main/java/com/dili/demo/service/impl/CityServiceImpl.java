package com.dili.demo.service.impl;

import com.dili.demo.dao.CityMapper;
import com.dili.demo.domain.City;
import com.dili.demo.domain.dto.CityListDto;
import com.dili.demo.service.CityService;
import com.dili.ss.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2020-01-06 17:35:09.
 */
@Service
public class CityServiceImpl extends BaseServiceImpl<City, Long> implements CityService {

    public CityMapper getActualDao() {
        return (CityMapper)getDao();
    }

    @Override
    public List<City> listCityByCondition(CityListDto cityListDto) {
        return getActualDao().listCityByCondition(cityListDto);
    }
}