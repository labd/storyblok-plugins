import {
  Category,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk'

export type TokenConfig = {
  clientId: string
  clientSecret: string
  projectKey: string
  oauthUri?: string
}

export const createToken = ({
  oauthUri = 'https://auth.europe-west1.gcp.commercetools.com',
  clientId,
  clientSecret,
  projectKey,
}: TokenConfig) =>
  fetch(`${oauthUri}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: `grant_type=client_credentials&scope=view_categories:${projectKey}`,
  })
    .then((res) => res.json())
    .then((r) => r.access_token)

export type SearchProps = {
  baseUri?: string
  token: string
  projectKey: string
  ancestorKey?: string
}

export const searchCategories = async ({
  baseUri = 'https://api.europe-west1.gcp.commercetools.com',
  token,
  projectKey,
  ancestorKey,
}: SearchProps) => {
  const result: Category[] = []
  let page = 0
  let response: CategoryPagedQueryResponse

  const ancestorId = ancestorKey
    ? await getAncestorId(baseUri, token, projectKey, ancestorKey)
    : undefined

  if (ancestorKey && !ancestorId) {
    console.warn(`Ancestor category ${ancestorKey} not found`)
  }

  do {
    const queryParams = new URLSearchParams({
      limit: '500',
      offset: (page * 500).toString(),
      expand: 'parent',
    })

    if (ancestorId) {
      queryParams.append('where', `ancestors(id="${ancestorId}")`)
    }

    const url = `${baseUri}/${projectKey}/categories?${queryParams.toString()}`

    response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then<CategoryPagedQueryResponse>((res) => res.json())
    result.push(...response.results)
    page++
  } while (response.count === response.limit)

  return result
}

const getAncestorId = async (
  baseUri = 'https://api.europe-west1.gcp.commercetools.com',
  token: string,
  projectKey: string,
  ancestorKey: string,
) => {
  const response = await fetch(
    `${baseUri}/${projectKey}/categories/key=${ancestorKey}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then<Category>((res) => res.json())
  return response?.id
}
