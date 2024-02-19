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
}

export const searchCategories = async ({
  baseUri = 'https://api.europe-west1.gcp.commercetools.com',
  token,
  projectKey,
}: SearchProps) => {
  const result: Category[] = []
  let page = 0
  let response: CategoryPagedQueryResponse

  do {
    response = await fetch(
      `${baseUri}/${projectKey}/categories?limit=500&offset=${page * 500}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then<CategoryPagedQueryResponse>((res) => res.json())
    result.push(...response.results)
    page++
  } while (response.count === response.limit)

  return result
}
