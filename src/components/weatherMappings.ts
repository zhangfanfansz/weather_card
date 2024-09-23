export const mappedWeather: { [key: string]: string } = {
  'partly cloudy': 'cloudy_day',
  'clear': 'sunny',
};

export const getMappedWeather = (condition: string): string  => {
  const normalizedCondition = condition?.toLowerCase().trim();

  if (mappedWeather[normalizedCondition]) {
    return mappedWeather[normalizedCondition];
  }

  if (normalizedCondition?.includes('rain')) {
    return 'rain';
  }else if (normalizedCondition?.includes('cloudy')){
    return 'cloudy';
  }

  return condition;
};