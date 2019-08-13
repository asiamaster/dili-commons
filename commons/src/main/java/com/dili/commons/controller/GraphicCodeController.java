package com.dili.commons.controller;


import com.dili.ss.util.MatrixUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * @author wangmi
 *
 */
@RestController
@RequestMapping("/graphicCode")
public class GraphicCodeController {

    /**
     * url:http://localhost:8080/graphicCode/barCode.api?str=a&width=320&height=240&fmt=png
     * 四个参数:
     * 条形码字符串str,
     * 宽度:width,
     * 高度：height,
     * 图片类型(默认为jpg, 如:jpg, png, gif等):fmt
     *
     */
    @RequestMapping(value = "/barCode.api", method = RequestMethod.GET)
    public void barCode(@RequestParam("str") String str,
                      @RequestParam("width") Integer width,
                      @RequestParam("height") Integer height,
                      @RequestParam(value = "fmt", required = false) String fmt,
                      ServletResponse response) {
        try {
            if(str != null){
                MatrixUtils.writeToStream(MatrixUtils.toBarCodeMatrix(str, width, height), fmt == null ? "jpg" : fmt, response.getOutputStream());
                response.getOutputStream().flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/qrCode.api", method = RequestMethod.GET)
    public void qrCode(@RequestParam("str") String str,
                      @RequestParam(value = "width", required = false) Integer width,
                      @RequestParam(value = "height", required = false) Integer height,
                      @RequestParam(value = "fmt", required = false) String fmt,
                      ServletResponse response) {
        try {
            if(str != null){
                MatrixUtils.writeToStream(MatrixUtils.toQRCodeMatrix(str, width == null ? 248 : width, height == null ? 248 : height), fmt == null ? "jpg" : fmt, response.getOutputStream());
                response.getOutputStream().flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
