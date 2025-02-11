# Welcome to Event App 👋

This is an [Expo](https://expo.dev) project created to be used on the Android platform and iOS, further development will look to introduce web at some point in the future.

This project has been tested and developed on <b>Android 15</b>, please ensure you're using this version or higher.

## Getting started

You should be able to access a preview build of the app using Expo Go and following this link:
<br>
<br>
<img src="https://qr.expo.dev/eas-update?slug=exp&projectId=ed04246c-7945-41c4-9f33-c94187494cdc&groupId=299395ff-59a0-4149-97e8-d7d010dfc877&host=u.expo.dev" alt="qr" width="300">
<br>
<br>
or
<br>
<br>
https://expo.dev/preview/update?message=%20bug%20fix%20landing%20page&updateRuntimeVersion=1.0.0&createdAt=2025-02-10T16%3A36%3A29.054Z&slug=exp&projectId=ed04246c-7945-41c4-9f33-c94187494cdc&group=299395ff-59a0-4149-97e8-d7d010dfc877
<br>
<br>

## Features and functions

1. Homepage - here you will be presented with a list of all the events currently on our system, by pressing them you will be able to see them in more detail.

2. Loggin in - Use the tab navigation at the bottom of the page and press account, here you will be able to log in with an existing account/ Sign up

Test User Details:
<br>
email: test@mail.com
<br>
password: testing123
<br>

3. Once logged in you can look at your account info on the accounts tab, Manage Events displays current events you are the organiser of and in a separate list the events you are attending.
There is also a button to "Create Event" which allows you to insert all the details of an event you are organising and post it.

4. On the "Attending" list you can look at the events you are attending, by clicking on these events you will navigate to their page and you can save them to your personal calendar and toggle your "attending" status which in turn updates your attending list.

## Getting started (Local Repo(for editting!))

To run a locally hosted version of this app you will first of all need to clone the repo to your own computer using:

1. Open up your favourite terminal and cd into a directory you're happy with this project living and use the following terminal command

   ```bash
   git clone https://github.com/wasabi-p/event-app.git
   ```

2. CD into the new directory and use the following command to open it with your configured code editor. I recommend [VS Code](https://code.visualstudio.com/)

   ```bash
   code .
   ```

3. Install dependencies

   ```bash
   npm install
   ```
4. Set up environment variables

   To run the dev build locally you will need to configure the .env file. This is how the project communicates with the relational database that houses all the event data. 

   There is an .env.example file with placeholder values in it you will need to rename the file ".env.example" file to ".env" and replace the URL and ANON-KEY values to the following:

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://gckoifagibogjyspagxt.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdja29pZmFnaWJvZ2p5c3BhZ3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MzgwMDgsImV4cCI6MjA0ODMxNDAwOH0.44DApbHbJOKpX8Tunz_eAxVyovY0jkwb4X9r0lniXd8
   ```

   This will allow you to interact with my live database. 
   Should you want to link this project to your own supabase table you will find the applicable Supabase url and anon keys in the supabase dashboard of your own project by following Project Settings >> Configuration/ Data API options in the left tray dashboard.

5. Start the app

Run the following command in your CLI to run a preview build in project in expo

```bash
 npx expo start
```
Scan the QR code that is generated on the device you are using, this project was made and optimised for <b>Android 15</b>, for the best experience please use this version.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction)

Special Thanks and Credits:<br>
Various visual elements from the app have not been created by me and the property of the following creatives:
<br>
<br>
Event card illustrations: [Storyset](https://storyset.com/)
<br>
Icons: [FontAwesome](https://fontawesome.com/) and [FlatIcon](https://www.flaticon.com/)
