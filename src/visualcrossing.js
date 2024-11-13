const VisualCrossingAPIKey = "UUAKFFZN56XYJRA3UH3TNRTND";

weatherTypes = {
  type_1: {
    description: "a day with blowing or drifting snow",
    quip: "Stay warm and watch your step!",
  },
  type_2: {
    description: "a drizzly day",
    quip: "An umbrella wouldn’t hurt!",
  },
  type_3: {
    description: "a day with heavy drizzle",
    quip: "Keep dry with a hood or umbrella!",
  },
  type_4: {
    description: "a light drizzly day",
    quip: "A little cover could help!",
  },
  type_5: {
    description: "a day with heavy drizzle or rain",
    quip: "Better grab a sturdy umbrella!",
  },
  type_6: {
    description: "a light drizzle or rain kind of day",
    quip: "A small umbrella should do the trick!",
  },
  type_7: {
    description: "a dusty day with storms",
    quip: "Might be best to stay indoors today!",
  },
  type_8: {
    description: "a foggy day",
    quip: "Drive safe and stay alert!",
  },
  type_9: {
    description: "a day with freezing drizzle or rain",
    quip: "Walk and drive carefully!",
  },
  type_10: {
    description: "a day with heavy freezing drizzle or rain",
    quip: "Dress warm and watch for slippery spots!",
  },
  type_11: {
    description: "a day with light freezing drizzle or rain",
    quip: "Stay cautious outdoors!",
  },
  type_12: {
    description: "a day with freezing fog",
    quip: "Roads and paths might be slick!",
  },
  type_13: {
    description: "a day with heavy freezing rain",
    quip: "Take it slow and steady!",
  },
  type_14: {
    description: "a day with light freezing rain",
    quip: "Caution on the sidewalks and roads!",
  },
  type_15: {
    description: "a day with a funnel cloud or tornado",
    quip: "Stay alert and follow safety precautions!",
  },
  type_16: {
    description: "a day with hail showers",
    quip: "Cover up and stay safe from those icy bits!",
  },
  type_17: {
    description: "an icy day",
    quip: "Walk and drive with care!",
  },
  type_18: {
    description: "a day with lightning but no thunder",
    quip: "Watch the skies!",
  },
  type_19: {
    description: "a misty day",
    quip: "Perfect for a walk, but take it slow!",
  },
  type_20: {
    description: "a day with precipitation nearby",
    quip: "You might see rain soon!",
  },
  type_21: {
    description: "a rainy day",
    quip: "An umbrella will be your best friend today!",
  },
  type_22: {
    description: "a day with heavy rain and snow",
    quip: "Bundle up and be cautious outside!",
  },
  type_23: {
    description: "a day with light rain and snow",
    quip: "Could be a bit slushy underfoot!",
  },
  type_24: {
    description: "a day with rain showers",
    quip: "Have an umbrella handy!",
  },
  type_25: {
    description: "a heavy rain day",
    quip: "A raincoat or umbrella is essential!",
  },
  type_26: {
    description: "a light rain day",
    quip: "Just enough for a small umbrella.",
  },
  type_27: {
    description: "a day with decreasing sky coverage",
    quip: "Looks like the sun might come out soon.",
  },
  type_28: {
    description: "a day with increasing sky coverage",
    quip: "Keep an eye on the weather!",
  },
  type_29: {
    description: "a day with no changes in the sky",
    quip: "Expect more of the same!",
  },
  type_30: {
    description: "a smoky or hazy day",
    quip: "Air quality might be low, so take care!",
  },
  type_31: {
    description: "a snowy day",
    quip: "Bundle up and enjoy the wintry weather!",
  },
  type_32: {
    description: "a day with snow and rain showers",
    quip: "Could be a bit messy out there!",
  },
  type_33: {
    description: "a day with snow showers",
    quip: "Dress warmly and enjoy the flakes.",
  },
  type_34: {
    description: "a day with heavy snow",
    quip: "Time for layers and maybe some hot cocoa!",
  },
  type_35: {
    description: "a light snowy day",
    quip: "Enough to feel wintry!",
  },
  type_36: {
    description: "a day with squalls",
    quip: "Keep safe and stay dry!",
  },
  type_37: {
    description: "a stormy day with thunder",
    quip: "Stay indoors if you can!",
  },
  type_38: {
    description: "a thunderstormy day without precipitation",
    quip: "It’s best to stay inside!",
  },
  type_39: {
    description: "a day with diamond dust in the air",
    quip: "It’s a magical kind of cold!",
  },
  type_40: {
    description: "a day with hail",
    quip: "Best to find cover to stay safe.",
  },
  type_41: {
    description: "an overcast day",
    quip: "No sunshine in sight.",
  },
  type_42: {
    description: "a partially cloudy day",
    quip: "Could be a mix of sun and clouds today!",
  },
  type_43: {
    description: "a clear day",
    quip: "Perfect day to be outdoors!",
  },
};

