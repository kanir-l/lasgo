import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? JSON.stringify(value) : String(value)

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
  }

  const serializeCookie = serialize(name, stringValue, options)
  res.setHeader('Set-Cookie', serializeCookie)
}