package io.github.generallyspecific.learningtracker.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;


@Configuration
public class S3Config {
    @Value("${aws.access-key-id}")
    public String accessKey;

    @Value("${aws.secret-access-key}")
    private String secretAccessKey;

    @Value("${aws.region:us-east-1}")
    private String region;

    @Bean
    public AwsCredentials awsCredentials() {
        return AwsBasicCredentials.create(accessKey, secretAccessKey);
    }

    @Bean
    public S3Client s3Client(AwsCredentials credentials) {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    @Bean
    public S3Presigner s3Presigner(AwsCredentials credentials) {
        return S3Presigner.builder()
                .region(Region.US_EAST_1) // or your region
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }
}