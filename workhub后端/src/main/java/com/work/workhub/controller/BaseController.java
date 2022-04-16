package com.work.workhub.controller;

import com.work.workhub.config.BaseResult;
import com.work.workhub.job.Init;
import com.work.workhub.util.UUIDUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

/**
 * @author md
 * @date 2022/4/6
 * @description
 */
@CrossOrigin
@RestController
@RequestMapping("/base")
public class BaseController {


    @GetMapping("/health")
    public String health(){
        return "health";
    }


    @PostMapping("/upload")
    public BaseResult upload(@RequestParam("file") MultipartFile file, HttpServletRequest req) throws Exception {
        if (file.isEmpty()) {
            return BaseResult.error("-1","请选择文件夹");
        }
        File f=new File(Init.path);
        if(!f.exists()){
            f.mkdirs();
        }

        String fileName = UUIDUtil.uuid()+file.getOriginalFilename();
        File dest = new File(Init.path+ fileName);
        dest.createNewFile();
        try {
            file.transferTo(dest);
            return BaseResult.success(req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() +"/workhub/pic/"+fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return BaseResult.error("-1","上传异常");
        }

    }
}
