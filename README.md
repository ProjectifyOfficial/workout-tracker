[Do you even lift bro? -  Workout Tracker](https://do-you-even-lift-bro.herokuapp.com/)
================

Overview
--------
I started this project because I was tired of tracking my workout in complicated spreadsheets. I wanted a nice GUI interface to track my workouts and goals in. I wanted an easier way to re-arrange my splits without redesigning a complicated spreadsheet. I also wanted to create a tool that was easier for others to understand and use than a spreadsheet. Lastly, I wanted to be able to access my workout tracking tool from my phone. Editing a spreadsheet on a mobile device is just terrible.

Instructions
------------
This is a simple tool for building workout routines and tracking progress. In order to use the app, you must register an account. Once you have logged in, you can build your routine or split by adding new days. Each day has a name and an order, which can be used to order or reorder your split.

After you have added a day, you can add as many exercises to that day as needed. An exercise has a name, number of sets, a day, a 1-rep base weight, and a cumulative base weight. The 1-rep base weight value represents the minimum weight that you will lift for an exercise and is used to truncate the y-axis of the progress chart. For example, if you never bench press less than 100lb, truncating the y-axis of the chart at 100lb may be useful to more clearly visualize progress over time. The same logic applies to the cumulative base weight, which represents the total weight lifted for an exercise in one day. This is calculated by multiplying the number of reps in each set by the weight, and then summing the totals. For example, if you completed 3 sets of 12*100, 10*120, and 8*150, your cumulative base weight for the day would be 3600lb.

Once you have created your split, you can click the `Log Set` button at the top of an exercise's progress chart to log a new set. All sets logged within one day will be grouped together under a single data point.

Feature Wish List
-----------------
The following is a list of features that I would like to build out for the app. If you are interested in contributing, please form the app and submit a pull request. The initial code base is a bit messy. I took the original release from concept to deployment in one day, using some code from another project to get a head start.

- Test suite

    I skipped over this completely for the sake of time, but would like to build out a full test suite, including feature tests. My experience is mainly with RSpec, Capybara, and Selenium, but I am open to using other tools for the job.

    As part of the test suite, I also want to hook into some code quality metrics and a CI service like `Coveralls`.

- Angularize and enhance the UI

    The app already has an Angular controller and service for styling the side nav buttons. I would like to ultimately convert the backend to an API and recode the front end to consume the API. Additionally, I'd like to use accordions throughout the app to collapse content groups. For example, in the routine overview, all days would be collapses by default, except for the first. Clicking another day would collapse the current day while opening that day.

- Mobile redesign

    This one is rather self explanatory. Given that the app is based on Bootstrap, it is already somewhat mobile friendly. I would like to optimize this so that a user can easily log data from a mobile phone. I'd also like to optimize the progress charts for mobile viewing, though that is less of a priority. The goal here is the allow users to log sets on their phone at the gym, rather than logging them on paper and then entering them on the computer later.

- Refactor `exercises#show` view

    Currently this view serves no useful purpose. I would like to refactor this view to show a larger chart will all recorded data points, as well as some other metrics, including the calculated 1-rep max for that exercise, as well as an option to record an actual 1-rep max. Ultimately I want to tie this into the Goals feature of the app to track progress toward goals.

- Build goal tracking into app.

    One of the most powerful features of the app, and one of the main reasons imagine people would use it for would be to track goals. For the goals tab, a user should see an overview of their split, along with the exercises for each day. The user should then be able to create a new goal for an exercise. A goal should track any or all of the following:

    - Max weight lifted for a set, where the size of the set is defined. E.g. 10*200 for bench press.
    - Cumulative weight lifted in one day for a single exercise. E.g. 5000lbs for bench press.
    - The 1-rep max for a single exercise. E.g. 250lbs for bench press.

    All goals should require a date and should be drawn on the progress chart so that progress can be visualized.

- Track weight and body-fat percentage.

    I envision this feature being attached to goal tracking. When a user registers an account, they can input their starting height, weight, and body-fat percentage into their profile, as well as any other useful measurements (biceps, neck, torso, etc.). Then if a user has inputted this data, they will see an option in the Goals tab to create a different type of goal for weight or body-fat. If they create a goal for either, they will see a new section on their goals dashboard near the top, with charts for weight and/or body-fat percentage.

    Once a user has inputted their starting weight and/or body-fat into their profile, they will see a button at the top of the progress chart to log a new measurement. Each measurement along with the user's goals will be plotted on the chart.

- Track cardio exercises

    I haven't put much thought into this aspect of the app yet. It might be useful to build in some functionality to track cardio exercises such as running, cycling, rowing, etc.

- Share/Copy Splits from other users

    A user should see a toggle in their profile to make their workout data public. If this is checked, other authenticated users of the app (but not guests) will be able to see an overview of that user's split by viewing that user's profile from a list of users. They will also see a button next to each day in that user's split to copy the split and all associated exercises to their account. Clicking this button would create a new day and set of exercises with identical attributes for a user. If a user's account is not set to public, their profile won't be visible to other users.

    I envision this feature living in its own tab called `Share`. This tab might enventually have other features, such as social media integrations.

Contributing
------------
I'd love help building out the feature set for this app or adding other features I haven't thought of yet. If you'd like to contribute, fork the app and submit a pull request.

Once you've formed the app, run `bundle install` and `rails s Puma` to start the server.  
