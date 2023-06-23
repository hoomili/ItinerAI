# ItinerAI - Travel Companion App

Welcome to ItinerAI, a travel companion app that leverages artificial intelligence to generate detailed itineraries for your planned trips. The app is developed by using React and Node.js for the frontend, along with Express and PostgreSQL for the backend. ItinerAI integrates with OpenAI and Google Maps/Places APIs to provide a comprehensive travel experience.

## Getting Started

To engage with the app, simply follow these steps:

1. Sign up: Create a secure account by registering with us. We prioritize user's information safety and use password hashing techniques to protect your information.

2. Log in: Once registered, log in to your account using your credentials.

3. Enter Destination: Upon logging in, you will be prompted to enter your desired destination using a form that utilizes Google's autocomplete API to ensure accurate and efficient input.

4. Provide Trip Details: Specify the number of days, budget, and interests for your trip. These inputs will be used to generate your personalized itinerary.

5. Generate Itinerary: Once you have provided the necessary information, our app will generate a comprehensive itinerary tailored to your preferences. You will be presented with a modal containing a map which displays suggested activities and restaurants marked with pins. Additionally, a detailed list will guide you through each day of your trip, highlighting recommended activities. The itinerary also includes suggested accommodation, complete with address and rating.

6. Explore Map Details: Clicking on each pin on the map will reveal more information about the corresponding location. An information window will display the name, address, rating, and a picture, enabling you to easily locate and identify these places during your trip. To minimize confusion, only the locations for each specific day are shown on the map, and you can toggle between days using the provided buttons in the list.

7. Save Itinerary: If you are satisfied with the generated itinerary, you have the option to save it for future access with the provided save button at the end of the list. All saved itineraries can be accessed from the "My Itineraries" page, available exclusively to logged-in users.

8. Manage Saved Itineraries: The "My Itineraries" page provides an overview of all your saved itineraries. Each itinerary is presented with the city as its name and an accompanying image that is sourced from the Google Maps/Photos API. If you no longer wish to keep an itinerary, a trashcan button allows you to easily delete it from the list.

## Future Improvements

By no means the ItinerAI is a complete app. There are many improvements that are possible for the app to improve its functionality and efficiency. Here are some key areas can be worked on in the future updates:

### Improved Speed for Users

One of the challenges that we faced in development was the time it gets to generate the itinerary which is mostly due to OpenAI response time. However, this issue can be improved by tweaking the prompt sent to the API or migrating to the more advanced models of the AI

### "Share" Button to Export Itineraries as a Link/PDF

It is important for each user to be able to effortlessly share their travel plans with friends, family, or travel companions. To implement this, a "Share" feature that will allow you to export your itineraries as shareable links or PDF files can be added to the app to accomplish this task. 

### Ability for Users to Provide Feedback to API and Adjust Itinerary

 In future updates, a feedback mechanism can be added that enables users to provide direct feedback on the suggested activities, restaurants, accommodations, and other itinerary elements. This feedback will be used to improve the precision and accuracy of the generated itinerary based on the users’ needs and interests.



# Screenshots
![Screenshot of Create Itinerary](https://github.com/hoomili/ItinerAI/blob/readme/bugfix/doc/homepage.png?raw=true)

![Screenshot of Create Sign Up](https://github.com/hoomili/ItinerAI/blob/readme/bugfix/doc/signup.png?raw=true)

![Screenshot of Create Login](https://github.com/hoomili/ItinerAI/blob/readme/bugfix/doc/login.png?raw=true)

![Screenshot of Itinerary](https://github.com/hoomili/ItinerAI/blob/readme/bugfix/doc/itinerary.png?raw=true)

![Screenshot of My Itineraries](https://github.com/hoomili/ItinerAI/blob/readme/bugfix/doc/my-itineraries.png?raw=true)


## Setup

Install dependencies with `npm install` in each respective `/frontend` and `/backend`.

## [Frontend] Running Webpack Development Server

```sh
cd frontend
npm start
```

## [Backend] Running Backend Servier

Read `backend/readme` for further setup details.

```sh
cd backend
npm start
```