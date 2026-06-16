package com.school.management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidTokenException extends ResponseStatusException {

    private static final String DEFAULT_MESSAGE = "Unauthorized";

    public InvalidTokenException(){
        super(HttpStatus.UNAUTHORIZED, DEFAULT_MESSAGE);
    }
}
