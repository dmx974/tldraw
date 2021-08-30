import type { ShapeStyles, TLDrawCommand, Data } from '~types'
import { TLDR } from '~state/tldr'

export function style(data: Data, ids: string[], changes: Partial<ShapeStyles>): TLDrawCommand {
  const { currentPageId } = data.appState

  const { before, after } = TLDR.mutateShapes(
    data,
    ids,
    (shape) => {
      return { style: { ...shape.style, ...changes } }
    },
    currentPageId
  )

  return {
    id: 'style_shapes',
    before: {
      document: {
        pages: {
          [currentPageId]: { shapes: before },
        },
      },
      appState: {
        currentStyle: { ...data.appState.currentStyle },
      },
    },
    after: {
      document: {
        pages: {
          [currentPageId]: { shapes: after },
        },
      },
      appState: {
        currentStyle: { ...data.appState.currentStyle, ...changes },
      },
    },
  }
}