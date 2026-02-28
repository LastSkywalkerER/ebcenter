'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface RenderRichTextProps {
  content: unknown
}

function isValidLexicalContent(content: unknown): content is SerializedEditorState {
  return typeof content === 'object' && content != null && 'root' in content
}

export function RenderRichText({ content }: RenderRichTextProps) {
  if (!content || !isValidLexicalContent(content)) return null
  return (
    <div className='prose prose-gray max-w-none'>
      <RichText data={content} />
    </div>
  )
}
