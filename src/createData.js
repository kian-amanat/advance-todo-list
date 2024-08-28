export async function handleChange(
  inputVal,
  descriptionVal,
  setDes,
  setInputs,
  isComplete,
  setError
) {
  let newInput = inputVal.current.value;
  let newDescription = descriptionVal.current.value;

  if (newInput && newDescription) {
    const titleString = [newInput].join(", ");
    const descriptionString = [newDescription].join(", ");
    const isCompleteString = String(isComplete);

    const customString = `{"title": "${titleString}", "description": "${descriptionString}", "isComplete": "${isCompleteString}"}`;

    setDes((prevDes) => [...prevDes, newDescription]);
    setInputs((prevInputs) => [...prevInputs, newInput]);

    const data = {
      title: [newInput],
      description: [newDescription],
      isComplete: isComplete,
    };

    console.log(data);

    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:3001/task/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: customString,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("id =>>>>>", responseData);

      inputVal.current.value = "";
      descriptionVal.current.value = "";
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    setError(true);
  }
}

export const updatefetchData = async (
  id,
  inputVal,
  descriptionVal,
  isComplete
) => {
  console.log("comp =>>>>", isComplete.current);
  let newInput = inputVal; // Replace with the appropriate method to select the div
  let newDescription = descriptionVal;

  if (!newInput) {
    console.error("Title cannot be empty");
    return;
  }

  const titleString = [newInput].join(" ");
  const descriptionString = [newDescription].join(", ");
  const isCompleteString = [isComplete.current].join(", ");

  const customString = `{"title": "${titleString}", "description":"${descriptionString}", "isCompleted":${isCompleteString}}`;
  console.log("json ==>>>", customString);

  const data = {
    title: [newInput],
    description: [newDescription],
    isComplete: isComplete.current,
  };

  console.log("data ===>>>", data);

  try {
    const jwtToken = localStorage.getItem("jwt");
    const response = await fetch(`http://localhost:3001/task/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: customString,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
