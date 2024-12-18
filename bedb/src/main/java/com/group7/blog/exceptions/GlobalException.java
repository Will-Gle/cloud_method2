package com.group7.blog.exceptions;


import com.group7.blog.dto.User.reponse.ApiResponse;
import com.group7.blog.enums.ErrorCode;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = { Exception.class })
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        apiResponse.setMessage(ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        apiResponse.setResult(exception.toString());

        return ResponseEntity.ok().body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        apiResponse.setMessage(ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        apiResponse.setResult(exception.getFieldError().getDefaultMessage());
        return ResponseEntity.ok().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        System.out.println(1);
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.ok().body(apiResponse);
    }

    @ExceptionHandler(value = { MissingServletRequestPartException.class })
    ResponseEntity<ApiResponse> handleMissingServletRequestPartException(MissingServletRequestPartException exception) {
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        apiResponse.setMessage(ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        apiResponse.setResult(exception.getMessage());

        return ResponseEntity.ok().body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.ok()
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message("asd")
                        .build());
    }

    @ExceptionHandler(value = BadJwtException.class)
    ResponseEntity<ApiResponse> handlingBadJwtException(BadJwtException exception) {
        ErrorCode errorCode = ErrorCode.INVALID_TOKEN;
        return ResponseEntity.ok()
                .body(ApiResponse.builder()
                        .code(errorCode.getCode())
                        .message("asd")
                        .build());
    }
}
