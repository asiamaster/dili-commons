package com.dili.demo.controller;

import com.dili.demo.domain.Customer;
import com.dili.demo.service.CustomerService;
import com.dili.ss.domain.BaseOutput;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 由MyBatis Generator工具自动生成
 * This file was generated on 2019-12-27 14:43:13.
 */
@Api("/customer")
@Controller
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    /**
     * 跳转到Customer页面
     * @param modelMap
     * @return String
     */
    @ApiOperation("跳转到Customer页面")
    @RequestMapping(value="/index.html", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        return "customer/index";
    }

    /**
     * 跳转到Customer页面
     * @param modelMap
     * @return String
     */
    @ApiOperation("跳转到Customer页面")
    @RequestMapping(value="/nav.html", method = RequestMethod.GET)
    public String nav(ModelMap modelMap) {
        return "customer/nav";
    }

    /**
     * 分页查询Customer，返回easyui分页信息
     * @param customer
     * @return String
     * @throws Exception
     */
    @ApiOperation(value="分页查询Customer", notes = "分页查询Customer，返回easyui分页信息")
    @ApiImplicitParams({
		@ApiImplicitParam(name="Customer", paramType="form", value = "Customer的form信息", required = false, dataType = "string")
	})
    @RequestMapping(value="/listPage.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody String listPage(Customer customer, HttpServletRequest request) throws Exception {
        return customerService.listEasyuiPageByExample(customer, true).toString();
    }

    /**
     * 新增Customer
     * @param customer
     * @return BaseOutput
     */
    @ApiOperation("新增Customer")
    @ApiImplicitParams({
		@ApiImplicitParam(name="Customer", paramType="form", value = "Customer的form信息", required = true, dataType = "string")
	})
    @RequestMapping(value="/insert.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput insert(Customer customer) {
        customerService.insertSelective(customer);
        return BaseOutput.success("新增成功");
    }

    /**
     * 修改Customer
     * @param customer
     * @return BaseOutput
     */
    @ApiOperation("修改Customer")
    @ApiImplicitParams({
		@ApiImplicitParam(name="Customer", paramType="form", value = "Customer的form信息", required = true, dataType = "string")
	})
    @RequestMapping(value="/update.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput update(Customer customer) {
        customerService.updateSelective(customer);
        return BaseOutput.success("修改成功");
    }

    /**
     * 删除Customer
     * @param id
     * @return BaseOutput
     */
    @ApiOperation("删除Customer")
    @ApiImplicitParams({
		@ApiImplicitParam(name="id", paramType="form", value = "Customer的主键", required = true, dataType = "long")
	})
    @RequestMapping(value="/delete.action", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody BaseOutput delete(Long id) {
        customerService.delete(id);
        return BaseOutput.success("删除成功");
    }

    /**
     * 启禁用货站
     * @param id 货站ID
     * @param enable 是否启用
     * @return
     */
    @RequestMapping(value = "/doEnable.action", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public BaseOutput doEnable(Long id, Boolean enable) {
        return customerService.updateEnable(id, enable);
    }
}