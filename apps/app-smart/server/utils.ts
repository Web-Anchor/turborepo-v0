import { NextApiResponse } from 'next';

export async function errorCather({
  errors,
  data,
  res,
}: {
  errors?: Error[];
  data?: any;
  res: NextApiResponse;
}): Promise<void> {
  /**
   * @description Next JS error catcher
   * @date 2025-02-24
   * @author Ed Ancerys
   */
  if (Array.isArray(errors || data?.errors)) {
    const messages = (errors || data?.errors)?.map((e: Error) => e.message);
    console.log('❌ API ERROR', messages);

    res.status(400).json({ errors: errors || data?.errors, messages });
  }
}
