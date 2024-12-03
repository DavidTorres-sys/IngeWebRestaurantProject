import {v4 as uuiv4} from 'uuid';
import imageCompression from 'browser-image-compression';

import {createSupabaseClient} from '@/lib/supabaseClient';

function getStorage() {
  const {storage} = createSupabaseClient()
  return storage;
}


type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
}

export async function uploadImage({
  file, 
  bucket,
  folder
}: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? folder + '/' : ''}${uuiv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
  }

  const storage = getStorage();

  const {data, error} = await storage.from(bucket).upload(path, file);

  if(error) {
    return {imageUrl: '', error: 'Image upload failed'};
  }

  const imageUrl = `https://jowhklhwmcnveabcsmup.supabase.co/storage/v1/object/public/${bucket}/${data?.path}`;

  return {imageUrl, error: null};
}


