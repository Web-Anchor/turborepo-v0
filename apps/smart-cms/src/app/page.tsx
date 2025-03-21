import { cookies } from 'next/headers';
import Controller from './controller';

export default async function Page() {
  const cookieStore = await cookies();
  let token = cookieStore.get(process.env.SESSION_TOKEN!)?.value;
  console.log('Session Token:', token);

  return <Controller token={token} />;
}
