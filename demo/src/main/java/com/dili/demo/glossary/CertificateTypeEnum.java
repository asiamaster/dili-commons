package com.dili.demo.glossary;

/**
 * <B>Description</B>
 * 本软件源代码版权归农丰时代及其团队所有,未经许可不得任意复制与传播
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @createTime 2018/11/8 18:43
 */
public enum CertificateTypeEnum {

    ID_CARD("1", "身份证"),
    DRIVER_LICENSE("2", "驾驶证")
    ;

    private String name;
    private String code ;

    CertificateTypeEnum(String code, String name){
        this.code = code;
        this.name = name;
    }

    public static CertificateTypeEnum getEnabledState(String code) {
        for (CertificateTypeEnum anEnum : CertificateTypeEnum.values()) {
            if (anEnum.getCode().equals(code)) {
                return anEnum;
            }
        }
        return null;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
