export default function image_name_extension(fp:string) {
  const parts = fp.split('/');
  
  const imageName = parts[parts.length - 1];
  
  const nameParts = imageName.split('.');
  
  const extension = nameParts.pop();
  const name = nameParts.join('.');

  return {
    name: name,
    extension: extension
  };
}