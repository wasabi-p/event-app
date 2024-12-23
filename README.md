# Welcome to Event App 👋

This is an [Expo](https://expo.dev) project created to be used on the android platform, further development will look to introduce iOS and web at some point in the future.

## Getting started(with the APK)
You should be able to download the apk and install onto your android device, upon loading you will not be logged in and will only be able to browse the events page and see the details of each scheduled event.

1. Homepage - here you will be presented with a list of all the events currently on our system, by pressing them you will be able to see them in more detail.

2. Loggin in - use the tab naviagtion at the bottom of the page and press account, here you will be able to log in with an existing account/ Sign up/ sign in with Google

To give it a try please scroll to the bottom of this file for test user details.

3. Once logged in you can look at your account info on the accounts tab, Manage Events displays current events you are the organiser of and in a separate list the events you are attending.
There is also a button to "Create Event" which allows you to insert all the details of an event you are organising and post it.

4. On the "Attending" list you can look at the events you are attending, by clicking on these events you will navigate to their page and you can save them to your personal calendar and toggle your "attending" status.

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

4. Start the app

To run the dev build correctly you will need to configure the .env file which you can correctly, Please contact me for this file. It contains the correct URL, API keys and ClientID keys to be able to run everything locally and is provided in a .env file you will need to copy into the root directory of the app.

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction)

Test User Details:
<br>
email: test@mail.com<br>
password: testing123

