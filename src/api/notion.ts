import { Client } from '@notionhq/client'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const notion = new Client({ auth: process.env.NOTION_API_KEY })

export interface Note {
  id: string
  title: string
  date: string
  description?: string
  tags: string[]
  slug: string
}

const databaseId = process.env.NOTION_DATABASE_ID as string

export async function fetchNotes() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'is_public',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'created_date',
        direction: 'descending',
      },
    ],
  })

  const { next_cursor, results } = response
  const notes: Note[] = results.map((note) => {
    const { id, properties } = note as PageObjectResponse
    const { tag, title, created_date, slug } = properties

    return {
      id,
      // TODO: properties.Name에서 가져오기
      title: title.type === 'rich_text' ? title.rich_text[0].plain_text : '',
      date: created_date.type === 'date' ? created_date.date?.start ?? '' : '',
      description: '',
      tags: tag.type === 'multi_select' ? tag.multi_select.map((v) => v.name) : [],
      slug: slug.type === 'rich_text' ? slug.rich_text[0].plain_text : '',
    }
  })

  return {
    next_cursor,
    notes,
  }
}

export async function fetchNoteBySlug(slug: Note['slug']) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'is_public',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'slug',
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  })

  const note = response.results[0]
  if (!note) {
    return null
  }

  const { id, properties } = note as PageObjectResponse
  const { tag, title, created_date } = properties

  return {
    id,
    title: title.type === 'rich_text' ? title.rich_text[0].plain_text : '',
    date: created_date.type === 'date' ? created_date.date?.start ?? '' : '',
    description: '',
    tags: tag.type === 'multi_select' ? tag.multi_select.map((v) => v.name) : [],
    slug,
  }
}

export async function fetchNoteBlocks(noteId: string) {
  const res = await notion.blocks.children.list({ block_id: noteId })
  return res.results as BlockObjectResponse[]
}
