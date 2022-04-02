package io.renren.modules.sys.controller;

import io.renren.common.utils.R;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * @program: renren-fast
 * @description:
 * @author: Bigtian
 * @create: 2021-04-09 16:37
 */
@RestController

public class SysUploadController {
    //处理文件上传
    @RequestMapping(value = "/uploadImg")
    public R uploadImg(@RequestParam("file") MultipartFile file,
                       HttpServletRequest request) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSS");
        String res = sdf.format(new Date());
        // uploads文件夹位置
        // 原始名称
        //文件上传的地址
        String path = ResourceUtils.getURL("classpath:").getPath() + "static/upload";
        if (System.getProperty("os.name").toLowerCase().startsWith("wind")) {
            path = path.replace('/', '\\').substring(1, path.length());
        }
        //用于查看路径是否正确
        String originalFileName = file.getOriginalFilename();
        // 新文件名
        String newFileName = "bigtian" + res + originalFileName.substring(originalFileName.lastIndexOf("."));
        // 创建年月文件夹
        Calendar date = Calendar.getInstance();
        File dateDirs = new File(date.get(Calendar.YEAR) + File.separator + (date.get(Calendar.MONTH) + 1));
        // 新文件
        File newFile = new File(path + File.separator + dateDirs + File.separator + newFileName);
        // 判断目标文件所在目录是否存在
        if (!newFile.getParentFile().exists()) {
            // 如果目标文件所在的目录不存在，则创建父目录
            newFile.getParentFile().mkdirs();
        }
        // 将内存中的数据写入磁盘
        file.transferTo(newFile);
        // 完整的url
        String fileUrl = "upload/" + date.get(Calendar.YEAR) + "/" + (date.get(Calendar.MONTH) + 1) + "/" + newFileName;
        fileUrl = request.getRequestURL().toString().replace("uploadImg", "") + fileUrl;
        return R.ok(fileUrl);
    }

}
