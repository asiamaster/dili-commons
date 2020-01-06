package com.dili.demo.glossary;

/**
 * <B>Description</B>
 * 本软件源代码版权归农丰时代及其团队所有,未经许可不得任意复制与传播
 * <B>农丰时代科技有限公司</B>
 *
 * @author yuehongbo
 * @createTime 2018/11/8 18:43
 */
public enum SexEnum {

    MALE(1, "男"),
    FEMALE(2, "女")
    ;

    private String name;
    private Integer code ;

    SexEnum(Integer code, String name){
        this.code = code;
        this.name = name;
    }

    public static SexEnum getEnabledState(Integer code) {
        for (SexEnum anEnum : SexEnum.values()) {
            if (anEnum.getCode().equals(code)) {
                return anEnum;
            }
        }
        return null;
    }

    public Integer getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
