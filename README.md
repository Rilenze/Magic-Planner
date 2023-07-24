<div align="center">
  <img src="/assets/images/MagicPlanner.png" alt="Magic Planner" />
</div>

Magic Planner is a mobile application built with React Native Expo that aims to assist children with Down Syndrome
in managing their daily tasks and routines effectively. This app is designed to work in conjunction with the Magic Planner
web application, which allows parents to set tasks and subtasks for their children.

## Features

- Scan QR code from the Magic Planner web app to sync tasks with the mobile app.
- View daily tasks divided into priority and less priority tasks, sorted by deadline for completion.
- Utilize customizable colors for backgrounds, tasks, and progress bars set in the web app.
- Utilize customizable font colors and sizes set in the web app to enhance visibility and readability.
- Track task progress with a progress bar that reflects the completion of subtasks.
- Access the list of subtasks for each task and mark them as completed when it is finished.
- Receive congratulatory messages when all tasks for the day are completed.

## App Preview

<div align='center'>
  <img src="/assets/images/ScanMockup.png" alt="Screen 1"  width="400"/>
  <img src="/assets/images/TasksMockup.png" alt="Screen 1"  width="400"/>
  <img src="/assets/images/SubTasksMockup.png" alt="Screen 1"  width="800"/>
  <img src="/assets/images/CongratulationMockup.png" alt="Screen 1"  width="400"/>
</div>

## Installation

To install the Magic Planner mobile app, follow these steps:

1. Clone this repository: `git clone https://github.com/Rilenze/Magic-Planner.git`
2. Navigate to the project directory: `cd Magic-Planner`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Follow the Expo CLI instructions to launch the app on your device or emulator.

## Usage

To set up and use the Magic Planner app effectively, follow these steps:

### Web App (Parent):

1. Register and log in to the Magic Planner web app as a parent.
2. In the web app, set daily tasks and subtasks for your child, specifying their priority.
3. Customize the appearance of the app in the web app by setting colors and fonts for backgrounds, tasks, and progress bars.

### Mobile App (Child):

1. Launch the Magic Planner mobile app on your child's device.
2. Scan the QR code displayed in the Magic Planner web app to sync tasks with the mobile app.
3. On the main screen of the mobile app, you will see the tasks for today, divided into priority and less priority tasks, and sorted by deadline for completion.
4. Each task displays a progress bar that represents the completion of subtasks.
5. Tap on a task to view the list of subtasks.
6. Mark subtasks as completed once they are finished by tapping the checkboxes next to them.
7. When checkbox for subtask is checked, the subtask will be crossed and it's opacity will reduce.
8. The progress bar will update accordingly, reflecting the completion of subtasks.
9. If all tasks for the day are completed, a congratulatory message will be displayed.