let tempUnit = "F";

const weatherDescriptionText = document.getElementById(
  "weather-description-text"
);
const weatherQuipText = document.getElementById("weather-quip-text");
const tempText = document.getElementById("temp");
const feelsLikeText = document.getElementById("feels-like-temp");
const locationText = document.getElementById("location");
const humidityText = document.getElementById("humidity");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const locationInput = document.getElementById("location-input");
const submitLocationBtn = document.getElementById("submit-location");
const convertBtn = document.getElementById("convert");

console.log("visual crossing loaded");

async function getWeather(_location) {
  const todaysDate = new Date();
  const dd = todaysDate.getDate();
  const mm = todaysDate.getMonth() + 1;
  const yyyy = todaysDate.getFullYear();
  const todaysDateFormatted = `${yyyy}-${mm}-${dd}`;

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${_location}/${todaysDateFormatted}/${todaysDateFormatted}?key=${VisualCrossingAPIKey}&lang=id`
    );

    if (!response.ok) {
      console.log("Invalid location");
      errorMessage.textContent =
        locationInput.value + " is not a valid location";
      resetWeather();
      errorContainer.classList.remove("hidden");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      errorContainer.classList.add("hidden");
    } else {
      const weatherData = await response.json();
      console.log(weatherData);
      if (
        !weatherData.currentConditions ||
        !weatherData.currentConditions.conditions
      ) {
        errorMessage.textContent = "location not supported!";
        errorContainer.classList.remove("hidden");
        resetWeather();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        errorContainer.classList.add("hidden");
      } else if (
        weatherTypes.hasOwnProperty(weatherData.currentConditions.conditions)
      ) {
        const weatherDescription =
          weatherTypes[`${weatherData.currentConditions.conditions}`][
            "description"
          ];
        const weatherQuip =
          weatherTypes[`${weatherData.currentConditions.conditions}`]["quip"];

        const temp = weatherData.currentConditions.temp;
        const feelsLike = weatherData.currentConditions.feelslike;
        const humidity = weatherData.currentConditions.humidity;

        weatherDescriptionText.textContent = weatherDescription.toLowerCase();
        // locationText.textContent = location + ".";
        weatherQuipText.textContent = weatherQuip;
        feelsLikeText.textContent = feelsLike + "°F";
        tempText.textContent = temp + "°F";
        humidityText.textContent = humidity + "%!";
        convertBtn.classList.remove("hidden");
      }
    }
  } catch (error) {
    console.log("uhoh! Error");
    console.log(response);
    console.log(error);
  }
}

locationInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const target = e.target;
    getWeather(target.value);
  }
});

function resetWeather() {
  locationInput.value = "";
  weatherDescriptionText.textContent = "_________";
  weatherQuipText.textContent = "_____________";
  tempText.textContent = "__";
  feelsLikeText.textContent = "__";
  humidityText.textContent = "__";
  convertBtn.classList.add("hidden");
}

submitLocationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(locationInput.value);
});

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Convert the text content to a number by removing the "°" symbol and using parseFloat
  const oldTemp = parseFloat(tempText.textContent.split("°")[0]);
  const oldFeelsLikeTemp = parseFloat(feelsLikeText.textContent.split("°")[0]);

  if (tempUnit === "F") {
    // Convert Fahrenheit to Celsius and round to 0 decimal places
    const newTemp = ((oldTemp - 32) * (5 / 9)).toFixed(0);
    const newFeelsLikeTemp = ((oldFeelsLikeTemp - 32) * (5 / 9)).toFixed(0);

    // Update the text content with the new temperatures in Celsius
    tempText.textContent = newTemp + "°C";
    feelsLikeText.textContent = newFeelsLikeTemp + "°C";

    // Update the unit for future conversions
    tempUnit = "C";
    convertBtn.textContent = "I'd prefer fahrenheit";
  } else {
    // Convert Celsius to Fahrenheit and round to 0 decimal places
    const newTemp = (oldTemp * (9 / 5) + 32).toFixed(0);
    const newFeelsLikeTemp = (oldFeelsLikeTemp * (9 / 5) + 32).toFixed(0);

    // Update the text content with the new temperatures in Fahrenheit
    tempText.textContent = newTemp + "°F";
    feelsLikeText.textContent = newFeelsLikeTemp + "°F";

    // Update the unit for future conversions
    tempUnit = "F";

    convertBtn.textContent = "I'd prefer celsius";
  }
});
