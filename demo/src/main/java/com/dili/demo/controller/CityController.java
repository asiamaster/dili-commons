package com.dili.demo.controller;

import com.dili.demo.domain.City;
import com.dili.demo.service.CityService;
import com.dili.ss.domain.BaseOutput;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2020-01-06 17:35:09.
 */
@Api("/city")
@Controller
@RequestMapping("/city")
public class CityController {
    @Autowired
    CityService cityService;

    /**
     * 跳转到City页面
     * @param modelMap
     * @return String
     */
    @ApiOperation("跳转到City页面")
    @RequestMapping(value="/index.html", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        return "city/index";
    }

    /**
     * 分页查询City，返回easyui分页信息
     * @param city
     * @return String
     * @throws Exception
     */
    @ApiOperation(value="分页查询City", notes = "分页查询City，返回easyui分页信息")
    @ApiImplicitParams({
		@ApiImplicitParam(name="City", paramType="form", value = "City的form信息", required = false, dataType = "string")
	})
    @RequestMapping(value="/listPage.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody String listPage(City city) throws Exception {
        return cityService.listEasyuiPageByExample(city, true).toString();
    }

    /**
     * 新增City
     * @param customer
     * @return BaseOutput
     */
    @ApiOperation("新增City")
    @ApiImplicitParams({
		@ApiImplicitParam(name="City", paramType="form", value = "City的form信息", required = true, dataType = "string")
	})
    @RequestMapping(value="/insert.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput insert(City city) {
        cityService.insertSelective(city);
        return BaseOutput.success("新增成功");
    }

    /**
     * 修改City
     * @param customer
     * @return BaseOutput
     */
    @ApiOperation("修改City")
    @ApiImplicitParams({
		@ApiImplicitParam(name="City", paramType="form", value = "City的form信息", required = true, dataType = "string")
	})
    @RequestMapping(value="/update.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput update(City city) {
        cityService.updateSelective(city);
        return BaseOutput.success("修改成功");
    }

    /**
     * 删除City
     * @param id
     * @return BaseOutput
     */
    @ApiOperation("删除City")
    @ApiImplicitParams({
		@ApiImplicitParam(name="id", paramType="form", value = "City的主键", required = true, dataType = "long")
	})
    @RequestMapping(value="/delete.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput delete(Long id) {
        cityService.delete(id);
        return BaseOutput.success("删除成功");
    }
}