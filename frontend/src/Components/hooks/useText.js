
export const useText = (text) => (text.length > 100)?`${text.slice(0,100)}...` :text
export const useTextMore = (text) => (text.length > 200)?`${text.slice(0,200)}...`:text