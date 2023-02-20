export const getTimeForGreeting = () => {
  let hour = new Date().getHours();

  return (
    'Good ' +
    ((hour < 12 && 'Morning') || (hour < 18 && 'Afternoon') || 'Evening')
  );
};
