package com.group7.blog.configurations;


import java.io.IOException;
import java.util.Objects;

import com.group7.blog.dto.User.reponse.ApiResponse;
import com.group7.blog.enums.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;


public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        System.out.println();
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;
        response.setStatus(200);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiResponse apiResponse = new ApiResponse();

        if (Objects.equals(request.getHeader("Authorization"), "null")) {
            apiResponse.setCode(ErrorCode.UNAUTHENTICATED.getCode());
            apiResponse.setMessage(ErrorCode.UNAUTHENTICATED.getMessage());
            apiResponse.setResult(authException.getMessage());
        } else {
            apiResponse.setCode(ErrorCode.INVALID_TOKEN.getCode());
            apiResponse.setMessage(ErrorCode.INVALID_TOKEN.getMessage());
            apiResponse.setResult(authException.getMessage());
        }
        ObjectMapper objectMapper = new ObjectMapper();

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}

