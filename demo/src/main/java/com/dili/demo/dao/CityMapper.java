package com.dili.demo.dao;

import com.dili.demo.domain.City;
import com.dili.demo.domain.dto.CityListDto;
import com.dili.ss.base.MyMapper;

import java.util.List;

public interface CityMapper extends MyMapper<City> {
    List<City> listCityByCondition(CityListDto cityListDto);
}