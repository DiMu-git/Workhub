package com.work.workhub.config;

import java.beans.Transient;
import java.io.Serializable;

public class BaseResult<T> implements Serializable {
//    private static final long serialVersionUID = 6803323956728517039L;
    public static final int SUCCESS_TYPE = 0;
    public static final int ERROR_TYPE = -1;
    public static final int FAIL_TYPE = -2;
    public static final int NO_AUTH_TYPE = -3;
    int type = -1;

    private String code;

    private String msg;

    private T data;

    public BaseResult() {
    }

    public BaseResult(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public BaseResult(int type, String code, String msg) {
        this.type = type;
        this.code = code;
        this.msg = msg;
    }

    public BaseResult(int type, String code, String msg, T data) {
        this.type = type;
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> BaseResult<T> success(T t) {
        return new BaseResult(0, "0", "SUCCESS", t);
    }

    public static <T> BaseResult<T> fail(String code, String message) {
        return new BaseResult(-2, code, message);
    }

    public static <T> BaseResult<T> error(String code, String message) {
        return new BaseResult(-1, code, message);
    }

    public int getType() {
        return this.type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public T getData() {
        return this.data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }



    @Transient
    public boolean isSuccess() {
        return this.type == 0;
    }

    @Transient
    public boolean isFail() {
        return this.type == -2;
    }

    @Transient
    public boolean isError() {
        return this.type == -1;
    }
}
