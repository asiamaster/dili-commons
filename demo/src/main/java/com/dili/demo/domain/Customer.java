package com.dili.demo.domain;

import com.dili.ss.dto.IBaseDomain;
import com.dili.ss.metadata.FieldEditor;
import com.dili.ss.metadata.annotation.EditMode;
import com.dili.ss.metadata.annotation.FieldDef;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 由MyBatis Generator工具自动生成
 * 
 * This file was generated on 2019-12-27 14:43:13.
 */
@Table(name = "`customer`")
public interface Customer extends IBaseDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    @FieldDef(label="id")
    @EditMode(editor = FieldEditor.Number, required = true)
    Long getId();

    void setId(Long id);

    @Transient
    List<Map> getChildMap();
    void setChildMap(List<Map> childMap);

    @Column(name = "`code`")
    @FieldDef(label="客户编号", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCode();

    void setCode(String code);

    @Column(name = "`certificate_number`")
    @FieldDef(label="证件号", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCertificateNumber();

    void setCertificateNumber(String certificateNumber);

    @Column(name = "`certificate_type`")
    @FieldDef(label="证件类型", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCertificateType();

    void setCertificateType(String certificateType);

    @Column(name = "`certificate_range`")
    @FieldDef(label="证件日期", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCertificateRange();

    void setCertificateRange(String certificateRange);

    @Column(name = "`certificate_addr`")
    @FieldDef(label="证件地址", maxLength = 100)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCertificateAddr();

    void setCertificateAddr(String certificateAddr);

    @Column(name = "`name`")
    @FieldDef(label="客户名称", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getName();

    void setName(String name);

    @Column(name = "`birthdate`")
    @FieldDef(label="出生日期")
    @EditMode(editor = FieldEditor.Date, required = false)
    Date getBirthdate();

    void setBirthdate(Date birthdate);

    @Column(name = "`sex`")
    @FieldDef(label="性别:男,女")
    @EditMode(editor = FieldEditor.Number, required = false)
    Integer getSex();

    void setSex(Integer sex);

    @Column(name = "`photo`")
    @FieldDef(label="照片", maxLength = 6000)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getPhoto();

    void setPhoto(String photo);

    @Column(name = "`cellphone`")
    @FieldDef(label="手机号", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCellphone();

    void setCellphone(String cellphone);

    @Column(name = "`organization_type`")
    @FieldDef(label="组织类型,个人/企业", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getOrganizationType();

    void setOrganizationType(String organizationType);

    @Column(name = "`source_system`")
    @FieldDef(label="来源系统", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getSourceSystem();

    void setSourceSystem(String sourceSystem);

    @Column(name = "`profession`")
    @FieldDef(label="客户行业", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getProfession();

    void setProfession(String profession);

    @Column(name = "`operating_area`")
    @FieldDef(label="经营地区", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getOperatingArea();

    void setOperatingArea(String operatingArea);

    @Column(name = "`operating_lng`")
    @FieldDef(label="经营地区经度", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getOperatingLng();

    void setOperatingLng(String operatingLng);

    @Column(name = "`operating_lat`")
    @FieldDef(label="经营地区纬度", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getOperatingLat();

    void setOperatingLat(String operatingLat);

    @Column(name = "`other_title`")
    @FieldDef(label="其它头衔", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getOtherTitle();

    void setOtherTitle(String otherTitle);

    @Column(name = "`main_category`")
    @FieldDef(label="主营品类", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getMainCategory();

    void setMainCategory(String mainCategory);

    @Column(name = "`registered_capital`")
    @FieldDef(label="注册资金")
    @EditMode(editor = FieldEditor.Number, required = false)
    Long getRegisteredCapital();

    void setRegisteredCapital(Long registeredCapital);

    @Column(name = "`employee_number`")
    @FieldDef(label="企业员工数", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getEmployeeNumber();

    void setEmployeeNumber(String employeeNumber);

    @Column(name = "`corporation_certificate_type`")
    @FieldDef(label="证件类型", maxLength = 20)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCorporationCertificateType();

    void setCorporationCertificateType(String corporationCertificateType);

    @Column(name = "`corporation_certificate_number`")
    @FieldDef(label="法人证件号", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCorporationCertificateNumber();

    void setCorporationCertificateNumber(String corporationCertificateNumber);

    @Column(name = "`corporation_name`")
    @FieldDef(label="法人真实姓名", maxLength = 40)
    @EditMode(editor = FieldEditor.Text, required = false)
    String getCorporationName();

    void setCorporationName(String corporationName);

    @Column(name = "`is_cellphone_valid`")
    @FieldDef(label="手机号是否验证")
    @EditMode(editor = FieldEditor.Number, required = false)
    Integer getIsCellphoneValid();

    void setIsCellphoneValid(Integer isCellphoneValid);

    @Column(name = "`creater_id`")
    @FieldDef(label="创建人")
    @EditMode(editor = FieldEditor.Number, required = false)
    Long getCreaterId();

    void setCreaterId(Long createrId);

    @Column(name = "`created`")
    @FieldDef(label="创建时间")
    @EditMode(editor = FieldEditor.Datetime, required = false)
    Date getCreated();

    void setCreated(Date created);

    @Column(name = "`modified`")
    @FieldDef(label="修改时间")
    @EditMode(editor = FieldEditor.Datetime, required = false)
    Date getModified();

    void setModified(Date modified);

    @Column(name = "`is_delete`")
    @FieldDef(label="是否可用")
    @EditMode(editor = FieldEditor.Number, required = false)
    Integer getIsDelete();

    void setIsDelete(Integer isDelete);

    @Column(name = "`state`")
    @FieldDef(label="客户状态 0注销，1生效，2禁用，")
    @EditMode(editor = FieldEditor.Number, required = false)
    Integer getState();

    void setState(Integer state);

    @Column(name = "`pid`")
    @FieldDef(label="pid")
    @EditMode(editor = FieldEditor.Number, required = true)
    Long getPid();

    void setPid(Long pid);

    @Column(name = "`level`")
    @FieldDef(label="等級")
    @EditMode(editor = FieldEditor.Number, required = false)
    Integer getLevel();

    void setLevel(Integer level);
}