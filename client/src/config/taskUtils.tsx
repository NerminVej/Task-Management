export const calculateProgress = (status: string): number => {
  // Calculates the progress based on the provided status

  if (status === "Completed") {
    // If the status is "Completed", return 100 as the progress value
    return 100;
  } else if (status === "In Progress") {
    // If the status is "In Progress", return 50 as the progress value
    return 50;
  } else {
    // For any other status, return 0 as the progress value
    return 0;
  }
};
