

export const calculateProgress = (status: string): number => {
    if (status === "Completed") {
      return 100;
    } else if (status === "In Progress") {
      return 50;
    } else {
      return 0;
    }
  };