import { CustomNextApiResponse } from 'lib/middleware';

export async function errorCather({
  errors,
  data,
}: {
  errors?: Error[];
  data?: any;
  res: CustomNextApiResponse;
}) {
  /**
   * @description Next JS error catcher
   * @date 2025-02-24
   * @author Ed Ancerys
   */
  if (Array.isArray(errors || data?.errors)) {
    const messages = (errors || data?.errors)?.map((e: Error) => e.message);
    console.log('❌ API ERROR', messages);

    return Response.json({ message: messages.join(', ') }, { status: 500 });
  }
}
