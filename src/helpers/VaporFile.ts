// Imports
import { type AxiosProgressEvent, type AxiosRequestConfig, type CancelToken } from 'axios'
import axios from 'axios'
import { getHeaders } from '@/graphql/apollo.client'

export type VaporOptions = {
  progress: any | null
  cancelToken: CancelToken | undefined
  signedStorageUrl: string | null
  bucket: string | null
  contentType: any | null
  expires: string | null
  visibility: string | null
  data: any | null
  baseURL: string | null
  headers: object | null
  options: AxiosRequestConfig<any> | undefined
}

export class Vapor {
  async store(
    file: File | null,
    options: VaporOptions = {
      headers: null,
      progress: undefined,
      cancelToken: undefined,
      signedStorageUrl: null,
      bucket: null,
      contentType: undefined,
      expires: null,
      visibility: null,
      data: undefined,
      baseURL: null,
      options: undefined
    }
  ) {
    if (!file) return

    // Get the file upload URL
    const response = await axios.post(
      options.signedStorageUrl
        ? options.signedStorageUrl
        : 'http://192.168.1.197/vapor/signed-storage-url',
      {
        bucket: options.bucket || '',
        content_type: options.contentType || file.type,
        expires: options.expires || '',
        visibility: options.visibility || '',
        ...options.data
      },
      {
        baseURL: options.baseURL || undefined,
        headers:
          Object.assign(options.headers ? options.headers : {}, getHeaders()) || getHeaders(),
        ...options.options
      }
    )

    // Handle headers
    const headers = response.data.headers
    if ('Host' in headers) {
      delete headers.Host
    }

    // Prepare Progress
    if (typeof options.progress === 'undefined') {
      options.progress = () => {}
    }

    // Prepare Cancel Token
    const cancelToken = options.cancelToken || undefined

    // Upload the file to the storage resource
    await axios.put(response.data.url, file, {
      cancelToken: cancelToken,
      headers: headers,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        options.progress(progressEvent.loaded / (progressEvent.total ? progressEvent.total : 100))
      }
    })

    // Set the file Extension
    response.data.extension = file.name.split('.').pop()

    delete response.data.headers
    return response.data
  }
}
