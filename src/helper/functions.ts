import {UserProfile} from "@src/types";
import {
  differenceInDays,
  differenceInWeeks,
  differenceInSeconds,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export function resourceAge(date: Date) {
  const publishedAt = new Date(date);
  const currentDate = new Date();
  
  const seconds = differenceInSeconds(currentDate, publishedAt);
  const minutes = differenceInMinutes(currentDate, publishedAt);
  if (minutes < 1) return seconds == 0 ? 'just now' : `${seconds} secs`;
  if (minutes < 60) return `${minutes} min`;
  
  const hours = differenceInHours(currentDate, publishedAt);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  
  const days = differenceInDays(currentDate, publishedAt);
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'}`;
  
  const weeks = differenceInWeeks(currentDate, publishedAt);
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  
  const months = differenceInMonths(currentDate, publishedAt);
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'}`;

  const years = differenceInYears(currentDate, publishedAt);
  return `${years} yrs`
}


export function contentLifeSpan(date:string):string {
  const publishedAt = new Date(date);
  const currentDate = new Date();

  const lifespan = (currentDate as any) - (publishedAt as any);

  // Convert to seconds
  const seconds = Math.floor(lifespan / 1000);

  // Convert to minutes
  const minutes = Math.floor(seconds / 60);

  // Convert to hours
  const hours = Math.floor(minutes / 60);

  // Convert to days
  const days = Math.floor(hours / 24);

  if (days != 0) { 
    if (days >= 7) {
      // Convert to weeks 
      const weeks = Math.floor(days / 7);
      return `${weeks}W`;
    }
    return `${days}d`
  } else if( hours != 0){
    return `${hours}hr`
  } else if (minutes != 0) {
    return `${minutes}min`
  } else {
    return `${seconds}sec`
  }
};


export const generateTransactionRef = (length:number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${result}`;
};

export function generateDate(_date_: string) {
  const dateObject = new Date(_date_);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

// Extracting time components
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

// Formatting date and time
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime
  }
}

export function isProfileComplete(user: UserProfile): boolean {
  return (
    user.email !== null &&
    user.firstName !== null &&
    user.lastName !== null &&
    user.primaryDomain !== null &&
    user.skills !== null &&
    user.gender !== null
  )
}

export function awardPoints(userId: number, productId: number, interactionType: string) {
}