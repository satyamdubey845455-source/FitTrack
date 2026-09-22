package com.fittrack.config;

import com.fittrack.entity.User;
import com.fittrack.entity.UserProfile;
import com.fittrack.repository.ExerciseRepository;
import com.fittrack.repository.FoodRepository;
import com.fittrack.repository.UserProfileRepository;
import com.fittrack.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;
import java.math.BigDecimal;

/**
 * Runs seed_data.sql at application startup if the foods/exercises tables are empty,
 * and ensures default demo users and profiles are initialized.
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeederConfig {

    private final DataSource dataSource;
    private final FoodRepository foodRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void seedData() {
        seedFoodsAndExercises();
        seedDefaultUsers();
    }

    private void seedFoodsAndExercises() {
        boolean foodsEmpty    = foodRepository.count() == 0;
        boolean exercisesEmpty = exerciseRepository.count() == 0;

        if (foodsEmpty || exercisesEmpty) {
            log.info("Seeding initial food and exercise data...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
                populator.addScript(new ClassPathResource("db/seed_data.sql"));
                populator.setSqlScriptEncoding("UTF-8");
                populator.setContinueOnError(true);
                populator.populate(dataSource.getConnection());
                log.info("Seed data loaded successfully.");
            } catch (Exception e) {
                log.warn("Seed data loading failed (may already be seeded): {}", e.getMessage());
            }
        } else {
            log.info("Food and exercise data already seeded — skipping.");
        }
    }

    private void seedDefaultUsers() {
        // Primary demo account
        createOrUpdateUser("satyam@fittrack.com", "Satyam Kumar Dubey", "Test@1234");
        // Alias demo account for convenience
        createOrUpdateUser("satya@fittrack.com", "Satyam Kumar Dubey", "Test@1234");
    }

    private void createOrUpdateUser(String email, String fullName, String rawPassword) {
        try {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                log.info("Creating demo user: {} ({})", fullName, email);
                user = User.builder()
                        .email(email)
                        .fullName(fullName)
                        .passwordHash(passwordEncoder.encode(rawPassword))
                        .role(User.Role.USER)
                        .isActive(true)
                        .build();
                user = userRepository.save(user);
            } else {
                if (!fullName.equals(user.getFullName())) {
                    user.setFullName(fullName);
                    userRepository.save(user);
                    log.info("Updated user {} full name to {}", email, fullName);
                }
            }

            // Ensure profile exists
            if (!profileRepository.findByUserId(user.getId()).isPresent()) {
                log.info("Creating default profile for demo user: {}", email);
                UserProfile profile = UserProfile.builder()
                        .user(user)
                        .age(24)
                        .gender(UserProfile.Gender.MALE)
                        .heightCm(new BigDecimal("175.00"))
                        .weightKg(new BigDecimal("68.00"))
                        .activityLevel(UserProfile.ActivityLevel.MODERATELY_ACTIVE)
                        .fitnessGoal(UserProfile.FitnessGoal.MUSCLE_GAIN)
                        .workoutFrequency(5)
                        .preferredWorkoutTime(UserProfile.WorkoutTime.EVENING)
                        .dietaryPreference(UserProfile.DietaryPreference.NON_VEGETARIAN)
                        .dailyCalorieTarget(2450)
                        .dailyProteinTarget(new BigDecimal("140.00"))
                        .dailyCarbTarget(new BigDecimal("260.00"))
                        .dailyFatTarget(new BigDecimal("65.00"))
                        .dailyFiberTarget(new BigDecimal("30.00"))
                        .dailyWaterTargetMl(3500)
                        .dailySleepTargetHours(new BigDecimal("8.00"))
                        .dailyAddedSugarTarget(new BigDecimal("25.00"))
                        .timezone("Asia/Kolkata")
                        .targetsManuallyOverridden(false)
                        .build();
                profileRepository.save(profile);
            }
        } catch (Exception e) {
            log.warn("Failed to seed demo user {}: {}", email, e.getMessage());
        }
    }
}
