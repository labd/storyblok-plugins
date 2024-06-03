import { ReactNode, useRef, useState } from 'react'
import './SearchField.css'
import { SearchIcon } from './SearchIcon'
import { ChevronIcon } from './ChevronIcon'

type Props<T extends object> = {
  items: T[]
  displayValue: ReactNode
  search: string
  onSearch: (search: string) => void
  onSelect: (item: T | null) => void
  renderOption: (item: T) => ReactNode
}

export function SearchField<T extends object>({
  search,
  onSearch,
  items,
  displayValue,
  onSelect,
  renderOption,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const select = () => onSelect(focusIndex ? items[focusIndex - 1] : null)

  const close = () => {
    setOpen(false)
    window.setTimeout(() => {
      buttonRef.current?.focus()
    }, 0)
  }

  const next = () =>
    setFocusIndex((index) => {
      const newIndex = index < items.length - 1 ? index + 1 : 0
      if (listRef.current) scrollToOption(newIndex, listRef.current)
      return newIndex
    })

  const previous = () =>
    setFocusIndex((index) => {
      const newIndex = index > 0 ? index - 1 : items.length - 1
      if (listRef.current) scrollToOption(newIndex, listRef.current)
      return newIndex
    })

  return (
    <div className="container">
      {open ? (
        <div className="select">
          <SearchIcon className="search" />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              onSearch(event.target.value)
              setFocusIndex(0)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() =>
              setTimeout(() => {
                if (!open) return
                setOpen(false)
              }, 200)
            }
            autoFocus
            onKeyDown={(event) => {
              switch (event.key) {
                case 'Escape':
                  // Escape clears the search by default. We still want that.
                  if (search !== '') return
                  event.preventDefault()
                  close()
                  break
                case 'Enter':
                  event.preventDefault()
                  select()
                  close()
                  break
                case 'ArrowDown':
                  event.preventDefault()
                  next()
                  break
                case 'ArrowUp':
                  event.preventDefault()
                  previous()
                  break
                case 'Tab':
                  event.preventDefault()
                  if (event.shiftKey) {
                    previous()
                  } else {
                    next()
                  }
                  break
              }
            }}
          />
          {items.length ? (
            <ul
              className="options"
              ref={listRef}
            >
              <li>
                <button
                  onClick={() => {
                    onSelect(null)
                    close()
                  }}
                  className={focusIndex === 0 ? 'focus' : ''}
                >
                  <span className={`level-1`}>-- None --</span>
                </button>
              </li>
              {items.map((node, i) => (
                <li key={JSON.stringify(node)}>
                  <button
                    onClick={() => {
                      onSelect(node)
                      close()
                    }}
                    className={focusIndex === i + 1 ? 'focus' : ''}
                  >
                    {renderOption(node)}
                  </button>
                </li>
              ))}
            </ul>
          ) : undefined}
        </div>
      ) : (
        <button
          className="display"
          onClick={() => setOpen(true)}
          ref={buttonRef}
        >
          {displayValue}
          <ChevronIcon className="chevron" />
        </button>
      )}
    </div>
  )
}

const scrollToOption = (index: number, element: HTMLElement) =>
  element
    .querySelector<HTMLLIElement>(`li:nth-child(${index + 1})`)
    ?.scrollIntoView({
      block: 'nearest',
    })
