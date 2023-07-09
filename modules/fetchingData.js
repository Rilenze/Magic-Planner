import { todayTask, compareTimes } from "../modules/dateModules";

const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

export async function fetchAccount(accountID) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/accounts/${accountID}`
    );
    const data = await response.json();

    return { name: data.kidName, gender: data.kidMale };
  } catch (error) {
    console.error("Failed to fetch account in TasksScreen:", error);
  }
}

export async function fetchTasks(accountID) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
    const data = await response.json();

    let priority = [];
    let normal = [];

    data.forEach((element) => {
      if (!element.done && todayTask(element.dueDate)) {
        if (element.priority) priority.push(element);
        else if (!element.priority) normal.push(element);
      }
    });

    priority.sort(function (a, b) {
      return compareTimes(a, b);
    });

    normal.sort(function (a, b) {
      return compareTimes(a, b);
    });

    return { data, priority, normal };
  } catch (error) {
    console.error("Failed to fetch tasks in TasksScreen:", error);
  }
}

export async function fetchSubTasks(tasks) {
  try {
    let temp = new Map();

    for (let i = 0; i < tasks.length; i++) {
      const url = `${API_BASE_URL}/api/v1/task/sub/${tasks[i].id}`;
      const response = await fetch(url);
      const data = await response.json();
      temp.set(tasks[i].id, data);
    }

    return temp;
  } catch (error) {
    console.error("Failed to fetch subTasks in TasksScreen:", error);
  }
}

export async function fetchSettings(accountID) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/account/settings/${accountID}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch settings in TasksScreen:", error);
  }
}

export async function updateFinishedSubTasks(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/task/sub/done/${id}`, {
      method: "PUT",
    });
    console.log("Updated sub task with id: " + id);
  } catch (error) {
    console.error("Failed to update finished task in subTaks:", error);
  }
}

export async function updateFinishedTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/task/done/${id}`, {
      method: "PUT",
    });
    console.log("Updated task with id: " + id);
  } catch (error) {
    console.error("Failed to update finished task in Task:", error);
  }
}
