// Realistic mock engine for Static Cloud Preview (Surge / GitHub Pages)
// Activated automatically when backend returns 404 or network error on static hosts.

export const getMockData = (url, method, requestData) => {
  const cleanUrl = url.replace(/^\/api/, '');

  if (cleanUrl.includes('/auth/login') || cleanUrl.includes('/auth/register')) {
    return {
      success: true,
      message: 'Demo mode login successful',
      data: {
        userId: 1,
        fullName: requestData?.fullName || 'Satyam Kumar Dubey',
        email: requestData?.email || 'satyam@fittrack.com',
        role: 'USER',
        profileComplete: true,
        accessToken: 'demo_jwt_token_cloud_preview',
        refreshToken: 'demo_refresh_token_cloud_preview',
      }
    };
  }

  if (cleanUrl.includes('/profile')) {
    return {
      success: true,
      data: {
        userId: 1,
        age: 24,
        gender: 'MALE',
        heightCm: 175,
        weightKg: 68,
        activityLevel: 'MODERATELY_ACTIVE',
        fitnessGoal: 'MUSCLE_GAIN',
        workoutFrequency: 5,
        preferredWorkoutTime: 'EVENING',
        dietaryPreference: 'NON_VEGETARIAN',
        dailyCalorieTarget: 2450,
        dailyProteinTarget: 140,
        dailyCarbTarget: 260,
        dailyFatTarget: 65,
        dailyFiberTarget: 30,
        dailyWaterTargetMl: 3500,
        dailySleepTargetHours: 8,
        dailyAddedSugarTarget: 25,
        timezone: 'Asia/Kolkata',
      }
    };
  }

  if (cleanUrl.includes('/dashboard')) {
    return {
      success: true,
      data: {
        todayActionItems: [
          'Log lunch to hit 80g protein target',
          'Complete Upper Body Push workout',
          'Drink 1000ml water before 6:00 PM',
          'Aim for 8 hours sleep tonight'
        ],
        streakDays: 14,
        caloriesConsumed: 1650,
        calorieTarget: 2450,
        proteinConsumed: 95,
        proteinTarget: 140,
        waterConsumedMl: 2250,
        waterTargetMl: 3500,
        sleepHours: 7.5,
        sleepTargetHours: 8,
        todayWorkout: 'Upper Body Push (Chest, Shoulders, Triceps)',
        statusAlerts: ['Daily Sugar: 12g (Within 25g safe limit 🟢)']
      }
    };
  }

  if (cleanUrl.includes('/meals/summary')) {
    return {
      success: true,
      data: {
        totalCalories: 1650,
        totalProtein: 95.0,
        totalCarbs: 185.0,
        totalFat: 52.0,
        totalFiber: 24.0,
        totalAddedSugar: 12.0
      }
    };
  }

  if (cleanUrl.includes('/meals/templates')) {
    return {
      success: true,
      data: [
        { id: 1, name: 'High Protein Breakfast', mealType: 'BREAKFAST', items: [{ foodName: 'Oats with Whey', quantity: 1 }] },
        { id: 2, name: 'Post-Workout Shake', mealType: 'SNACK', items: [{ foodName: 'Whey Protein', quantity: 1 }] }
      ]
    };
  }

  if (cleanUrl === '/meals' || cleanUrl.startsWith('/meals?')) {
    return {
      success: true,
      data: [
        {
          id: 1,
          mealType: 'BREAKFAST',
          totalCalories: 520,
          totalProtein: 38.0,
          totalCarbs: 62.0,
          totalFat: 12.0,
          items: [
            { id: 101, foodName: 'Egg (whole)', quantity: 3, unit: 'piece', calories: 216, protein: 18.9, carbs: 1.2, fat: 14.4 },
            { id: 102, foodName: 'Oats (uncooked)', quantity: 50, unit: 'g', calories: 185, protein: 6.8, carbs: 32.8, fat: 3.1 },
            { id: 103, foodName: 'Whey Protein Powder', quantity: 1, unit: 'scoop', calories: 120, protein: 24.0, carbs: 4.0, fat: 2.0 }
          ]
        },
        {
          id: 2,
          mealType: 'LUNCH',
          totalCalories: 680,
          totalProtein: 42.0,
          totalCarbs: 85.0,
          totalFat: 18.0,
          items: [
            { id: 201, foodName: 'Chicken Breast (cooked)', quantity: 150, unit: 'g', calories: 248, protein: 46.5, carbs: 0, fat: 5.4 },
            { id: 202, foodName: 'Brown Rice (cooked)', quantity: 200, unit: 'g', calories: 218, protein: 4.6, carbs: 45.4, fat: 1.7 },
            { id: 203, foodName: 'Toor Dal (cooked)', quantity: 150, unit: 'g', calories: 148, protein: 9.8, carbs: 25.5, fat: 0.5 }
          ]
        },
        {
          id: 3,
          mealType: 'SNACK',
          totalCalories: 250,
          totalProtein: 15.0,
          totalCarbs: 38.0,
          totalFat: 5.0,
          items: [
            { id: 301, foodName: 'Banana', quantity: 1, unit: 'piece', calories: 105, protein: 1.3, carbs: 27.0, fat: 0.3 },
            { id: 302, foodName: 'Curd (Dahi)', quantity: 150, unit: 'g', calories: 92, protein: 6.4, carbs: 6.8, fat: 3.8 }
          ]
        },
        {
          id: 4,
          mealType: 'DINNER',
          totalCalories: 450,
          totalProtein: 32.0,
          totalCarbs: 45.0,
          totalFat: 14.0,
          items: [
            { id: 401, foodName: 'Paneer (Cottage Cheese)', quantity: 100, unit: 'g', calories: 265, protein: 18.3, carbs: 3.4, fat: 20.8 },
            { id: 402, foodName: 'Roti / Chapati (whole wheat)', quantity: 2, unit: 'piece', calories: 202, protein: 6.0, carbs: 36.0, fat: 4.8 }
          ]
        }
      ]
    };
  }

  if (cleanUrl.includes('/foods/custom')) {
    return {
      success: true,
      message: 'Custom food saved',
      data: [
        { id: 66, name: 'paneer paratha', category: 'Indian Food', caloriesPerServing: 270, proteinG: 7.5, carbsG: 40, fatG: 10, isCustom: true }
      ]
    };
  }

  if (cleanUrl.includes('/foods/favorites')) {
    return {
      success: true,
      data: [
        { id: 1, name: 'Egg (whole)', caloriesPerServing: 72, proteinG: 6.3, carbsG: 0.4, fatG: 4.8, isFavorite: true },
        { id: 19, name: 'Whey Protein Powder', caloriesPerServing: 120, proteinG: 24.0, carbsG: 4.0, fatG: 2.0, isFavorite: true },
        { id: 42, name: 'Chicken Breast (cooked)', caloriesPerServing: 165, proteinG: 31.0, carbsG: 0, fatG: 3.6, isFavorite: true }
      ]
    };
  }

  if (cleanUrl.includes('/foods/categories')) {
    return {
      success: true,
      data: ['Indian Food', 'Breakfast', 'Rice', 'Roti / Bread', 'Dal / Pulses', 'Dairy', 'Paneer', 'Chicken', 'Eggs', 'Snacks']
    };
  }

  if (cleanUrl.includes('/foods')) {
    return {
      success: true,
      data: [
        { id: 1, name: 'Egg (whole)', category: 'Eggs', servingSizeG: 50, servingSizeUnit: 'g', caloriesPerServing: 72, proteinG: 6.3, carbsG: 0.4, fatG: 4.8 },
        { id: 18, name: 'Paneer (Cottage Cheese)', category: 'Dairy', servingSizeG: 100, servingSizeUnit: 'g', caloriesPerServing: 265, proteinG: 18.3, carbsG: 3.4, fatG: 20.8 },
        { id: 19, name: 'Whey Protein Powder', category: 'Supplements', servingSizeG: 30, servingSizeUnit: 'g', caloriesPerServing: 120, proteinG: 24.0, carbsG: 4.0, fatG: 2.0 },
        { id: 42, name: 'Chicken Breast (cooked)', category: 'Chicken', servingSizeG: 100, servingSizeUnit: 'g', caloriesPerServing: 165, proteinG: 31.0, carbsG: 0, fatG: 3.6 },
        { id: 24, name: 'Roti / Chapati (whole wheat)', category: 'Roti / Bread', servingSizeG: 35, servingSizeUnit: 'g', caloriesPerServing: 101, proteinG: 3.0, carbsG: 18.0, fat: 2.4 },
        { id: 22, name: 'White Rice (cooked)', category: 'Rice', servingSizeG: 150, servingSizeUnit: 'g', caloriesPerServing: 194, proteinG: 4.0, carbsG: 43.0, fat: 0.4 },
        { id: 33, name: 'Toor Dal (cooked)', category: 'Dal / Pulses', servingSizeG: 200, servingSizeUnit: 'g', caloriesPerServing: 198, proteinG: 13.0, carbsG: 34.0, fat: 0.7 },
        { id: 50, name: 'Banana', category: 'Fruits', servingSizeG: 120, servingSizeUnit: 'g', caloriesPerServing: 107, proteinG: 1.3, carbsG: 27.0, fat: 0.4 }
      ]
    };
  }

  if (cleanUrl.includes('/water')) {
    return {
      success: true,
      data: {
        totalMl: 2250,
        targetMl: 3500,
        percentage: 64,
        logs: [
          { id: 1, amountMl: 500, loggedAt: '08:00 AM' },
          { id: 2, amountMl: 750, loggedAt: '11:30 AM' },
          { id: 3, amountMl: 500, loggedAt: '02:15 PM' },
          { id: 4, amountMl: 500, loggedAt: '05:00 PM' }
        ]
      }
    };
  }

  if (cleanUrl.includes('/workout') || cleanUrl.includes('/schedule')) {
    return {
      success: true,
      data: {
        activeSession: null,
        scheduledSplit: 'Upper Body Push (Chest, Shoulders, Triceps)',
        recentWorkouts: [
          { id: 1, splitName: 'Legs & Core', durationMinutes: 52, totalVolumeKg: 7800, completedAt: 'Yesterday' },
          { id: 2, splitName: 'Pull & Biceps', durationMinutes: 48, totalVolumeKg: 6400, completedAt: '2 days ago' }
        ]
      }
    };
  }

  if (cleanUrl.includes('/sleep')) {
    return {
      success: true,
      data: {
        sleepHours: 7.5,
        targetHours: 8.0,
        qualityScore: 88,
        bedTime: '11:15 PM',
        wakeTime: '06:45 AM',
        weeklyAvg: 7.4
      }
    };
  }

  if (cleanUrl.includes('/progress') || cleanUrl.includes('/measurements')) {
    return {
      success: true,
      data: [
        { date: '2026-09-01', weightKg: 70.2 },
        { date: '2026-09-08', weightKg: 69.5 },
        { date: '2026-09-15', weightKg: 68.8 },
        { date: '2026-09-22', weightKg: 68.0 }
      ]
    };
  }

  if (cleanUrl.includes('/goals')) {
    return {
      success: true,
      data: [
        { id: 1, title: 'Hit 75kg Bench Press', target: 75, current: 70, unit: 'kg', progress: 93 },
        { id: 2, title: 'Reach 140g Daily Protein for 30 Days', target: 30, current: 18, unit: 'days', progress: 60 }
      ]
    };
  }

  if (cleanUrl.includes('/analytics')) {
    return {
      success: true,
      data: {
        calorieAdherence: 92,
        proteinAdherence: 88,
        weeklyWorkoutsCompleted: 4,
        avgSleepHours: 7.4
      }
    };
  }

  if (cleanUrl.includes('/notifications')) {
    return {
      success: true,
      data: { unreadCount: 0, notifications: [] }
    };
  }

  if (cleanUrl.includes('/calendar')) {
    return {
      success: true,
      data: []
    };
  }

  return {
    success: true,
    message: 'Operation successful',
    data: {}
  };
};
