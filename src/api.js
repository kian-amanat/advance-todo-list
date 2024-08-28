const deleteTask = async (id) => {
  try {
    const jwtToken = localStorage.getItem("jwt");

    const response = await fetch(`http://localhost:3001/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      const deletedTaskId = data.remId;
      return deletedTaskId;
    }
  } catch (error) {
    console.error(`Error deleting task => ${error}`);
  }
};

async function updateTask(id, title, description, isComplete) {
  try {
    const jwtToken = localStorage.getItem("jwt");

    const response = await fetch(`http://localhost:3001/task/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console("response was not ok");
    } else {
      const data = response.json();
    }
  } catch (error) {
    console.log(`error update task => ${error}`);
  }
}

export { deleteTask, updateTask };
