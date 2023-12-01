export function ArticleLifeSpan(date: string) {
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
    if (days == 1) {
      return `${days} day, ${hours - 24} hours`;
    } else if (days >= 7) {
      // Convert to weeks 
      const weeks = Math.floor(days / 7);
      
      if (weeks == 1) {
        return `${weeks} week`
      } else {
        return `${weeks} weeks`
      }
    }
    return `${days} days ago`
  } else if( hours != 0){
    return `${hours} hours`
  } else if (minutes != 0) {
    return `${minutes} minutes`
  } else {
    return `${seconds} seconds`
  }
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
      return `${weeks}W ago`;
    }
    return `${days}d ago`
  } else if( hours != 0){
    return `${hours}h ago`
  } else if (minutes != 0) {
    return `${minutes}min ago`
  } else {
    return `${seconds}sec ago`
  }
};


export function removeHTMLEntities(text: string): string {
  return text.replace(/&[^\s]*;|&#(\d+|[a-fA-F]+);/g, '')
}