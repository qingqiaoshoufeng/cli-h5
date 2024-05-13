import JSEncrypt from 'jsencrypt'

/**
 * 加密
 */
export function encrypt(str) {
  const encryptor = new JSEncrypt()
  const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAODbtXat5c8fR04+lW29giSeYF6nSorQ5QX4ew77vzk9XrmM9S6hWJbMWErlY09X9xKPhUU17/L35KRALWjK1uECAwEAAQ=='
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(str)
}
