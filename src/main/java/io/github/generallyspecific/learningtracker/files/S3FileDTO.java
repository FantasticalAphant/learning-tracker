package io.github.generallyspecific.learningtracker.files;

import java.time.Instant;

public record S3FileDTO(
        String filename,
        Long size,
        Instant lastModified,
        String url
) {
}
