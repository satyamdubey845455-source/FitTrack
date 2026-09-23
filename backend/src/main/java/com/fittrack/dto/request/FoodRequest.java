package com.fittrack.dto.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodRequest {

    @NotBlank(message = "Food name is required")
    private String name;

    private String category;

    @JsonAlias({"servingSize", "serving_size", "servingSizeG", "serving_size_g"})
    @DecimalMin(value = "0.0", message = "Serving size must be positive")
    private BigDecimal servingSizeG;

    @JsonAlias({"servingUnit", "serving_unit", "servingSizeUnit", "serving_size_unit"})
    private String servingSizeUnit;

    @JsonAlias({"calories", "caloriesPerServing", "calories_per_serving"})
    @NotNull(message = "Calories per serving is required")
    @DecimalMin(value = "0.0", message = "Calories must be positive")
    private BigDecimal caloriesPerServing;

    @JsonAlias({"protein", "proteinG", "protein_g"})
    @NotNull(message = "Protein is required")
    @DecimalMin(value = "0.0", message = "Protein must be positive")
    private BigDecimal proteinG;

    @JsonAlias({"carbs", "carbsG", "carbs_g"})
    @NotNull(message = "Carbs is required")
    @DecimalMin(value = "0.0", message = "Carbs must be positive")
    private BigDecimal carbsG;

    @JsonAlias({"fat", "fatG", "fat_g"})
    @NotNull(message = "Fat is required")
    @DecimalMin(value = "0.0", message = "Fat must be positive")
    private BigDecimal fatG;

    @JsonAlias({"fiber", "fiberG", "fiber_g"})
    private BigDecimal fiberG;

    @JsonAlias({"totalSugar", "sugar", "sugarG", "total_sugar", "sugar_g"})
    private BigDecimal sugarG;

    @JsonAlias({"addedSugar", "addedSugarG", "added_sugar", "added_sugar_g"})
    private BigDecimal addedSugarG;

    @JsonAlias({"saturatedFat", "saturatedFatG", "saturated_fat", "saturated_fat_g"})
    private BigDecimal saturatedFatG;

    @JsonAlias({"sodium", "sodiumMg", "sodium_mg"})
    private BigDecimal sodiumMg;

    @JsonAlias({"cholesterol", "cholesterolMg", "cholesterol_mg"})
    private BigDecimal cholesterolMg;

    @JsonAlias({"calcium", "calciumMg", "calcium_mg"})
    private BigDecimal calciumMg;

    @JsonAlias({"iron", "ironMg", "iron_mg"})
    private BigDecimal ironMg;

    @JsonAlias({"vitaminD", "vitaminDMicrog", "vitamin_d_microg"})
    private BigDecimal vitaminDMicrog;

    @JsonAlias({"vitaminB12", "vitaminB12Microg", "vitamin_b12_microg"})
    private BigDecimal vitaminB12Microg;
}
