package com.school.management.common.pagination;

import org.springframework.data.domain.Page;

import java.util.List;

public record PagingResult<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last,
        boolean empty
) {

    public static <T> PagingResult<T> from(
            Page<T> page
    ) {
        return new PagingResult<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.isEmpty()
        );
    }
}
